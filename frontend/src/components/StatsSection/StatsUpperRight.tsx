import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import CorruptionBox from "../CorruptionBox";
import CorruptionControls from "../CorruptionControls";

import { useState } from "react";

import { CharacterEntry } from "../../Types";

import React, { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

interface CorruptionEntry {
  corruption: number;
}

function StatsLower() {
  const { character, setCharacter } = useContext(CharacterContext);
  const corruption = Object.values(character.corruption) as number[];
  const [update, setUpdater] = useState(0);
  return (
    <div className="grow flex-row pl-1">
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
            selectedCharacter={character}
            setUpdater={setUpdater}
            update={update}
            field={"token" + key}
          />
        ))}
        <CorruptionControls />
      </div>
    </div>
  );
}

export default StatsLower;
