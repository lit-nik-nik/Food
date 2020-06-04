'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal'),
          close = document.querySelector('div[data-close]'),
          modalTimer = setTimeout(displayModal, 5000);
    
    function displayModal () {
        const style = window.getComputedStyle(modal);

        if (style.display == 'none') {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearTimeout(modalTimer);
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    btn.forEach (item => {
        item.addEventListener('click', displayModal);
    });

    close.addEventListener('click', displayModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            displayModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.style.display == 'block') {
            displayModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            displayModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
});