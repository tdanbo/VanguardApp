import "bootstrap/dist/css/bootstrap.css";

import CombatEntry from "./CombatEntry";
import CombatEntryRoll from "./CombatEntryRoll";
import Header from "./Header";
import * as Constants from "../Constants";

type CombatLog = {
  character: string;
  result: number;
  active: string;
  type: string;
  details: string;
};

type CombatLogProps = {
  combatLogList: CombatLog[];
};

function CombatEntryList({ combatLogList }: CombatLogProps) {
  return (
    <div
      className="d-flex flex-column vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <Header title={"Combat"} />
      <div
        className="flex-grow-1 overflow-auto d-flex flex-column-reverse"
        style={{
          backgroundColor: Constants.DARK,
        }}
      >
        {[...combatLogList].reverse().map((item, index) => (
          <CombatEntry
            character={item.character}
            entryType={item.active}
            entryResult={item.result}
            index={index}
            key={index} // Don't forget to assign a key
          />
        ))}
      </div>
      <Header title={"Dice"} />
      <div
        className="d-flex flex-row p-2"
        style={{ backgroundColor: Constants.PRIMARY }}
      >
        <CombatEntryRoll />
      </div>
    </div>
  );
}

export default CombatEntryList;
