var buttonList
var theaterButton
var span
var popover
var ready
var html
var playerState = true

var icon = `<svg width="100%" height="100%" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="udemy-theater-icon">
<g>
<path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h7V3H4zM16 3h-3v14h3a2 2 0 002-2V5a2 2 0 00-2-2z"></path>
</g>
</svg>`

function inject() {
  try {
    html = document.querySelector('html')
    html.setAttribute('data-theater-style', 'theater')

    buttonList = document.querySelector('div[data-purpose="video-controls"]')
    
    theaterButton = document.createElement('button')

    span = document.createElement('span')
    span.className = 'control-bar-button--icon--28inh udi'
    span.innerHTML = icon

    theaterButton.className = 'control-bar-button--button--20ibv btn udemy-theater-button'
    theaterButton.setAttribute('data-purpose','twitch-theater-mode-toggle-button')
    theaterButton.setAttribute('aria-describedby','popper12')
    theaterButton.setAttribute('tabindex','0')
    theaterButton.setAttribute('type','button')
    theaterButton.appendChild(span)

    popover = document.createElement('div')
    popover.className = 'sr-only'
    popover.setAttribute('id', 'popper12')
    popover.innerText = 'Udemy Theater Mode'
    
    buttonList.appendChild(theaterButton)
    buttonList.appendChild(popover)
  } catch {
    console.log('Udemy Theater Mode failed to load')
  }
}

function toggleButton() {
  if (playerState) {
    html.setAttribute('data-theater-style', 'default')
  } else {
    html.setAttribute('data-theater-style', 'theater')
  }
  playerState = !playerState
}

const tryInject = (count) => {
  if (count < 1) {
    return
  }

  inject()

  if (buttonList) {
    ready = true
  }

  if (ready) {
    console.log('Udemy Theater Mode was loaded successfully')
    theaterButton.addEventListener('click', toggleButton)
    return
  }

  setTimeout(() => {
    tryInject(--count)
  }, 500)
}

tryInject(20)