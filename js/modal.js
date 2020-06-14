'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const btn = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal'),
          modalTimer = setTimeout(openModal, 30000);
    
    function openModal () {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    }

    function closeModal () {
            modal.style.display = 'none';
            document.body.style.overflow = '';
    }

    btn.forEach (item => {
        item.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //форма отправки сообщения
    
    const forms = document.querySelectorAll('form'),
          message = {
            call: 'Перезвонить мне',
            load: 'Загрузка',
            finish: 'Сообщение отправлено',
            error: 'Ошибка отправки'
          };

    forms.forEach(item => {
        modalPostData(item);
    });


    async function postData (url, data) {
        let res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

        return await res.json();
    }

    function modalPostData(form) {
        function defaultButton(text) {
            const button = form.querySelector('button');

            button.innerHTML = text;
            setTimeout(() => {
                button.innerHTML = message.call;
            }, 4000);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form),
                  json = JSON.stringify(Object.fromEntries(formData.entries()));

            defaultButton(message.load);

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                changeModal(message.finish);
            })
            .catch(() => {
                changeModal(message.error);
            })
            .finally(() => {
                form.reset();
            });

        });
    }

    function changeModal(message) {
        const modal = document.querySelector('.modal__dialog'),
              newModal = document.createElement('div');
        
        modal.style.display = 'none';
        openModal();

        newModal.classList.add('modal__dialog');
        newModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(newModal);

        setTimeout(() => {
            newModal.remove();
            modal.style.display = 'block';
            closeModal();
        }, 5000);
    }
});