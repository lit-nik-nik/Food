function timer(timerSelector, deadline) {

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

    function addTimer(timerSelector, endtime) {
        const timerBlock = document.querySelector(timerSelector),
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

    addTimer(timerSelector, deadline);

}

export default timer;