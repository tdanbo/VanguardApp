import "bootstrap/dist/css/bootstrap.css";

import Header from "./Header";
import * as Constants from "../Constants";

import StatsUpperLeft from "./StatsUpperLeft";
import StatsUpperRight from "./StatsUpperRight";
import StatsMiddle from "./StatsMiddle";
import StatsLower from "./StatsLower";

function StatsSection() {
  return (
    <div
      className="d-flex flex-column vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="row">
        <div className="col">
          <StatsUpperLeft />
        </div>
        <div className="col">
          <StatsUpperRight />
        </div>
      </div>
      <StatsMiddle />
      <StatsLower />
    </div>
  );
}

export default StatsSection;
