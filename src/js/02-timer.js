import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const refs = {
    btnStart: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
    flatpickrInit: document.querySelector('#datetime-picker')
}

refs.btnStart.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = Date.now();


        if (selectedDates[0] < dateNow) {
            window.alert("Please choose a date in the future")
            return
        }
        const chooseDate = selectedDates[0].getTime();

        refs.btnStart.removeAttribute('disabled');
        function countdown() {
            const intervalId = setInterval(() => {
                const currentDate = Date.now();
                const timeDifference = chooseDate - currentDate;
                console.log(timeDifference)
                if (timeDifference <= 0) {
                    clearInterval(intervalId);
                    return
                }
                convertMs(timeDifference);
            }, 1000)
        } 
        refs.btnStart.addEventListener('click', countdown);
    console.log(selectedDates[0]);
    },
};

flatpickr(refs.flatpickrInit, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    refs.dataDays.textContent = days;
    refs.dataHours.textContent = hours;
    refs.dataMinutes.textContent = minutes;
    refs.dataSeconds.textContent = seconds;

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}