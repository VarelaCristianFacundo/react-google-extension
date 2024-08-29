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
    const contentElement = document.getElementById('content') as HTMLDivElement
    const codeElement = document.getElementById('code') as HTMLPreElement

    if (contentElement && codeElement) {
      // HTML captured
      contentElement.innerHTML = data.capturedContent || 'No content captured'

      // HTML captured as text
      codeElement.innerText = data.capturedContent || 'No content captured'

      // imgs
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
