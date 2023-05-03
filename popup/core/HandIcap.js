export default class HandIcap {
  constructor({ controller, domElements }) {
    this.controller = controller;
    this.sliderSelector = "";
    this.domElements = domElements;
  }

  get meetUrl() {
    return "https://meet.google.com/";
  }

  async isMeetUrl() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab.url.startsWith(this.meetUrl);
  }

  async init() {
    const isMeetUrl = await this.isMeetUrl();
    if (!isMeetUrl) {
      this.domElements.controllerSide.classList.add("no-display");
      this.domElements.notAvailableSide.classList.remove("no-display");
      return;
    }

    this.controller.init();
  }
}
