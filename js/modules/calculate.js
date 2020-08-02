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

export default calc;
    
