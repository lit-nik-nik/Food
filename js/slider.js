'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          sliderTimer = setInterval(editSlide, 5000);

    let i = 0;

    //выставление общего количества слайдов на странице
    if (slides.length <= 9) {
        total.innerHTML = `0${slides.length}`;
    } else {
        total.innerHTML = `${slides.length}`;
    }

    // функция нумерации отображаемого слайда
    function editCurrent(i) {
        if (slides.length <= 9) {
            current.innerHTML = `0${i}`;
        } else {
            total.innerHTML = `${i}`;
        }
    }

    //функция скрытия слайдов
    function hideSlide() {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('fade');
        });
    }

    //функция показа определенного слайда
    function showSlide(i = 0) {
        slides[i].style.display = 'block';
        slides[i].classList.add('fade');

    }

    //функция изменения слайда по времени
    function editSlide(route = 'next') {

        let key, compare, value;

        if (route == 'next') {
            key = i + 1;
            compare = i < slides.length - 1;
            value = 0;
        } else {
            key = i - 1;
            compare = i < slides.length && i > 0;
            value = slides.length - 1;         
        }

        i = key;
        if (compare) {
            hideSlide();
            showSlide(i);
        } else {
            i = value;
            hideSlide();
            showSlide(i);
        }
        editCurrent(i + 1);  
    }

    //событие на показ следующего слайда
    next.addEventListener('click', () => {
        editSlide();
    });

    //событие на показ предыдущего слайда
    prev.addEventListener('click', () => {
        editSlide('prev');
    });

    hideSlide();
    showSlide();
    editCurrent(i + 1);
});