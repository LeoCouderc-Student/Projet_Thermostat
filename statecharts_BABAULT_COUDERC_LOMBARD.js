import { createMachine } from "xstate";

const aceuillStates = {
  initial: 'manuel',
  states: {
    manuel: {
      on: {
        "Passer en mode 1": 'mode1',

      }
    },
    mode1: {
      on: {
        "Passer en manuel": 'manuel',
      }
    },
  }
};

const parametresStates = {
  initial: 'plage',
  states: {
    plage: {
      on: {
        "Passer en mode jour de repos": 'repos',
        "Refresh" : "plage"
      }
    },
    repos: {
      on: {
        "Passer en mode plage horaire": 'plage',
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