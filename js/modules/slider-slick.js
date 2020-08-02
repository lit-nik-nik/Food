function sliderSlick({container, wrapper, inner, slide, prevArrow, nextArrow, totalId, currentId, indicatorElem}) {

    const slider = document.querySelector(container),
          sliderWrapper = slider.querySelector(wrapper),
          sliderInner = sliderWrapper.querySelector(inner),
          slides = sliderInner.querySelectorAll(slide),
          prev = slider.querySelector(prevArrow),
          next = slider.querySelector(nextArrow),
          total = slider.querySelector(totalId),
          current = slider.querySelector(currentId),
          width = +window.getComputedStyle(sliderWrapper).width.slice(0, 3),
          indicator = document.createElement(indicatorElem);

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

export default sliderSlick;