import Notiflix from 'notiflix';

let delay = 0;
let position = 0;

const ref = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button[type="submit"]'),
};

ref.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formElement = event.currentTarget.elements;
  const firstDelay = parseInt(formElement.delay.value);
  const delayStep = parseInt(formElement.step.value);
  const amountValue = parseInt(formElement.amount.value);

  makeMultiplePromises(firstDelay, delayStep, amountValue);
  ref.form.reset();
  delay = 0;
}

function makeMultiplePromises(firstDelay, delayStep, amount) {
  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      delay = firstDelay;
    } else {
      delay += delayStep;
    }
    position = i;
    console.log(position);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
