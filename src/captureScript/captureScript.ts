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
    const contentElement = document.getElementById('content') as HTMLDivElement;
    const codeElement = document.getElementById('code') as HTMLPreElement;

    if (contentElement && codeElement) {
      // Mostrar el HTML capturado renderizado
      contentElement.innerHTML = data.capturedContent || 'No content captured';

      // Mostrar el código HTML capturado como texto
      codeElement.innerText = data.capturedContent || 'No content captured';

      // Asegúrate de que las imágenes se muestren correctamente
      const images = contentElement.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.complete || img.naturalWidth === 0) {
          img.src = img.getAttribute('data-original-src') || img.src;
        }
      });

      console.log('Captured content:', data.capturedContent);
    }
  });
});
