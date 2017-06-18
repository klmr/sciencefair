const html = require('choo/html')
const css = require('csjs-inject')
const C = require('../lib/constants')

const overlay = require('./overlay')
const pkgjson = require('../../package.json')

const style = css`

.content {
  widthL 100%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 1.6em;
  font-family: CooperHewitt-Book;
  flex-direction: column;
  align-items: center;
}

.content p {
  display: block;
  margin: 0;
}

.content a {
  text-decoration: none;
  color: ${C.MIDBLUE}}
}

.content a:hover {
  text-decoration: none;
  color: ${C.DARKBLUE}
}

.community {
  font-size: 0.8em;
}

.header {
  font-family: Aleo-Light;
  width: 100%;
  justify-content: space-between;
}

.version {
  font-size: 0.9em;
  align-self: center;
}

`

module.exports = (state, emit) => {
  if (!state.aboutshown) return null

  const title = html`

  <div class="${style.header}">
    ${require('./logo')()}
    <span class="${style.version}">v${pkgjson.version}</span>
  </div>

  `

  const about = html`

  <div class="${style.content}">
    <a href="https://codeforscience.org/sciencefair">codeforscience.org/sciencefair</a>

    <p>
      <a href="https://github.com/codeforscience/sciencefair/blob/master/LICENSE">MIT licensed</a> |
      <a href="https://github.com/codeforscience/sciencefair">GitHub</a>
    </p>

    <p class="${style.community}">Developed by the <a href="https://codeforscience.org/">Code For Science and Society</a> community</p>
  </div>

  `

  about.onclick = e => {
    // don't trigger toggle when user clicks on the popup
    e.preventDefault()
    e.stopPropagation()
  }

  const onclick = e => {
    // trigger toggle when user clicks on the overlay
    e.preventDefault()
    emit('about:hide')
  }

  return overlay(state, emit, {
    title: title,
    content: about,
    onclick: onclick
  })
}
