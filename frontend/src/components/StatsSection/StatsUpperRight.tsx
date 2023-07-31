import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import CorruptionBox from "../CorruptionBox";
import CorruptionControls from "../CorruptionControls";

import { useState } from "react";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

interface CorruptionEntry {
  corruption: number;
}

function StatsLower({ selectedCharacter }: StatsSectionProps) {
  const corruption = Object.values(selectedCharacter.corruption) as number[];
  const [update, setUpdater] = useState(0);
  return (
    <>
      <TitleBox title={"Corruption"} />
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        {Object.entries(corruption).map(([key, value]: [string, any]) => (
          <CorruptionBox
            key={key}
            corruptionState={value}
            selectedCharacter={selectedCharacter}
            setUpdater={setUpdater}
            update={update}
            field={"token" + key}
          />
        ))}
        <CorruptionControls />
      </div>
    </>
  );
}

export default StatsLower;
