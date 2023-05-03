import HandIcap from "./core/HandIcap.js";
import Controller from "./core/CaptionRangeController.js";

const domElements = {
  slider: document.querySelector("#app-caution-slider"),
  controllerSide: document.querySelector("#controller"),
  notAvailableSide: document.querySelector("#notAvailable"),
};

const controller = new Controller({ domElements });
const app = new HandIcap({ controller, domElements });
app.init();
