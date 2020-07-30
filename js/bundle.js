/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
    
    const calculate = document.querySelector('.calculating'),
          genders = calculate.querySelectorAll('#gender div'),
          actives = calculate.querySelectorAll('.calculating__choose_big div'),
          inputs = calculate.querySelectorAll('input'),
          result = calculate.querySelector('.calculating__result span');
    
    let weight = localStorage.getItem('weight'), 
        height = localStorage.getItem('height'), 
        age = localStorage.getItem('age'), 
        active;

    // Установка значения для переменной active
    if (!localStorage.getItem('active')) {
        localStorage.setItem('active', 1.375);
        active = localStorage.getItem('active');
    } else {
        active = localStorage.getItem('active');
    }

    // Изменение активного класса
    function changeActiveClass(items, i) {
        items.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });
        items[i].classList.add('calculating__choose-item_active');
    }

    // Формула расчета каллорий
    function calcCalories() {
        if (!weight || !height || !age || !active) {
            result.innerHTML = '_____';
        } else {
            genders.forEach(gender => {
                if ( 
                    gender.innerHTML === 'Женщина' && 
                    gender.classList.contains('calculating__choose-item_active')
                   ) {
                    result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * active);
                } else if ( 
                            gender.innerHTML === 'Мужчина' && 
                            gender.classList.contains('calculating__choose-item_active')
                          ) {
                    result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * active);
                }
            });
        }
    }

    // Получение данных из диннамических полей
    function dinamicContent() {
        inputs.forEach(input => {
            input.value = localStorage.getItem(input.id);
            
            input.addEventListener('input', () => {
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }

                localStorage.setItem(input.id, input.value);
                calcCalories();
            });
        });
    }

    // Получение данных их статичных полей
    function staticContent(content) {
        content.forEach((item, i) => {
            item.addEventListener('click', () => {
                changeActiveClass(content, i);

                if (item.getAttribute('id')) {
                    switch (item.getAttribute('id')) {
                        case 'low':
                            localStorage.setItem('active', 1.2);
                            active = localStorage.getItem('active');
                            break;
                        case 'small':
                            localStorage.setItem('active', 1.375);
                            active = localStorage.getItem('active');
                            break;
                        case 'medium':
                            localStorage.setItem('active', 1.55);
                            active = localStorage.getItem('active');
                            break;
                        case 'high':
                            localStorage.setItem('active', 1.725);
                            active = localStorage.getItem('active');
                            break;
                    }
                }
                
                calcCalories();
            });
        });
    }

    dinamicContent();
    staticContent(actives);
    staticContent(genders);
    calcCalories();
}

module.exports = calc;
    


/***/ }),

