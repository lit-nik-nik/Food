'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal'),
          close = document.querySelector('div[data-close]');
    
    function displayModal (elem) {
        const style = window.getComputedStyle(elem);

        if (style.display == 'none') {
            elem.style.display = 'block';
        } else {
            elem.style.display = 'none';
        }
    }

    close.addEventListener('click', () => {
        displayModal(modal);
    });

    btn.forEach (item => {
        item.addEventListener('click', () => {
            displayModal(modal);
        });
    });

});