const handleResponse = async (sendResponse) => {
  const { actionId } = await chrome.storage.local.get("actionId");
  sendResponse({ actionId });
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message !== "get-action-id") return;
  handleResponse(sendResponse);
  return true;
});
