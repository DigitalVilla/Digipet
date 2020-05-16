const modalMgg = [
  "",
  "Your digipet died :( <br/> Press the middle button and try again",
];

export const modFox = function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};
export const modScene = function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};
export const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
export const writeModal = function writeModal(text = 0) {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${modalMgg[text]}</div>`;
};
