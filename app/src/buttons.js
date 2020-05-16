import { ICONS } from "./constants";

const toggleHighlighted = (icon, show) =>
  document
    .querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", show);

const selectButton = (direction, current, items) => {
  const dir = direction === "left" ? 2 : direction === "right" ? 1 : 0;
  toggleHighlighted(current, false);
  current = (dir + current) % items;
  toggleHighlighted(current, true);
  return current;
};

export default function initButtons(handleUserAction) {
  let selectedIcon = 0;

  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      selectedIcon = selectButton("left", selectedIcon, ICONS.length);
    } else if (target.classList.contains("right-btn")) {
      selectedIcon = selectButton("right", selectedIcon, ICONS.length);
    } else {
      handleUserAction(ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
