
import { createMachine } from "xstate";

const aceuillStates = {
  initial: 'manuel',
  states: {
    manuel: {
      on: {
        "Passer en mode 1": 'mode1',
        "Passer en mode 2": 'mode2',
        "Passer en mode 3": 'mode3',
        "Passer en mode 4": 'mode4',
      }
    },
    mode1: {
      on: {
        "Passer en manuel": 'manuel',
        "Passer en mode 2": 'mode2',
        "Passer en mode 3": 'mode3',
        "Passer en mode 4": 'mode4',
      }
    },
    mode2: {
      on: {
        "Passer en manuel": 'manuel',
        "Passer en mode 1": 'mode1',
        "Passer en mode 3": 'mode3',
        "Passer en mode 4": 'mode4',
      }
    },
    mode3: {
      on: {
        "Passer en manuel": 'manuel',
        "Passer en mode 1": 'mode1',
        "Passer en mode 2": 'mode2',
        "Passer en mode 4": 'mode4',
      }
    },
    mode4: {
      on: {
        "Passer en manuel": 'manuel',
        "Passer en mode 1": 'mode1',
        "Passer en mode 2": 'mode2',
        "Passer en mode 3": 'mode3',
      }
    },
  }
};

const parametresStates = {
  initial: 'plage',
  states: {
    plage: {
      on: {
        "Passer en mode jour ouvré": 'ouvre',
        "Passer en mode jour de repos": 'repos',
        "Refresh" : "plage"
      }
    },
    ouvre: {
      on: {
        "Passer en mode plage horaire": 'plage',
        "Passer en mode 2": 'repos',
        "Refresh" : "ouvre"
      }
    },
    repos: {
      on: {
        "Passer en mode plage horaire": 'plage',
        "Passer en mode jour ouvré": 'ouvre',
        "Refresh" : "repos"
      }
    },
  }
};

const stateMachine = createMachine({
  id: "telecommande_thermostat",
  initial: "accueil",
  states: {
    accueil: {
      on: {
        "Aller page parametre": "parametres",
      },
      ...aceuillStates
    },
    parametres: {
      on: {
        "Retour page accueil": "accueil",
      },
       ...parametresStates
    },

  },
});

stateMachine.run()