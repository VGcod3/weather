import $ from 'jquery';
import { CONFIG, forecastBoxAppend, getMonthName } from './CONFIG';

export function getWeather(api, severUrl, query) {
    let temperature, cityName, weatherImage, feelLike, weatherMain, sunrise, sunset, error;
    return fetch(getUrl(api, severUrl, query))
        .then(response => response.json())
        .then(result => {
                if (result.cod === '404') {
                    return result;
                }

                error = result['cod'];
                temperature = ((result.main.temp - 273.15).toFixed(1) + '°');
                feelLike = ((result.main.feels_like - 273.15).toFixed(1) + '°');
                cityName = result.name;
                weatherImage = (`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                weatherMain = result.weather[0].main;
                let sunriseTime = new Date(result.sys.sunrise * 1000);
                sunrise = (sunriseTime.getHours()) + ':' + getString(sunriseTime.getMinutes());
                let sunsetTime = new Date(result.sys.sunset * 1000);
                sunset = (sunsetTime.getHours()) + ':' + getString(sunsetTime.getMinutes());

                return {temperature, cityName, weatherImage, feelLike, weatherMain, sunrise, sunset};
            },
        );
} // простая функция, возвращает данные для заполнения 1 и 2 таба

export class Tabs {
    constructor() {
    }

    fill(data) {
        this.fillNowTab(data);
        this.fillDetailTab(data);
        this.fillForecastTab(data);
    } // эта функция заполняет все три таба

    fillNowTab(data) {
        $('.temp').html(data.temperature);
        $('.city_name').html(data.cityName);
        $('.cloud img').attr('src', data.weatherImage);
    } // эта функция заполняет 1 таб

    fillDetailTab(data) {
        $('.details__city-name').html(data.cityName);
        $('#details-temp').html('Temperature: ' + data.temperature);
        $('#details-feels').html('Feels like: ' + data.feelLike);
        $('#details-weather').html('Weather: ' + data.weatherMain);
        $('#details-sunrise').html('Sunrise: ' + data.sunrise);
        $('#details-sunset').html('Sunset: ' + data.sunset);
    } // эта функция заполняет 2 таб

    fillForecastTab(data) {
        $('.box').html('');
        this.getForecastData(data.cityName).then(res => forecastBoxAppend(res));
    } // эта функция заполняет 3 таб

    getForecastData(city) {
        return this.getLatLonUrl(city)
            .then(data => {
                    return fetch(data).then(res => res.json())
                        .then(result => {
                            const filteredData = [];
                            const filteredList = result.list.filter(
                                (value, index) => {
                                    return index % 3 === 0;
                                },
                            );

                            filteredList.forEach((value, index) => {
                                const timeDay = new Date(filteredList[index].dt * 1000);
                                const timeHours = new Date(filteredList[index].dt * 1000);
                                const day = (timeDay.getDate());
                                const hours = (timeHours.getHours() + ':' + getString(timeHours.getMinutes()));
                                const month = (getMonthName(timeDay.getMonth() + 1));
                                const temp = (filteredList[index].main.temp - 273.15).toFixed(1);
                                const tempFeelsLike = (filteredList[index].main.feels_like - 273.15).toFixed(1);
                                const weather = filteredList[index].weather[0].main;
                                const icon = `http://openweathermap.org/img/wn/${filteredList[index].weather[0].icon}@2x.png`;
                                filteredData.push({month, day, hours, temp, tempFeelsLike, weather, icon, city});
                            });
                            return filteredData;
                        });
                },
            );
    } /*
     базированная гигачад функция возвращает массив с объектом данных для одной коробочки в 3 табе.
     подробнее:
     1.  обработка промиса getLatLonUrl, который возвращает ссылку для запроса fetch с нужнуыми эелементами - lat и
         lon ( нужные для запроса на 3 табе), происходит fetch запрос, который возвращает огромный объект с прогнозом
         погоды на несколько дней вперёд.
     2.  затем fetch.json обрабатывается: фильтром я отобрал каждый 3 прогноз (потому что fetch возвращает много
         прогнозов на каждый день, каждые 3 часа соответствующего дня). После фильтрации происходит перебор с заданными
         filteredList значениями, (массив list хранит в себе массивы list[0] - первый прогноз , list[1] - прогноз через
         3 часа, и т.д.) внутрь индекса массива list помещается forEach значение filteredList и таким образом пушится в
         возвращаемый массив объект одного прогноза, затем прогноза через заданное в filteredList значение.
     3.  массив со всеми проногзами возвращается и используется для генерации коробочек в 3 табе.
    */

    getLatLonUrl(cityName) {
        return this.getLatLon(cityName).then(data => {
            return (`http://api.openweathermap.org/data/2.5/forecast?lat=${data[0]}&lon=${data[1]}&appid=${CONFIG.api}&cnt=40`);
        });
    } // возвращает ссылку , которая нужна для получения 40 прогнозов погоды (cnt=40 , можно задать другое).

    getLatLon(city) {
        const getLanLonApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${CONFIG.api}`;
        return fetch(getLanLonApi)
            .then(response => response.json())
            .then(result => [result[0].lat, result[0].lon]);
    } // возвращает lat и lon (координаты, которые описаны в документации openWeather)
}

function getUrl(api, serverUrl, query) {
    return `${serverUrl}?q=${query}&appid=${api}`;
} // получает ссылку для погоды в данный момент (используется для 1 и 2 таба)

function getString(number) {
    return ('' + number).length < 2 ?
        '0' + number : '' + number;
} // нужно для корректного отображения времени (вместо 6:2 6:20)
