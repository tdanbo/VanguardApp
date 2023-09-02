import * as Constants from "../../Constants";

import StatsUpperLeft from "../CombatSection/CombatUpper";
import StatsUpper from "./StatsUpper";
import StatsMiddle from "./StatsMiddle";
import StatsLower from "./StatsLower";

function StatsSection() {
  return (
    <div
      className="flex h-screen flex-col"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="flex">
        <StatsUpper />
      </div>
      <StatsMiddle />
      <StatsLower />
    </div>
  );
}

export default StatsSection;
