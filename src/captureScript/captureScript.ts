import { GlobalState } from '../global'

const navbarIcon = document.getElementById('navbar-icon')

if (navbarIcon) {
  // Delete any listener previous
  navbarIcon.removeEventListener('click', handleIconClick)

  navbarIcon.addEventListener('click', handleIconClick)
} else {
  console.error('El icono del navbar no se encontró.')
}

function handleIconClick() {
  GlobalState.isCaptureMode = !GlobalState.isCaptureMode
  const message = GlobalState.isCaptureMode
    ? 'Exit Capture Mode'
    : 'Toggle Capture Mode'

  chrome.runtime.sendMessage({ captureMode: GlobalState.isCaptureMode })

  navbarIcon.setAttribute('title', message)

  if (GlobalState.isCaptureMode) {
    navbarIcon.classList.add('active')
  } else {
    navbarIcon.classList.remove('active')
  }
}

// Wait for DOM to be loaded and get the content captured
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('capturedContent', (data) => {
    const contentElement = document.getElementById('content') as HTMLDivElement
    const codeElement = document.getElementById('code') as HTMLPreElement

    if (contentElement && codeElement) {
      // HTML showed
      contentElement.innerHTML = data.capturedContent || 'No content captured'

      // HTML code showed as a text
      codeElement.innerText = data.capturedContent || 'No content captured'

      const images = contentElement.querySelectorAll('img')
      images.forEach((img) => {
        if (!img.complete || img.naturalWidth === 0) {
          img.src = img.getAttribute('data-original-src') || img.src
        }
      })

      console.log('Captured content:', data.capturedContent)
    }
  })
})
