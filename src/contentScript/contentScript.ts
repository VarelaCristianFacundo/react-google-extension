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
  element.style.transition =
    'background-color 0.3s ease, border-color 0.3s ease'
  element.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'
  element.style.border = '2px solid green'
}

function resetHighlight(element: HTMLElement) {
  element.style.backgroundColor = ''
  element.style.border = ''
  element.style.transition = ''
}
