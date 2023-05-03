export default class CaptionRangeController {
  constructor({ storage, domElements }) {
    this.name = "CaptionRangeController";
    this.storage = storage;
    this.domElements = domElements;
  }

  async sendAction(action) {
    const [tab] = await chrome.tabs.query({
      lastFocusedWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, {
      caseId: action,
    });
  }

  doBinds() {
    this.domElements.slider.addEventListener("input", async ({ target }) => {
      await chrome.storage.session.set({ caseId: target.value });
      await this.sendAction(target.value);
    });

    document.body.addEventListener("load", async () => {
      await this.sendAction(caseId);
      const caseId = await chrome.storage.session.get("caseId");
      this.domElements.slider.value = caseId;
    });
  }

  init() {
    this.doBinds();
  }
}
