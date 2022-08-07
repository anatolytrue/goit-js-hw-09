const refs = {
  firstDelay: document.querySelector('.delay'),
  stepDelay: document.querySelector('.step'),
  amount: document.querySelector('.amount'),
  submitBtn: document.querySelector('.submit-btn'),
  formElem: document.querySelector('.form')
}


refs.formElem.addEventListener('submit', submitPromise)





function counterPromises(amount, delay, step) {
  for (let i = 1; i <= amount; i += 1){
    let total = delay + step * (i - 1);
    createPromise(i, total)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    })
  }
}

function submitPromise(e) {
  e.preventDefault();
  const amount = Number(e.target.amount.value);
  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);

  counterPromises(amount, delay, step);
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



// const result = arr.reduce(function(sum, current) {
//   return sum + current;
// }, 0);
