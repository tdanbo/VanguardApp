import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";

import { useState, useEffect } from "react";

function CombatMiddle() {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await getCombatLog();
      setCombatLog(data);
    }, 1000); // Polls every 5 seconds

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
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
