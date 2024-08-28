import { GlobalState } from '../global'
let currentElement: HTMLElement | null = null

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.captureMode !== undefined) {
    console.log(message.captureMode)
    GlobalState.isCaptureMode = message.captureMode
    console.log('Capture mode:', GlobalState.isCaptureMode)
    if (!GlobalState.isCaptureMode && currentElement) {
      resetHighlight(currentElement)
      currentElement = null
    }
  }
})

document.addEventListener('mousemove', (event: MouseEvent) => {
  if (!GlobalState.isCaptureMode) return

  const element = document.elementFromPoint(
    event.clientX,
    event.clientY
  ) as HTMLElement

  if (!element || element === currentElement) return

  if (currentElement) {
    resetHighlight(currentElement)
  }

  highlightElement(element)
  currentElement = element
})

document.addEventListener('click', (event: MouseEvent) => {
  if (!GlobalState.isCaptureMode || !currentElement) return

  event.preventDefault()
  event.stopPropagation()

  // HTML capture
  const capturedContent = currentElement.outerHTML
  chrome.runtime.sendMessage({ action: 'capture', content: capturedContent })

  resetHighlight(currentElement)
  currentElement = null
  GlobalState.isCaptureMode = false
  chrome.runtime.sendMessage({ captureMode: false })

  console.log('Captured content sent:', capturedContent)
})

function highlightElement(element: HTMLElement) {
  element.style.animation = 'none'
  element.style.transition = 'box-shadow 0.5s ease, transform 0.5s ease'
  element.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
  element.style.border = '2px solid rgba(255, 69, 0, 0.8)'
  element.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.8)'

  element.style.animation = 'pulse 1s infinite'

  const styleSheet = document.styleSheets[0]
  const keyframes = `
    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(255, 69, 0, 1);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
      }
    }
  `
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
}

function resetHighlight(element: HTMLElement) {
  element.style.backgroundColor = ''
  element.style.border = ''
  element.style.transition = ''
  element.style.animation = ''
  element.style.boxShadow = ''
}
