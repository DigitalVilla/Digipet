import { TICK_RATE } from "./constants";
import gameState, { handleUserAction } from "./gameState";
import initButtons from "./buttons";

async function init() {
  console.log("starting game");
  initButtons(handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextTimeToTick <= now) {
      nextTimeToTick = now + TICK_RATE;
      gameState.tick();
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  nextAnimationFrame();
}

init();
