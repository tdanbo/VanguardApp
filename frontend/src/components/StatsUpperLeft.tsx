import "bootstrap/dist/css/bootstrap.css";
import StatBox from "./StatBox";
import Header from "./Header";
import * as Constants from "../Constants";

function StatsLower() {
  return (
    <>
      <Header title={"Toughness"} />
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
