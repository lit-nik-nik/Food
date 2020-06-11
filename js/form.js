'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const forms = document.querySelectorAll('form'),
          message = {
            call: 'Перезвонить мне',
            load: 'Загрузка',
            finish: 'Сообщение отправлено',
            error: 'Ошибка отправки'
          };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        function defaultButton(text) {
            const button = form.querySelector('button');

            button.innerHTML = text;
            setTimeout(() => {
                button.innerHTML = message.call;
            }, 4000);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const req = new XMLHttpRequest(),
                  formData = new FormData(form),
                  obj = {};
    
            formData.forEach((item, key) => {
                obj[key] = item;
            });
    
            defaultButton(message.load);
    
            req.open('POST', 'server.php'); 
            req.send(JSON.stringify(obj));
    
            req.addEventListener('load', () => {
                if (req.status === 200) {
                    console.log(req.response);
                    form.reset();
                    changeModal(message.finish);
                } else {
                    changeModal(message.error);
                }
            });
        });
    }

    function changeModal(message) {
        const modal = document.querySelector('.modal__dialog'),
              newModal = document.createElement('div');
        
        modal.style.display = 'none';

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
        }, 5000);
    }
});