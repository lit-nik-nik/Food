'use strict';

window.addEventListener('DOMContentLoaded', () => {

    async function getData(url) {
        let res = await fetch(url);

        if (!res.ok) {
            new Error(`Ошибка доступа к серверу по адресу: ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    class cardsMenu {
        constructor (srcImg, alt, title, descr, price) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.convert = 27;
            this.price = +price * this.convert;
        }

        Img() {
           const img = document.createElement('img');

           img.src = `${this.srcImg}`;
           img.alt = `${this.alt}`;

           return img.outerHTML;
        }

        Title() {
           const title = document.createElement('h3');

           title.classList.add('menu__item-subtitle');
           title.innerHTML = `${this.title}`;

           return title.outerHTML;
        }

        Description() {
            const descr = document.createElement('div');                  

            descr.classList.add('menu__item-descr');
            
            descr.innerHTML = `${this.descr}`;

            return descr.outerHTML;
        }

        Devider() {
            const devider = document.createElement('div');

            devider.classList.add('menu__item-divider');

            return devider.outerHTML;
        }

        Price() {
            const price = document.createElement('div'),
                  cost = document.createElement('div'),
                  total = document.createElement('div'),
                  span = document.createElement('span');

            price.classList.add('menu__item-price');
            cost.classList.add('menu__item-cost');
            total.classList.add('menu__item-total');
            
            cost.innerHTML = `Цена:`;
            span.innerHTML = `${this.price}`;
            total.innerHTML = `${span.outerHTML} грн/день`;
            price.innerHTML = `${cost.outerHTML} ${total.outerHTML}`;

            return price.outerHTML;
        }

        Create() {
            const itemMenu = document.createElement('div');

            itemMenu.classList.add('menu__item');

            itemMenu.innerHTML = `
                ${this.Img()} 
                ${this.Title()} 
                ${this.Description()} 
                ${this.Devider()} 
                ${this.Price()}
            `;
            
            document.querySelector('.menu__field .container').append(itemMenu);
        }
    }

    getData('http://localhost:3000/menu')
    .then (data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new cardsMenu(
                img,
                altimg,
                title,
                descr,
                price
            ).Create();
        });
    });

});