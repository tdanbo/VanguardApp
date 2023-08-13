import * as Constants from "../../Constants";

import StatsUpperLeft from "./StatsUpperLeft";
import StatsUpperRight from "./StatsUpperRight";
import StatsMiddle from "./StatsMiddle";
import StatsLower from "./StatsLower";

function StatsSection() {
  return (
    <div
      className="flex h-screen flex-col"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="flex">
        <StatsUpperLeft />
        <StatsUpperRight />
      </div>
      <StatsMiddle />
      <StatsLower />
    </div>
  );
}

export default StatsSection;
