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
      className="vh-100 flex flex-col p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="gx-2 flex  flex-wrap">
        <div className="relative max-w-full flex-1 flex-grow px-4">
          <StatsUpperLeft selectedCharacter={selectedCharacter} />
        </div>
        <div className="relative max-w-full flex-1 flex-grow px-4">
          <StatsUpperRight selectedCharacter={selectedCharacter} />
        </div>
      </div>
      <StatsMiddle />
      <StatsLower selectedCharacter={selectedCharacter} />
    </div>
  );
}

export default StatsSection;
