'use strict';
import './styles/index.scss';
import $ from 'jquery';
import App from  './scripts/app';
const app = new App();

$(document).ready(() => {
    app.run();
});
