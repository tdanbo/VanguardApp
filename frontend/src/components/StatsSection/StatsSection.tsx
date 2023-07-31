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
      className="flex flex-col vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="flex flex-wrap  gx-2">
        <div className="relative flex-grow max-w-full flex-1 px-4">
          <StatsUpperLeft selectedCharacter={selectedCharacter} />
        </div>
        <div className="relative flex-grow max-w-full flex-1 px-4">
          <StatsUpperRight selectedCharacter={selectedCharacter} />
        </div>
      </div>
      <StatsMiddle />
      <StatsLower selectedCharacter={selectedCharacter} />
    </div>
  );
}

export default StatsSection;
