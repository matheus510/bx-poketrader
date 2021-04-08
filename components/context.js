import { createContext } from 'react'
export const TraderDefault = {
    sides: {
        a: [],
        b: [],
    },
    even: true,
    advantage: "",
  };

export const TraderContext = createContext({
    ...TraderDefault,
    updateList: () => {},
    verifyTrade: () => {},
  });