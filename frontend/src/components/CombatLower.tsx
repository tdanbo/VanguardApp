import "bootstrap/dist/css/bootstrap.css";
import StatBox from "./StatBox";
import Header from "./Header";
import * as Constants from "../Constants";

const EntryRollButton = () => {
  return (
    <div
      className="d-flex rounded ml-1 mb-1 mt-1"
      style={{
        backgroundColor: Constants.BRIGHT_RED,
        minWidth: "19px",
        border: `1px solid ${Constants.BORDER_LIGHT}`,
      }}
    ></div>
  );
};

function CombatLower() {
  return (
    <>
      <Header title={"Dice"} />
      <div
        className="d-flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"d4"} type_value={0} />
        <StatBox type_name={"d6"} type_value={0} />
        <StatBox type_name={"d8"} type_value={0} />
        <StatBox type_name={"d10"} type_value={0} />
        <StatBox type_name={"d12"} type_value={0} />
        <StatBox type_name={"d20"} type_value={0} />
      </div>
    </>
  );
}

export default CombatLower;
