const getActionIdFromStorage = async () => {
  return actionId;
};

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  if (message !== "get-action-id") return;
  const { actionId } = await chrome.storage.session.get(message);
  sendResponse(actionId);
});
