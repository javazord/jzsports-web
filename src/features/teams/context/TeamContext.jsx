import { createContext, useContext } from "react";
import { useTeamRegister } from "../hooks/useTeamRegister";

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const teamRegister = useTeamRegister();
  return (
    <TeamContext.Provider value={teamRegister}>{children}</TeamContext.Provider>
  );
}

export function useTeam() {
  return useContext(TeamContext);
}
