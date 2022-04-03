'use strict';
import './styles/index.scss';
import $ from 'jquery';
import { CONFIG } from './scripts/CONSTS.js';
import { getWeather, Tabs } from './scripts/infoblock.js';
import Favourite from './scripts/favourite.js';

const favourite = new Favourite();
const tabs = new Tabs();

const getAndRenderCallback = (query) => {
    getWeather(CONFIG.api, CONFIG.serverURL, query).then((data) => {
        if (data.cod === '404') {
            cityNotFounded();
            return;
        }
        tabs.fill(data);
        favourite.setName($('.city_name').html());
        favourite.render();
    });
};

const setLocalLastOpenedCity = (lastCity) => {
    localStorage.setItem('lastCity', lastCity.toString());
};

localStorage.getItem('lastCity') ? getAndRenderCallback(localStorage.getItem('lastCity'))
    : getAndRenderCallback('Moscow');

function cityNotFounded() {
    $('.big-input-daddy').attr('readonly', 'readonly');
    $('.big-input-daddy').css({'background': '#F59189'});
    $('.big-input-daddy').attr('placeholder', 'City not found');
    setTimeout(() => {
        $('.big-input-daddy').attr('placeholder', 'Find city');
        $('.big-input-daddy').css({'background': ''});
        $('.big-input-daddy').removeAttr('readonly');
    }, 1300);
} // Привязывает аргументы вызова к функции и ее можно вызывать без необходимости добавлять аргументы

$(document).ready(function() {
    favourite.init(); // навесили событие на сердечко И ВСЕ, ничего больше!!!!!
    favourite.setCallback(getAndRenderCallback);

    $('.big-input-daddy').on('keydown', event => {
        if (event.key === 'Enter') {
            let city = $('.big-input-daddy').val();
            setLocalLastOpenedCity(city);
            getAndRenderCallback(city);
            $('.big-input-daddy').val('');
        }
    });
});
