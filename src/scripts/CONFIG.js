import $ from 'jquery';

export const CONFIG = {
    defaultCity: 'Moscow', // город по умолчачанию
    serverURL: 'http://api.openweathermap.org/data/2.5/weather', // серверная штука
    api: 'f660a2fb1e4bad108d6160b7f58c555f', // беслпатное апи для серверной штуки
};

export const CONFIG_LOCAL = {
    localPreLastCity: localStorage.getItem('preLastCity'),
    localLastCity: localStorage.getItem('lastCity'),
}; // сокращения для localStorage, чтобы многа буков не писать


export function getString(number) {
    return ('' + number).length < 2 ?
        '0' + number : '' + number;
} // нужно для корректного отображения времени (вместо 6:2 6:20)

export function forecastBoxItemTemplate(data, index) {
    return `<div class="box__item">
                            <div class="time">
                                <h3 class="date">${data[index].day} ${data[index].month}</h3>
                                <h3 class="clock">${data[index].hours}</h3>
                            </div>
                            <div class="temp-and-image">
                                <div class="forecast-temperature">
                                    <h3 class="temperature">Temperature: ${data[index].temp}º</h3>
                                    <h3 class="temperature-feels">Feels like: ${data[index].tempFeelsLike}º</h3>
                                </div>
                                <div class="weather-img">
                                    <h4>${data[index].weather}</h4>
                                    <div class="mini-cloud" style="background: url('${data[index].icon}') no-repeat center;background-size: cover;"></div>
                                </div>
                            </div>
                        </div>`;
} // шаблон коробочки из 3 таба

export function forecastBoxAppend(objectData) {
    objectData.forEach((value, i) => {
        $('.forecast__city-name').html(objectData[i].city);
        $('.box').append(forecastBoxItemTemplate(objectData, i));
    });
} // заполняет 3 таб

export function getMonthName(number) {
    switch (number) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
    }
} // костыль разработанный где-то в китае, чтобы числа конвертировать в буковы (названия месяца)
