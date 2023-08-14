import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";

import { useState, useEffect } from "react";

function CombatMiddle() {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getCombatLog();
      setCombatLog(data);
    }

    fetchData();
  }, []);
  return (
    <>
      <TitleBox title={"Combat"} />
      <div
        className="flex flex-grow flex-col-reverse overflow-auto"
        style={{
          backgroundColor: Constants.DARK,
        }}
      >
        {[...combatLog].reverse().map((item, index) => (
          <CombatEntryItem key={index} combatEntry={item} index={index} />
        ))}
      </div>
    </>
  );
}

export default CombatMiddle;
