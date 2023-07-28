import StatBox from "../StatBox";
import * as Constants from "../../Constants";
import CorruptionBox from "../CorruptionBox";
import DeleteCharacter from "../DeleteCharacter";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventoryUpper({ selectedCharacter }: StatsSectionProps) {
  return (
    <>
      <div
        className="d-flex"
        style={{ height: Constants.SECTION_TITLE_HEIGHT }}
      >
        <DeleteCharacter />
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
        <StatBox type_name={"Xp"} type_value={selectedCharacter.details.xp} />
        <StatBox
          type_name={"Unspent"}
          type_value={selectedCharacter.details.unspent}
        />
        <StatBox
          type_name={"Ft."}
          type_value={selectedCharacter.details.movement}
        />
      </div>
    </>
  );
}

export default InventoryUpper;
