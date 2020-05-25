'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal'),
          close = document.querySelector('div[data-close]');
    
    function displayModal (elem) {
        const style = window.getComputedStyle(elem);

        if (style.display == 'none') {
            elem.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            elem.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    btn.forEach (item => {
        item.addEventListener('click', () => {
            displayModal(modal);
        });
    });

    close.addEventListener('click', () => {
        displayModal(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            displayModal(modal);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.style.display == 'block') {
            displayModal(modal);
        }
    })

});