import "bootstrap/dist/css/bootstrap.css";
import StatBox from "./StatBox";
import Header from "./Header";
import * as Constants from "../Constants";

function StatsLower() {
  return (
    <>
      <Header title={"Stats"} />
      <div
        className="d-flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"Cunning"} type_value={0} />
        <StatBox type_name={"Discreet"} type_value={0} />
        <StatBox type_name={"Persuasive"} type_value={0} />
        <StatBox type_name={"Quick"} type_value={0} />
        <StatBox type_name={"Resolute"} type_value={0} />
        <StatBox type_name={"Strong"} type_value={0} />
        <StatBox type_name={"Vigilant"} type_value={0} />
        <StatBox type_name={"Accurate"} type_value={0} />
      </div>
    </>
  );
}

export default StatsLower;
