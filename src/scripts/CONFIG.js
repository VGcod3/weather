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
                                    <div class="mini-cloud" style="background: url('${data.icon}');
                                     background-repeat: no-repeat;background-position: center;background-size: cover;"></div>
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

let obj = {
    'coord': {'lon': 46.0333, 'lat': 51.5667},
    'weather': [{'id': 804, 'main': 'Clouds', 'description': 'overcast clouds', 'icon': '04d'}],
    'base': 'stations',
    'main': {
        'temp': 283.68,
        'feels_like': 283.11,
        'temp_min': 283.68,
        'temp_max': 283.68,
        'pressure': 1004,
        'humidity': 89,
        'sea_level': 1004,
        'grnd_level': 987,
    },
    'visibility': 8295,
    'wind': {'speed': 5.47, 'deg': 185, 'gust': 10.48},
    'clouds': {'all': 98},
    'dt': 1648896346,
    'sys': {'country': 'RU', 'sunrise': 1648866561, 'sunset': 1648913361},
    'timezone': 14400,
    'id': 498677,
    'name': 'Saratov',
    'cod': 200,
};

let x = {
    'cod': '200',
    'message': 0,
    'cnt': 2,
    'list': [{
        'dt': 1649084400,
        'main': {
            'temp': 286.85,
            'feels_like': 286.39,
            'temp_min': 284.25,
            'temp_max': 286.85,
            'pressure': 1010,
            'sea_level': 1010,
            'grnd_level': 1007,
            'humidity': 81,
            'temp_kf': 2.6,
        },
        'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04d'}],
        'clouds': {'all': 75},
        'wind': {'speed': 5.09, 'deg': 266, 'gust': 11.24},
        'visibility': 10000,
        'pop': 0,
        'sys': {'pod': 'd'},
        'dt_txt': '2022-04-04 15:00:00',
    },
        {
            'dt': 1649095200,
            'main': {
                'temp': 286.07,
                'feels_like': 285.61,
                'temp_min': 284.52,
                'temp_max': 286.07,
                'pressure': 1010,
                'sea_level': 1010,
                'grnd_level': 1007,
                'humidity': 84,
                'temp_kf': 1.55,
            },
            'weather': [{'id': 803, 'main': 'Clouds', 'description': 'broken clouds', 'icon': '04d'}],
            'clouds': {'all': 83},
            'wind': {'speed': 5.1, 'deg': 277, 'gust': 11.1},
            'visibility': 10000,
            'pop': 0,
            'sys': {'pod': 'd'},
            'dt_txt': '2022-04-04 18:00:00',
        }],
    'city': {
        'id': 2643743,
        'name': 'London',
        'coord': {'lat': 51.5073, 'lon': -0.1276},
        'country': 'GB',
        'population': 1000000,
        'timezone': 3600,
        'sunrise': 1649050154,
        'sunset': 1649097448,
    },
};
