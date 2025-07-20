import React, { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { Ability } from "@casl/ability";

export const AbilityContext = createContext();
export const Can = createContextualCan(AbilityContext.Consumer);

export const AbilityProvider = ({ children }) => {
  const ability = new Ability([]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};
