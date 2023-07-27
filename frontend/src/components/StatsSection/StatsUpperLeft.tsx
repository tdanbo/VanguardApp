import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

function StatsLower() {
  return (
    <>
      <TitleBox title={"Toughness"} />
      <div
        className="d-flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"Toughness"} type_value={0} />
        <StatBox type_name={"Maximum"} type_value={0} />
        <StatBox type_name={"Pain"} type_value={0} />
      </div>
    </>
  );
}

export default StatsLower;
