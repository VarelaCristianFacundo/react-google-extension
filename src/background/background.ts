console.log('Background script running')

let isCaptureModeActive = false
let captureTabId: number | null = null

chrome.action.onClicked.addListener(async (tab) => {
  // change state of capture tab
  isCaptureModeActive = !isCaptureModeActive

  // change icon extension below the state of capture
  const iconPath = isCaptureModeActive ? 'active-icon.png' : 'inactive-icon.png'
  chrome.action.setIcon({ path: iconPath })

  try {
    // script active tab
    await chrome.scripting.executeScript({
      target: { tabId: tab.id as number },
      files: ['contentScript.js'],
    })

    // state capture send to script content
    chrome.tabs.sendMessage(tab.id as number, {
      captureMode: isCaptureModeActive,
    })
  } catch (error) {
    console.error('Failed to execute content script:', error)
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'capture' && message.content !== undefined) {
    // capture mode inactive before to process
    isCaptureModeActive = false
    chrome.action.setIcon({ path: 'inactive-icon.png' })

    chrome.storage.local.set({ capturedContent: message.content }, () => {
      console.log('Captured content stored:', message.content)

      //  conditional for fix multiple tabs
      if (captureTabId !== null) {
        chrome.tabs.get(captureTabId, (tab) => {
          if (chrome.runtime.lastError || !tab) {
            // tab isn't exist, id= null and open new tab
            captureTabId = null
            chrome.tabs.create(
              { url: chrome.runtime.getURL('capture.html') },
              (newTab) => {
                captureTabId = newTab.id
              }
            )
          } else {
            // focus tab
            chrome.tabs.update(captureTabId, { active: true })
          }
        })
      } else {
        // else, open new tab
        chrome.tabs.create(
          { url: chrome.runtime.getURL('capture.html') },
          (tab) => {
            captureTabId = tab.id
          }
        )
      }

      // inform to content script capture complete and inactive capture mode
      if (sender.tab?.id !== undefined) {
        chrome.tabs.sendMessage(sender.tab.id, {
          captureMode: false,
        })
      }
    })
  }
})

// Listener to reset captureTabId when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === captureTabId) {
    captureTabId = null
  }
})
