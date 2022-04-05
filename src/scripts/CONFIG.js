import $ from 'jquery';

export const CONFIG = {
    serverURL: 'http://api.openweathermap.org/data/2.5/weather',
    api: 'f660a2fb1e4bad108d6160b7f58c555f',
};

export function forecastBoxItemTemplate(data) {
    return `<div class="box__item">
                            <div class="time">
                                <h3 class="date">${data.day} ${data.month}</h3>
                                <h3 class="clock">${data.hours}</h3>
                            </div>
                            <div class="temp-and-image">
                                <div class="forecast-temperature">
                                    <h3 class="temperature">Temperature: ${data.temp}º</h3>
                                    <h3 class="temperature-feels">Feels like: ${data.tempFeelsLike}º</h3>
                                </div>
                                <div class="weather-img">
                                    <h4>${data.weather}</h4>
                                    <div class="mini-cloud" style="background: url('${data.icon}') no-repeat center;background-size: cover;"></div>
                                </div>
                            </div>
                        </div>`;
}

export function forecastBoxAppend(objectData) {
    $('.forecast__city-name').html(objectData.city);
    $('.box').append(forecastBoxItemTemplate(objectData));
}

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
}
