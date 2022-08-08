const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

let timerId = 0;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
    document.body.style.background = getRandomHexColor();
}

function clearEventListener() {
    clearInterval(timerId);
    document.querySelector('[data-start]').disabled = false;
    // buttonStart.removeEventListener(clearEventListener)
}

buttonStart.addEventListener('click', () => {
    timerId = setInterval(changeColor, 1000);
    document.querySelector('[data-start]').disabled = true;

    buttonStop.addEventListener('click', clearEventListener);
})

