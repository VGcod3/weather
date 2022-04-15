import $ from 'jquery';
import { getWeather, Tabs } from './infoblock';
import { CONFIG, CONFIG_LOCAL } from './CONFIG';
import Favourite from './favourite';

const favourite = new Favourite();
const tabs = new Tabs();

export default class App {
    constructor() {
    }

    run() {
        this.init();
        $('.big-input-daddy').on('keydown', event => {
            if (event.key === 'Enter') {
                let city = $('.big-input-daddy').val();
                this.getAndRenderCallback(city);
                this.setLocalLastOpenedCity(city);
                $('.big-input-daddy').val('');
            }
        });
    }

    init() {
        this.updatePage();
        favourite.init();
        favourite.setCallback(this.getAndRenderCallback);
    }

    updatePage() {
        if (!CONFIG_LOCAL.localLastCity && CONFIG_LOCAL.localPreLastCity) {
            this.getAndRenderCallback(CONFIG_LOCAL.localPreLastCity);
        } else if (CONFIG_LOCAL.localLastCity) {
            this.getAndRenderCallback(CONFIG_LOCAL.localLastCity);
        } else {
            this.getAndRenderCallback(CONFIG.defaultCity);
        }
    }

    getAndRenderCallback(query) {
        getWeather(CONFIG.api, CONFIG.serverURL, query).then(data => {
            if (data['cod'] === '404') {
                this.cityNotFounded();
                localStorage.removeItem('lastCity');
                return false;
            }
            tabs.fill(data);
            favourite.setName($('.city_name').html());
            favourite.render();
        });
    }  // эта функция делает запрос по городу

    cityNotFounded() {
        $('.big-input-daddy').attr('readonly', 'readonly');
        $('.big-input-daddy').css({'background': '#F59189'});
        $('.big-input-daddy').attr('placeholder', 'City not found');
        setTimeout(() => {
            $('.big-input-daddy').attr('placeholder', 'Find city');
            $('.big-input-daddy').css({'background': ''});
            $('.big-input-daddy').removeAttr('readonly');
        }, 1300);
    } // эта функция имеет чисто визуальный хаарктер , используется для показа ошибки запроса в input

    setLocalLastOpenedCity(lastCity) {
        localStorage.getItem('lastCity') ?
            localStorage.setItem('preLastCity', localStorage.getItem('lastCity')) : false;
        localStorage.setItem('lastCity', lastCity.toString());

    } //  эта функция работает с localStorage и ничего более
}
