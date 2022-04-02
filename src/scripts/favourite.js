import $ from 'jquery';

export default class Favourite {
    constructor() {
        this.favouriteSet = new Set();
        this.container = $('.cities');
        this.input = $('.big-input-daddy');
        this.favouriteBtn = $('.favourite');
        this.callback = () => {
            console.warn('Колбек не назначен, сука! Кстати, Валера пидор.');
        };
    }

    init() {
        if (localStorage.getItem('fav')) {
            JSON.parse(localStorage.getItem('fav')).forEach(value => {
                this.favouriteSet.add(value);
            });
        }

        this.setName($('.city_name').html());
        this.updateLocal();
        this.render();

        this.favouriteBtn.on('click', () => {
            this.render();
            if (!this.isAdded()) {
                this.addCity();
            } else {
                this.deleteCity();
            }
        });
    }

    setCallback(callback) {
        this.callback = callback;
    }

    setName(CurrentCity) {
        this.currentCity = CurrentCity;
    }

    updateLocal() {
        const array = [];
        this.favouriteSet.forEach(value => {
            array.push(value);
        });
        localStorage.setItem('fav', JSON.stringify(array));
        this.favouriteSet.forEach(value => {
            const city = $(`<h3 class="${value}">${value}</h3>`);
            city.on('click', (_) => {
                this.callback(value);
            });

            $(this.container).append(city);
        });
    }

    isAdded() {
        return this.favouriteSet.has(this.currentCity);
    }

    addCity() {
        if (!this.isAdded()) {
            this.favouriteSet.add(this.currentCity);
            $(this.container).html('');
            this.updateLocal();
            $('.favourite').css({'color': 'red'});
        }
    }

    deleteCity() {
        this.favouriteSet.delete(this.currentCity);
        $(`.${this.currentCity}`).remove();
        $(this.container).html('');
        this.updateLocal();
        $('.favourite').css({'color': 'black'});
    }

    render() {
        if (this.isAdded()) {
            $('.favourite').css({'color': 'red'});
        } else {
            $('.favourite').css({'color': 'black'});
        }
    }
}