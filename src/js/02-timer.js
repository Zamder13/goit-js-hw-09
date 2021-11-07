// Описан в документации
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

refs.buttonStart.setAttribute('disabled', true);

const currentTime = Date.now();

console.log(currentTime);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    if (currentTime > selectedDates[0]) {
      console.log(selectedDates);
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.buttonStart.removeAttribute('disabled');

    refs.buttonStart.addEventListener('click', () => {
      const timerID = setInterval(() => {
        const timerCurrentTime = Date.now();
        const deltaTime = selectedDates[0] - timerCurrentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        generateHtmlTime({ days, hours, minutes, seconds });
        if (deltaTime <= 1000) {
          clearInterval(timerID);
          return Notiflix.Notify.success('Time to do something😈');
        }
        console.log(convertMs(deltaTime));
      }, 1000);
      if (timerID) {
        refs.buttonStart.setAttribute('disabled', true);
      }
    });
  },
};

flatpickr('input#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function generateHtmlTime({ days, hours, minutes, seconds }) {
  refs.secondsField.textContent = `${seconds}`;
  refs.minutesField.textContent = `${minutes}`;
  refs.hoursField.textContent = `${hours}`;
  refs.daysField.textContent = `${days}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
