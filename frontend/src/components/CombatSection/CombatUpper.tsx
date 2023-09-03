import DetailsBox from "../DetailsBox";
import ToughnessBox from "../ToughnessBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";
import RestBox from "../RestBox";

import {
  onAddToughness,
  onSubToughness,
} from "../../functions/CharacterFunctions";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function CombatUpper() {
  const { character, setCharacter } = useContext(CharacterContext);

  const current =
    character.toughness.max.value - character.toughness.damage.value;

  return (
    <div className="grow flex-row pr-1">
      <RestBox />
      <TitleBox title={"Toughness"} />
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <ToughnessBox
          onAddFunction={onAddToughness}
          onSubFunction={onSubToughness}
        />
        <DetailsBox
          type_name={"Pain"}
          type_value={character.toughness.pain.value}
        />
      </div>
    </div>
  );
}

export default CombatUpper;
