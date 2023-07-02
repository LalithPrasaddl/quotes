import './style.css'

import {generateContent} from './wrapper'
const intervalTimer = 7000;
const appState = {
  currIndex: -1
}

const quotes = [
  "When you see a problem, you don’t complain about it, instead you try to find a way and solve it.",
  "You don't just dream big, but you wake up and work hard (really hard) to achieve it.",
  "You don't just think about yourself, you care for the causes which affects the nature and the future of human beings.",
  "You do what needs to be done, not what is easy, nor what is normal.",
  "You don't give up when you fail, you try to find out what went wrong, you learn from your mistakes and come back stronger.",
  "You don’t lose confidence when things are not going your way and you stay humble while you are on the peak of success.",
  "You are confined only by the walls you build YOURSELF.",
  "Dont go with the flow. Be the flow.",
  "If you want to be successful, you must respect one rule - Never Lie to Yourself.",
  "No matter how hard you try, You will always miss out on something in life. Let's just enjoy the moment.",
  "Everything you have ever wanted is on the other side of Fear.",
  "Simplicity is the ultimate sophistication.",
  "The greatest prison we live in, is what other people think.",
  "Better to be a warrior in a garden, than a gardener in a war.",
  "Love is giving someone the power to destroy you, and trust he/she won't do it.",
  "Do not stop when you are tired, stop when you are done."
]
let interval = null;
setupPage()

function setupPage() {
  const app = document.getElementById('app')
  const page = setupQuote()
  if (interval) {
    clearInterval(interval);
  }
  setQuoteInterval();
  app.append(page)
}

function setupQuote(type) {
  if (interval) {
    clearInterval(interval);
  }
  setQuoteInterval();
  if (type === 'decrement') {
    appState.currIndex -=1
  } else {
    appState.currIndex += 1
  }
  if (appState.currIndex >= quotes.length) {
    appState.currIndex = 0;
  }
  if (appState.currIndex < 0) {
    appState.currIndex = 0;
  }
  const data = {
    type: 'div',
    elmAttrs: {
      id: 'quotes'
    },
    childElms: [{
      type: 'h1',
      elmAttrs: {
        innerHTML: quotes[appState.currIndex]
      }
    }]
  }
  const quotesElm = generateContent(data)
  return quotesElm
}

document.addEventListener("touchstart", function(event) {
  setupQuote();
}, false);


document.addEventListener("keydown", function(event) {
  if ([39, 40].indexOf(event.keyCode) > -1) {
    setupQuote();
  }
  if ([37, 38].indexOf(event.keyCode) > -1) {
    setupQuote('decrement');
  }
});

function setQuoteInterval() {
  interval = setInterval(() => {
    setupQuote()
  }, intervalTimer)
}
