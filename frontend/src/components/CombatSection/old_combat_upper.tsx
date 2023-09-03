@@ -1,53 +0,0 @@
import DetailsBox from "../DetailsBox";
import ToughnessBox from "../ToughnessBox";
import CorruptionBox from "../CorruptionBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";
import RestBox from "../RestBox";

import {
  onAddToughness,
  onSubToughness,
  onAddPermCorruption,
  onSubPermCorruption,
} from "../../functions/CharacterFunctions";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function CombatUpper() {
  const { character, setCharacter } = useContext(CharacterContext);

  const current =
    character.toughness.max.value - character.toughness.damage.value;

  return (
    <div className="flex-col">
      <div className="flex">
        <RestBox />
        <TitleBox title={"Toughness"} />
      </div>
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionBox
          onAddFunction={onAddPermCorruption}
          onSubFunction={onSubPermCorruption}
        />
        <ToughnessBox
          onAddFunction={onAddToughness}
          onSubFunction={onSubToughness}
        />
      </div>
    </div>
  );
}

export default CombatUpper;