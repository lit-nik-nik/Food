'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const dataMenu = {
        vegy: {
            srcImg: 'vegy.jpg',
            alt: 'vegy',
            title: 'Меню "Фитнес"',
            descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: '229'
        },
        elite: {
            srcImg: 'elite.jpg',
            alt: 'elite',
            title: 'Меню “Премиум”',
            descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: '550'
        },
        post: {
            srcImg: 'post.jpg',
            alt: 'post',
            title: 'Меню "Постное"',
            descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: '430'
        },
    };

    class cardsMenu {
        constructor (srcImg, alt, title, descr, price) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
        }

        Img() {
           const img = document.createElement('img');

           img.src = `img/tabs/${this.srcImg}`;
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

            itemMenu.innerHTML = `${this.Img()} ${this.Title()} ${this.Description()} ${this.Devider()} ${this.Price()}`;
            
            return itemMenu.outerHTML;
        }
    }

    const vegy = new cardsMenu(dataMenu.vegy.srcImg, dataMenu.vegy.alt, dataMenu.vegy.title, dataMenu.vegy.descr, dataMenu.vegy.price),
          elite = new cardsMenu(dataMenu.elite.srcImg, dataMenu.elite.alt, dataMenu.elite.title, dataMenu.elite.descr, dataMenu.elite.price),
          post = new cardsMenu(dataMenu.post.srcImg, dataMenu.post.alt, dataMenu.post.title, dataMenu.post.descr, dataMenu.post.price),
          menuList = document.querySelector('.menu__field .container');

    menuList.innerHTML = '';

    menuList.innerHTML = `${vegy.Create()} ${elite.Create()} ${post.Create()}`;

});