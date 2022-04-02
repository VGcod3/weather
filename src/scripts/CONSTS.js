import $ from 'jquery';

export const CONFIG = {
    serverURL: 'http://api.openweathermap.org/data/2.5/weather',
    api: 'f660a2fb1e4bad108d6160b7f58c555f',
};

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
