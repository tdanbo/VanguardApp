// import { createContext, useContext, useState } from "react";
// import axios from "axios";
// import { CombatEntry } from "../Types";

// const defaultCombatEntry: CombatEntry = {
//   character: "",
//   result: 0,
//   active: "",
//   type: "",
//   details: "",
// };

// interface CombatContextType {
//   combatLog: CombatEntry;
//   setCombatEntry: React.Dispatch<React.SetStateAction<CombatEntry>>;
// }

// const defaultContextValue: CombatContextType = {
//   combatEntry: defaultCombatEntry,
//   setCombatEntry: () => {}, // dummy function for default context
// };

// interface CombatProviderProps {
//   children: React.ReactNode;
// }

// export const CombatContext =
//   createContext<CombatContextType>(defaultContextValue);

// const CombatProvider: React.FC<CombatProviderProps> = ({ children }) => {
//   const [combatEntry, setCombatEntry] =
//     useState<CombatEntry>(defaultCombatEntry);

//   return (
//     <CombatContext.Provider
//       value={{
//         combatEntry,
//         setCombatEntry,
//       }}
//     >
//       {children}
//     </CombatContext.Provider>
//   );
// };

// export default CombatProvider;
