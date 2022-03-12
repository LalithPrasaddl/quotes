import './style.css'

import {generateContent} from './wrapper'
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
  "Dont Let Dreams Be Dreams.",
  "You are confined only by the walls you build YOURSELF.",
  "Dont go with the flow. Be the flow.",
  "If you want to be successful, you must respect one rule - Never Lie to Yourself.",
  "The only thing standing between you and your goals is the bullshit story you keep telling yourself.",
  "No matter how hard you try, You will always miss out on something in life. Let's just enjoy the moment.",
  "Everything you have ever wanted is on the other side of Fear.",
  "Simplicity is the ultimate sophistication.",
  "The greatest prison we live in, is what other people think."
]

setupPage()

function setupPage() {
  const app = document.getElementById('app')
  const page = setupQuote()
  setInterval(() => {
    setupQuote()
  }, 7000)
  app.append(page)
}

function setupQuote() {
  appState.currIndex += 1
  if (appState.currIndex >= quotes.length) {
    appState.currIndex = 0
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
