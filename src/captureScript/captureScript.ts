interface CaptureModeMessage {
  captureMode: boolean
}

import { GlobalState } from '../global'

const navbarIcon = document.getElementById('navbar-icon')

if (navbarIcon) {
  navbarIcon.addEventListener('click', () => {
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
  })
} else {
  console.error('El icono del navbar no se encontró.')
}

// Wait DOM is loaded and get the content captured
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('capturedContent', (data) => {
    const contentElement = document.getElementById('content') as HTMLPreElement
    if (contentElement) {
      contentElement.innerText = data.capturedContent || 'No content captured'
      console.log('Captured content:', data.capturedContent)
    }
  })
})
