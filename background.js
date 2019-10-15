const tabs = {};

chrome.webRequest.onSendHeaders.addListener(
  details => {
    const { tabId, url } = details;
    if (!tabs[tabId]) {
      tabs[tabId] = new Set();
    }
    try {
      tabs[tabId].add(new URL(url).host);
    } catch (e) {}
    chrome.browserAction.setBadgeText({ text: tabs[tabId].size.toString(), tabId });
  },
  { urls: ['<all_urls>'] }
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true }, t => {
    if (t.length === 0) {
      return;
    }
    sendResponse(Array.from(tabs[t[0].id] || []));
  });
  return true;
});
