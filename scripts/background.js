const getActionIdFromStorage = async () => {
  const { actionId } = await chrome.storage.session.get(message);
  return actionId;
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message != "actionId") return;
  const actionId = getActionIdFromStorage();
  sendResponse(actionId);
});
