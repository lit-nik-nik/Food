'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const calc = require('./modules/calculate'),
          cards = require('./modules/cards_menu'),
          modal = require('./modules/modal'),
          sliderSlick = require('./modules/slider-slick'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calc();
    cards();
    modal();
    sliderSlick();
    tabs();
    timer();
});

