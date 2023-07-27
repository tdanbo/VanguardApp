import StatBox from "../StatBox";
import * as Constants from "../../Constants";
import CorruptionBox from "../CorruptionBox";
import DropdownCharacter from "../DropdownCharacter";
import DeleteCharacter from "../DeleteCharacter";
function StatsLower() {
  return (
    <>
      <div
        className="d-flex"
        style={{ height: Constants.SECTION_TITLE_HEIGHT }}
      >
        <DeleteCharacter />
        <DropdownCharacter />
        <DeleteCharacter />
        <DeleteCharacter />
      </div>
      <div
        className="d-flex flex-col p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionBox />
        <StatBox type_name={"Xp"} type_value={50} />
        <StatBox type_name={"Unspent"} type_value={14} />
        <StatBox type_name={"Ft."} type_value={30} />
      </div>
    </>
  );
}

export default StatsLower;
