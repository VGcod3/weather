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

function cityNotFounded () {
    $('.big-input-daddy').css({'background': '#F59189'})
    $('.big-input-daddy').attr('placeholder', 'City did not find');
    setTimeout(() => {
        $('.big-input-daddy').attr('placeholder', 'Find city');
        $('.big-input-daddy').css({'background': ''});
    }, 1300);
}

// Привязывает аргументы вызова к функции и ее можно вызывать без необходимости добавлять аргументы
// query() vs getWeather(CONFIG.api, CONFIG.serverURL)

$(document).ready(function() {
    favourite.init(); // навесили событие на сердечко И ВСЕ, ничего больше!!!!!
    favourite.setCallback(getAndRenderCallback);

    $('.big-input-daddy').on('keydown', event => {
        if (event.key === 'Enter') {

            if ($('.big-input-daddy').val().toLowerCase() === 'валера пидор') {
                $('.big-input-daddy').css({'background': '#64c95e'});
                setTimeout(() =>
                {$('.big-input-daddy').css({'background': ''});
                    $('.big-input-daddy').val('');
                }, 1000)
                return;}

            let city = $('.big-input-daddy').val();
            getAndRenderCallback(city);
            $('.big-input-daddy').val('');
        }
    });
});