/***/ "./js/modules/cards_menu.js":
/*!**********************************!*\
  !*** ./js/modules/cards_menu.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards() {

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

    axios.get('http://localhost:3000/menu')
    .then (data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new cardsMenu(
                img,
                altimg,
                title,
                descr,
                price
            ).Create();
        });
    });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {

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

    //функция отправки данных через axios
    async function postData(url, data) {
        let res = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-type': 'application/json'
            },
            data: data,
        });

        return await res;
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
            .then(function (response) {
                console.log(response.data);
                changeModal(message.finish);
            })
            .catch(function (error) {
                console.log(error);
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

}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider-slick.js":
/*!************************************!*\
  !*** ./js/modules/slider-slick.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function sliderSlick() {

    const slider = document.querySelector('.offer__slider'),
          sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
          sliderInner = sliderWrapper.querySelector('.offer__slider-inner'),
          slides = sliderInner.querySelectorAll('.offer__slide'),
          prev = slider.querySelector('.offer__slider-prev'),
          next = slider.querySelector('.offer__slider-next'),
          total = slider.querySelector('#total'),
          current = slider.querySelector('#current'),
          width = +window.getComputedStyle(sliderWrapper).width.slice(0, 3),
          indicator = document.createElement('ol');

    let i = 1,
        transform = 0,
        dots = [];

    sliderInner.style.width = `${width * slides.length}px`;
    sliderInner.style.transition = 'transform 500ms';
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = `${width}px`;
        slide.style.float = 'left';
    });

     // Отображение общего количества слайдов на странице
     if (slides.length <= 9) {
        total.innerHTML = `0${slides.length}`;
    } else {
        total.innerHTML = `${slides.length}`;
    }

    // Нумерация отображаемого слайда
    function editCurrent(i) {
        if (slides.length <= 9) {
            current.innerHTML = `0${i}`;
        } else {
            total.innerHTML = `${i}`;
        }
    }

    // Изменение слайда
    function editSlide(i, value) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[i - 1].style.opacity = '1';
        
        sliderInner.style.transform = `translate3d(-${value}px, 0, 0)`;
        editCurrent(i);
    }

    // Добавление родителя dot's на страницу
    slider.style.position = 'relative';

    indicator.classList.add('carousel-indicators');
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicator);

    // добавление dot's по кол-ву слайдов
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.classList.add('dot');
        dot.setAttribute('id', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i ==0) {
            dot.style.opacity = '1';
        }

        indicator.append(dot);
        dots.push(dot);
    }
    
    // Событие на показ следующего слайда
    next.addEventListener('click', () => {
        if (transform == width * (slides.length - 1)) {
            transform = 0;
            i = 1;
        } else {
            transform += width;
            i++;
        }

        editSlide(i, transform);
    });

    // Событие на показ предыдущего слайда
    prev.addEventListener('click', () => {
        if (transform == 0) {
            transform = width * (slides.length - 1);
            i = slides.length;
        } else {
            transform -= width;
            i--;
        }
        
        editSlide(i, transform);
    });

    // Изменение отображения слайда по клику на dot
    dots.forEach((dot, key) => {
        dot.addEventListener('click', () => {
                transform = width * key;

                i = key + 1;

                editSlide(i, transform);
        });
    });

    editCurrent(i);

}

module.exports = sliderSlick;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {

    const parentTabs = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          contentTabs = document.querySelectorAll('.tabcontent');

    const hideTabs = () => {
        contentTabs.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    const showTabs = (i = 0) => {
        contentTabs[i].style.display = 'block';
        contentTabs[i].classList.add('fade');
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabs();
    showTabs();

    parentTabs.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach ((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTabs(i);
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {

    const deadline = '2020-08-30';

    function restTime(endtime) {
        let time = Date.parse(endtime) - new Date().getTime();

        const day = Math.floor(time / (1000 * 60 * 60 * 24)),
              hours = Math.floor(time / (1000 * 60 * 60) % 24),
              minutes = Math.floor(time / (1000 * 60) % 60),
              second = Math.floor(time / (1000) % 60);
        
        return {
            'total': time,
            'day': day,
            'hours': hours,
            'minutes': minutes,
            'second': second
        };
    }

    function addZero (elem) {
        if (elem < 10 && elem >= 0) {
            return `0${elem}`;
        } else {
            return elem;
        }
    }

    function Timer(endtime) {
        const timerBlock = document.querySelector('.timer'),
              days = timerBlock.querySelector('#days'),
              hours = timerBlock.querySelector('#hours'),
              minutes = timerBlock.querySelector('#minutes'),
              seconds = timerBlock.querySelector('#seconds'),
              timerStart = setInterval(updateTimer, 1000);

        updateTimer();        

        function updateTimer() {
            const time = restTime(endtime);

            days.innerHTML = addZero(time.day);
            hours.innerHTML = addZero(time.hours);
            minutes.innerHTML = addZero(time.minutes);
            seconds.innerHTML = addZero(time.second);

            if (time.total <= 0) {
                clearInterval(timerStart);
            }

            if (time.day < 10) {
                days.innerHTML = `0${time.day}`;
            }
        }
    }

    Timer(deadline);

}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener('DOMContentLoaded', () => {

    const calc = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js"),
          cards = __webpack_require__(/*! ./modules/cards_menu */ "./js/modules/cards_menu.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          sliderSlick = __webpack_require__(/*! ./modules/slider-slick */ "./js/modules/slider-slick.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    calc();
    cards();
    modal();
    sliderSlick();
    tabs();
    timer();
});



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map