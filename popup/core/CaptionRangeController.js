export default class CaptionRangeController {
  constructor({ storage, domElements }) {
    this.storage = storage;
    this.domElements = domElements;
  }

  async sendAction(actionId) {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, {
      actionId,
    });
  }

  doBinds() {
    this.domElements.slider.addEventListener("input", ({ target }) => {
      chrome.storage.local.set({ actionId: target.value });
      this.sendAction(target.value);
    });
  }

  async setConfig() {
    const { actionId } = await chrome.storage.local.get("actionId");
    this.domElements.slider.value = actionId;
    this.sendAction(actionId);
  }

  init() {
    this.setConfig();
    this.doBinds();
  }
}
