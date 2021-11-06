const refs = {
  stratButton: document.querySelector(`button[data-start]`),
  stopButton: document.querySelector(`button[data-stop]`),
};

let IntervalId = 0;

refs.stratButton.addEventListener('click', onHandleStart);
refs.stopButton.addEventListener('click', onHandleStop);

function onHandleStart() {
  console.log('start');

  IntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.stratButton.setAttribute('disabled', true);
  refs.stopButton.removeAttribute('disabled');
}
console.log();

function onHandleStop() {
  console.log('stop');
  // if (IntervalId) {
  clearInterval(IntervalId);
  // }
  refs.stopButton.setAttribute('disabled', true);
  refs.stratButton.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
