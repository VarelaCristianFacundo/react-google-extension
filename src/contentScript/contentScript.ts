chrome.runtime.sendMessage('From the content Script', (response) => {
  console.log(response)
  document.body.innerHTML += response.message
})
