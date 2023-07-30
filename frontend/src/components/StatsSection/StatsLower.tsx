import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function StatsLower({ selectedCharacter }: StatsSectionProps) {
  return (
    <>
      <TitleBox title={"Stats"} />
      <div
        className="d-flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox
          type_name={"Cunning"}
          type_value={selectedCharacter.stats.cunning}
        />
        <StatBox
          type_name={"Discreet"}
          type_value={selectedCharacter.stats.discreet}
        />
        <StatBox
          type_name={"Persuasive"}
          type_value={selectedCharacter.stats.persuasive}
        />
        <StatBox
          type_name={"Quick"}
          type_value={selectedCharacter.stats.quick}
        />
        <StatBox
          type_name={"Resolute"}
          type_value={selectedCharacter.stats.resolute}
        />
        <StatBox
          type_name={"Strong"}
          type_value={selectedCharacter.stats.strong}
        />
        <StatBox
          type_name={"Vigilant"}
          type_value={selectedCharacter.stats.vigilant}
        />
        <StatBox
          type_name={"Accurate"}
          type_value={selectedCharacter.stats.accurate}
        />
      </div>
    </>
  );
}

export default StatsLower;
