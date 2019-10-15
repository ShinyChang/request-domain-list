chrome.runtime.sendMessage({ action: "query" }, (response) => {
  document.querySelector('#root').innerHTML = response.map(host => `<li>${host}</li>`).join('');
});
