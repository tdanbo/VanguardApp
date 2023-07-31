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
      className="d-flex flex-column vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <div className="row gx-2">
        <div className="col">
          <StatsUpperLeft selectedCharacter={selectedCharacter} />
        </div>
        <div className="col">
          <StatsUpperRight selectedCharacter={selectedCharacter} />
        </div>
      </div>
      <StatsMiddle />
      <StatsLower selectedCharacter={selectedCharacter} />
    </div>
  );
}

export default StatsSection;
