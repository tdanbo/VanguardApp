import "bootstrap/dist/css/bootstrap.css";
import StatBox from "./StatBox";
import Header from "./Header";
import * as Constants from "../Constants";
import CorruptionBox from "./CorruptionBox";

function StatsLower() {
  return (
    <>
      <Header title={"Corruption"} />
      <div
        className="d-flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionBox />
        <CorruptionBox />
        <CorruptionBox />
        <CorruptionBox />
        <CorruptionBox />
        <CorruptionBox />
      </div>
    </>
  );
}

export default StatsLower;
