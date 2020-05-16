import { modFox, modScene, togglePoopBag, writeModal } from "./ui";
import {
  SCENES,
  DAY_LENGTH,
  RAIN_CHANCE,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextPoopTime,
  getNextHungerTime,
} from "./constants";

const gameState = {
  currentState: "INIT",
  endCelebratingTime: -1,
  celebrateTime: -1,
  hungryTime: -1,
  sleepTime: -1,
  poopTime: -1,
  wakeTime: -1,
  dieTime: -1,
  clock: 1,

  tick() {
    this.clock++;

    switch (this.clock) {
      case this.endCelebratingTime:
        return this.endCelebrating();
      case this.celebrateTime:
        return this.celebrate();
      case this.hungryTime:
        return this.getHungry();
      case this.sleepTime:
        return this.sleep();
      case this.poopTime:
        return this.poop();
      case this.wakeTime:
        return this.wake();
      case this.dieTime:
        return this.die();
    }
    console.log(this.clock);
  },
  startGame() {
    this.currentState = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal();
  },
  changeWeather() {
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },
  cleanUpPoop() {
    if (this.currentState === "POOPING") {
      this.dieTime = -1;
      togglePoopBag(true);
      this.celebrate();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },
  feed() {
    // can only feed when hungry
    if (this.currentState === "HUNGRY") {
      this.currentState = "FEEDING";
      this.dieTime = -1;
      this.poopTime = getNextPoopTime(this.clock);
      modFox("eating");
      this.celebrateTime = this.clock + 2;
    }
  },
  poop() {
    this.currentState = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  wake() {
    this.currentState = "IDLING";
    this.wakeTime = -1;
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
    this.determineFoxState();
  },
  getHungry() {
    this.currentState = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  sleep() {
    this.currentState = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  die() {
    this.currentState = "DEAD";
    this.clearTimes();
    modScene("dead");
    modFox("dead");
    writeModal(1);
  },
  celebrate() {
    this.currentState = "CELEBRATING";
    modFox("celebrate");
    this.celebrateTime = -1;
    this.endCelebratingTime = this.clock + 2;
  },
  endCelebrating() {
    this.currentState = "IDLING";
    this.endCelebratingTime = -1;
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.currentState === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  clearTimes() {
    this.endCelebratingTime = -1;
    this.celebrateTime = -1;
    this.hungryTime = -1;
    this.sleepTime = -1;
    this.poopTime = -1;
    this.wakeTime = -1;
    this.dieTime = -1;
  },
  handleUserAction(icon) {
    console.log(this.currentState, icon);

    if (this.currentState === "INIT" || this.currentState === "DEAD") {
      return this.startGame();
    }

    if (
      this.currentState === "IDLING" ||
      this.currentState === "HUNGRY" ||
      this.currentState === "POOPING"
    ) {
      // execute the currently selected action
      switch (icon) {
        case "weather":
          this.changeWeather();
          break;
        case "poop":
          this.cleanUpPoop();
          break;
        case "fish":
          this.feed();
          break;
      }
    }
  },
};

export default gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
