console.log('Background script running')

let isCaptureModeActive = false

chrome.action.onClicked.addListener((tab) => {
  isCaptureModeActive = !isCaptureModeActive

  const iconPath = isCaptureModeActive ? 'active-icon.png' : 'inactive-icon.png'

  chrome.action.setIcon({ path: iconPath })

  chrome.scripting.executeScript({
    target: { tabId: tab.id as number },
    files: ['contentScript.js'],
  })

  chrome.tabs.sendMessage(tab.id as number, {
    captureMode: isCaptureModeActive,
  })
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'capture' && message.content !== undefined) {
    chrome.storage.local.set({ capturedContent: message.content }, () => {
      console.log('Captured content stored:', message.content)
      chrome.tabs.create({ url: chrome.runtime.getURL('capture.html') }, () => {
        isCaptureModeActive = false
        chrome.action.setIcon({ path: 'inactive-icon.png' })
        chrome.tabs.sendMessage(sender.tab?.id as number, {
          captureMode: false,
        })
      })
    })
  }
})
