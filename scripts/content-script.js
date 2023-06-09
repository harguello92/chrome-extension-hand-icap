const cautionHandlerBuilder = ({ buttonElement }) => {
  const hideButton = (visible) => (buttonElement.hidden = visible);
  const setScale = (scale) => (buttonElement.style.scale = scale);
  const setOpacity = (opacity) => (buttonElement.style.opacity = opacity);

  const initial = () => {
    hideButton(false);
    setScale(1);
    setOpacity(1);
  };

  const minimum = () => {
    setScale(0.7);
  };

  const medium = () => {
    setScale(0.7);
    setOpacity(0.5);
  };

  const maximum = () => {
    hideButton(true);
  };

  return {
    initial,
    minimum,
    medium,
    maximum,
  };
};

const actionsScript = ({ buttonElement, actionId }) => {
  const actionsMap = {
    minimum: "1",
    medium: "2",
    maximum: "3",
  };
  const cautionHandler = cautionHandlerBuilder({ buttonElement });
  cautionHandler.initial();

  switch (actionId) {
    case actionsMap.minimum:
      cautionHandler.minimum();
      break;
    case actionsMap.medium:
      cautionHandler.medium();
      break;
    case actionsMap.maximum:
      cautionHandler.maximum();
      break;
  }
};

const getButtonElement = () =>
  document.body
    .querySelector(
      'path[d="M21,7c0-1.38-1.12-2.5-2.5-2.5c-0.17,0-0.34,0.02-0.5,0.05V4c0-1.38-1.12-2.5-2.5-2.5c-0.23,0-0.46,0.03-0.67,0.09 C14.46,0.66,13.56,0,12.5,0c-1.23,0-2.25,0.89-2.46,2.06C9.87,2.02,9.69,2,9.5,2C8.12,2,7,3.12,7,4.5v5.89 c-0.34-0.31-0.76-0.54-1.22-0.66L5.01,9.52c-0.83-0.23-1.7,0.09-2.19,0.83c-0.38,0.57-0.4,1.31-0.15,1.95l2.56,6.43 C6.49,21.91,9.57,24,13,24h0c4.42,0,8-3.58,8-8V7z M19,16c0,3.31-2.69,6-6,6h0c-2.61,0-4.95-1.59-5.91-4.01l-2.6-6.54l0.53,0.14 c0.46,0.12,0.83,0.46,1,0.9L7,15h2V4.5C9,4.22,9.22,4,9.5,4S10,4.22,10,4.5V12h2V2.5C12,2.22,12.22,2,12.5,2S13,2.22,13,2.5V12h2V4 c0-0.28,0.22-0.5,0.5-0.5S16,3.72,16,4v8h2V7c0-0.28,0.22-0.5,0.5-0.5S19,6.72,19,7L19,16z"]'
    )
    ?.closest("button");

const init = () => {
  var Observer = new MutationObserver(() => {
    const buttonElement = getButtonElement();
    if (!buttonElement) return;

    (async () => {
      const { actionId } = await chrome.runtime.sendMessage("get-action-id");
      actionsScript({
        buttonElement,
        actionId,
      });
    })();

    Observer.disconnect();
  });

  Observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

chrome.runtime.onMessage.addListener(({ actionId }) => {
  const buttonElement = getButtonElement();
  actionsScript({ buttonElement, actionId });
  return true;
});

window.addEventListener("load", init);
