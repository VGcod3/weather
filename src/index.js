'use strict';
import './styles/index.scss';
import $ from 'jquery';
import { CONFIG, CONFIG_LOCAL } from './scripts/CONFIG.js';
import { getWeather, Tabs } from './scripts/infoblock.js';
import Favourite from './scripts/favourite.js';

const favourite = new Favourite();
const tabs = new Tabs();

const getAndRenderCallback = (query) => {
    getWeather(CONFIG.api, CONFIG.serverURL, query).then(data => {
        if (data['cod'] === '404') {
            cityNotFounded();
            localStorage.removeItem('lastCity');
            return false;
        }
        tabs.fill(data);
        favourite.setName($('.city_name').html());
        favourite.render();
    });
};

const setLocalLastOpenedCity = (lastCity) => {
    localStorage.getItem('lastCity') ? localStorage.setItem('preLastCity', localStorage.getItem('lastCity')) :
        console.log('первый город');
    localStorage.setItem('lastCity', lastCity.toString());

};

if (!CONFIG_LOCAL.localLastCity && CONFIG_LOCAL.localPreLastCity) {
    getAndRenderCallback(CONFIG_LOCAL.localPreLastCity);
} else if (CONFIG_LOCAL.localLastCity) {
    getAndRenderCallback(CONFIG_LOCAL.localLastCity);
} else {
    getAndRenderCallback(CONFIG.defaultCity);
}


$(document).ready(function() {
    $('input .tab-1').checked = true;
    favourite.init(); // навесили событие на сердечко И ВСЕ, ничего больше!!!!!
    favourite.setCallback(getAndRenderCallback);

    $('.big-input-daddy').on('keydown', event => {
        if (event.key === 'Enter') {
            let city = $('.big-input-daddy').val();
            getAndRenderCallback(city);
            setLocalLastOpenedCity(city);
            $('.big-input-daddy').val('');
        }
    });
});

function cityNotFounded() {
    $('.big-input-daddy').attr('readonly', 'readonly');
    $('.big-input-daddy').css({'background': '#F59189'});
    $('.big-input-daddy').attr('placeholder', 'City not found');
    setTimeout(() => {
        $('.big-input-daddy').attr('placeholder', 'Find city');
        $('.big-input-daddy').css({'background': ''});
        $('.big-input-daddy').removeAttr('readonly');
    }, 1300);
}
