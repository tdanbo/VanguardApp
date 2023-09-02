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

function StatsUpper() {
  const { character, setCharacter } = useContext(CharacterContext);
  const [update, setUpdater] = useState(0);
  return (
    <div className="grow flex-row pl-1">
      <TitleBox title={"Corruption"} />
      <div
        className="flex p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        {Object.entries(character.corruption.corruption1).map(
          ([key, value]: [string, any]) => (
            <CorruptionBox
              key={key}
              corruptionState={value}
              selectedCharacter={character}
              setUpdater={setUpdater}
              update={update}
              field={"token" + key}
            />
          ),
        )}
        <div className="flex w-1/3 flex-col"></div>
        {Object.entries(character.corruption.corruption2).map(
          ([key, value]: [string, any]) => (
            <CorruptionBox
              key={key}
              corruptionState={value}
              selectedCharacter={character}
              setUpdater={setUpdater}
              update={update}
              field={"token" + key}
            />
          ),
        )}
        <div className="flex w-1/3 flex-col"></div>
        {Object.entries(character.corruption.corruption3).map(
          ([key, value]: [string, any]) => (
            <CorruptionBox
              key={key}
              corruptionState={value}
              selectedCharacter={character}
              setUpdater={setUpdater}
              update={update}
              field={"token" + key}
            />
          ),
        )}
        <CorruptionControls />
      </div>
    </div>
  );
}

export default StatsUpper;
