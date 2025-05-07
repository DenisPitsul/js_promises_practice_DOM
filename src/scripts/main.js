'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('click', () => {
    isLeftClicked = true;

    if (isRightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    isRightClicked = true;

    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);

function successHandler(message) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('success');
  messageElement.dataset.qa = 'notification';
  messageElement.textContent = message;

  document.body.append(messageElement);
}

function errorHandler(message) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('error');
  messageElement.dataset.qa = 'notification';
  messageElement.textContent = message;

  document.body.append(messageElement);
}
