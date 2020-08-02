'use strict';

    import calc from './modules/calculate';
    import cards from './modules/cards_menu';
    import modal from './modules/modal';
    import sliderSlick from './modules/slider-slick';
    import tabs from './modules/tabs';
    import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {

    calc();
    cards();
    modal('button[data-modal]', '.modal');
    sliderSlick({
        container: '.offer__slider', 
        wrapper: '.offer__slider-wrapper', 
        inner: '.offer__slider-inner', 
        slide: '.offer__slide', 
        prevArrow: '.offer__slider-prev', 
        nextArrow: '.offer__slider-next', 
        totalId: '#total', 
        currentId: '#current', 
        indicatorElem: 'ol'
    });
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', '.tabheader__item_active');
    timer('.timer', '2020-08-30');

});

