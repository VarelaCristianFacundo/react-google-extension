import './contentScript.css'
import { GlobalState } from '../global'

let currentElement: HTMLElement | null = null
let isCapturing: boolean = false // flag to prevent multiple captures

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.captureMode !== undefined) {
    GlobalState.isCaptureMode = message.captureMode

    if (!GlobalState.isCaptureMode && currentElement) {
      resetHighlight(currentElement)
      currentElement = null
    }

    isCapturing = false // Flag reset when capture mode is inactive

    // clean state when inactive capture mode
    if (!GlobalState.isCaptureMode) {
      resetCaptureState()
    }
  }
})

// Clean previous listeners
document.removeEventListener('mousemove', handleMouseMove)
document.removeEventListener('click', handleClick)

// register new listeners
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('click', handleClick)

function handleMouseMove(event: MouseEvent) {
  if (!GlobalState.isCaptureMode || isCapturing) return

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
}

function handleClick(event: MouseEvent) {
  if (!GlobalState.isCaptureMode || !currentElement || isCapturing) return

  event.preventDefault()
  event.stopPropagation()

  // flag activate to prevent multiples captures
  isCapturing = true

  // HTML capture
  const capturedContent = currentElement.outerHTML
  chrome.runtime.sendMessage({ action: 'capture', content: capturedContent })

  // reset all states after capture has completed
  resetCaptureState()
}

function resetCaptureState() {
  if (currentElement) {
    resetHighlight(currentElement)
    currentElement = null
  }
  GlobalState.isCaptureMode = false
  isCapturing = false

  // Delete listeners
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('click', handleClick)

  chrome.runtime.sendMessage({ captureMode: false })

  console.log('Capture completed or canceled, state reset')
}

function highlightElement(element: HTMLElement) {
  element.classList.add('highlight')
}

function resetHighlight(element: HTMLElement) {
  element.classList.remove('highlight')
}
