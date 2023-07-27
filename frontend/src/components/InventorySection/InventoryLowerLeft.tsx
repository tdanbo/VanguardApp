import "bootstrap/dist/css/bootstrap.css";
import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

function StatsLower() {
  return (
    <div>
      <TitleBox title={"Active"} />
      <div
        className="d-flex flex-row p-1"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"A"} type_value={0} />
        <StatBox type_name={"A"} type_value={0} />
        <StatBox type_name={"A"} type_value={0} />
        <StatBox type_name={"A"} type_value={0} />
        <StatBox type_name={"A"} type_value={0} />
      </div>
    </div>
  );
}

export default StatsLower;
