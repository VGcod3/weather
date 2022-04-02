import $ from 'jquery';

export function getWeather(api, severUrl, query) {
    let temperature, cityName, weatherImage, feelLike, weatherMain, sunrise, sunset, error;
    return fetch(getUrl(api, severUrl, query))
        .then(response => response.json())
        .then(result => {
                if (result.cod === '404') {
                        return result;
                }

                error = result.cod;
                temperature = ((result.main.temp - 273.15).toFixed(1) + '°');
                feelLike = ((result.main.feels_like - 273.15).toFixed(1) + '°');
                cityName = result.name;
                weatherImage = (`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                weatherMain = result.weather[0].main;
                let sunriseTime = new Date(result.sys.sunrise * 1000);
                sunrise = getString(sunriseTime.getHours()) + ':' + getString(sunriseTime.getMinutes());
                let sunsetTime = new Date(result.sys.sunset * 1000);
                sunset = getString(sunsetTime.getHours()) + ':' + getString(sunsetTime.getMinutes());

                return {temperature, cityName, weatherImage, feelLike, weatherMain, sunrise, sunset};
            },
        );
}

function getString(number) {
    return ('' + number).length < 2 ? '0' + number : '' + number;
}

export class Tabs {
    constructor() {
    }

    fill(data) {
        this.fillNowTab(data);
        this.fillDetailTab(data);
    }

    fillNowTab(data) {
        $('.temp').html(data.temperature);
        $('.city_name').html(data.cityName);
        $('.cloud img').attr('src', data.weatherImage);
    }

    fillDetailTab(data) {
        $('.details__city-name').html(data.cityName);
        $('#details-temp').html('Temperature: ' + data.temperature);
        $('#details-feels').html('Feels like: ' + data.feelLike);
        $('#details-weather').html('Weather: ' + data.weatherMain);
        $('#details-sunrise').html('Sunrise: ' + data.sunrise);
        $('#details-sunset').html('Sunset: ' + data.sunset);
    }
}


export function getUrl(api, serverUrl, query) {
    return `${serverUrl}?q=${query}&appid=${api}`;
}
