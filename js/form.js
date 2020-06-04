'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const forms = document.querySelectorAll('form'),
          message = {
            call: 'Перезвоните мне',
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
        }

        defaultButton(message.call);

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
                    defaultButton(message.finish);
                    setTimeout(() => {
                        defaultButton(message.call);
                    }, 5000);
                } else {
                    defaultButton(message.error);
                }
            });
        });
    }

});