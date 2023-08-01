import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

function StatsLower() {
  return (
    <div className="grow flex-row pr-1">
      <TitleBox title={"ACTIVE"} />
      <div
        className="flex grow flex-row p-2"
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
