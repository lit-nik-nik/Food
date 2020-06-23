'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const calculate = document.querySelector('.calculating'),
          genders = calculate.querySelectorAll('#gender div'),
          actives = calculate.querySelectorAll('.calculating__choose_big div'),
          inputs = calculate.querySelectorAll('input'),
          result = calculate.querySelector('.calculating__result span');

    let weight, height, age, active = 1.375;

    function changeActiveClass(items, i) {
        items.forEach(item => {
            item.classList.remove('calculating__choose-item_active');
        });
        items[i].classList.add('calculating__choose-item_active');
    }
          
    function calcCalories() {
        if (!weight || !height || !age || !active) {
            result.innerHTML = '_____';
        } else {
            genders.forEach(gender => {
                if ( gender.innerHTML === 'Женщина' && 
                     gender.classList.contains('calculating__choose-item_active')) {
                    result.innerHTML = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * active);
                } else if ( gender.innerHTML === 'Мужчина' && 
                            gender.classList.contains('calculating__choose-item_active')) {
                    result.innerHTML = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * active);
                }
            });
        }
    }

    function dinamicContent() {
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                switch(input.getAttribute('id')) {
                    case 'height':
                        height = input.value;
                        break;
                    case 'weight':
                        weight = input.value;
                        break;
                    case 'age':
                        age = input.value;
                        break;
                }
                calcCalories();
            });
        });
    }

    function staticContent(content) {
        content.forEach((item, i) => {
            item.addEventListener('click', () => {
                changeActiveClass(content, i);
                if (item.getAttribute('id')) {
                    switch (item.getAttribute('id')) {
                        case 'low':
                            active = 1.2;
                            break;
                        case 'small':
                            active = 1.375;
                            break;
                        case 'medium':
                            active = 1.55;
                            break;
                        case 'high':
                            active = 1.725;
                            break;
                    }
                }
                calcCalories();
            });
        });
    }

    calcCalories();
    dinamicContent();
    staticContent(actives);
    staticContent(genders);
});