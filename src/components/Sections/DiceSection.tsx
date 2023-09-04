import DiceBox from "../DiceBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import CorruptionRoll from "../CorruptionRoll";

function DiceSection() {
  return (
    <>
      <TitleBox title={"Dice"} />
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionRoll />
        <DiceBox type_name={"d4"} type_value={2} />
        <DiceBox type_name={"d6"} type_value={2} />
        <DiceBox type_name={"d8"} type_value={1} />
        <DiceBox type_name={"d10"} type_value={2} />
        <DiceBox type_name={"d12"} type_value={1} />
        <DiceBox type_name={"d20"} type_value={3} />
        <DiceBox type_name={"d100"} type_value={3} />
      </div>
    </>
  );
}

export default DiceSection;
