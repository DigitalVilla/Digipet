// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)

const animateApp = (a, b) => console.log(a, b);
new Promise((resolve, reject) => {
  setTimeout(() => resolve(true), 1000);
});

const digipetMachine = Machine({
  id: "digipet",
  initial: "init",
  context: {
    retries: 0,
  },
  states: {
    init: {
      on: {
        START: "hatching",
      },
    },
    hatching: {
      invoke: {
        src: animateApp,
        onDone: "idle",
      },
    },
    idle: {
      on: {
        FEED: "feedingPet",
        CLEAN: "cleaningPoop",
        CHANGE: "changeWeather",
      },
    },
    feedingPet: {
      invoke: {
        src: animateApp,
        onDone: "idle",
      },
    },
    cleaningPoop: {
      invoke: {
        src: animateApp,
        onDone: "idle",
      },
    },
    changeWeather: {
      invoke: {
        src: animateApp,
        onDone: "idle",
      },
    },
  },
});
