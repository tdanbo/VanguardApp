import * as Constants from "../../Constants";

import StatsUpperLeft from "./StatsUpperLeft";
import StatsUpperRight from "./StatsUpperRight";
import StatsMiddle from "./StatsMiddle";
import StatsLower from "./StatsLower";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function StatsSection({ selectedCharacter }: StatsSectionProps) {
  return (
    <div
      className="flex h-screen flex-col"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="flex">
        <StatsUpperLeft selectedCharacter={selectedCharacter} />
        <StatsUpperRight selectedCharacter={selectedCharacter} />
      </div>
      <StatsMiddle />
      <StatsLower selectedCharacter={selectedCharacter} />
    </div>
  );
}

export default StatsSection;
