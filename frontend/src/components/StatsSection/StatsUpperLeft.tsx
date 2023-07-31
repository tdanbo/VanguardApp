import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function StatsUpperLeft({ selectedCharacter }: StatsSectionProps) {
  let Maximum = 10;
  if (selectedCharacter.stats.strong > 10) {
    Maximum = selectedCharacter.stats.strong;
  }

  const Current = Maximum - selectedCharacter.toughness.damage;
  const Pain = Math.ceil(selectedCharacter.stats.strong / 2);

  return (
    <>
      <TitleBox title={"Toughness"} />
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"Toughness"} type_value={Current} />
        <StatBox type_name={"Maximum"} type_value={Maximum} />
        <StatBox type_name={"Pain"} type_value={Pain} />
      </div>
    </>
  );
}

export default StatsUpperLeft;
