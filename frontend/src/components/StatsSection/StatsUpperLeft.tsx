import DetailsBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function StatsUpperLeft() {
  const { character, setCharacter } = useContext(CharacterContext);
  let Maximum = 10;
  if (character.stats.strong.value > 10) {
    Maximum = character.stats.strong.value;
  }

  const Current = Maximum - character.toughness.damage.value;
  const Pain = Math.ceil(character.stats.strong.value / 2);

  return (
    <div className="grow flex-row pr-1">
      <TitleBox title={"Toughness"} />
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <DetailsBox type_name={"Toughness"} type_value={Current} />
        <DetailsBox type_name={"Maximum"} type_value={Maximum} />
        <DetailsBox type_name={"Pain"} type_value={Pain} />
      </div>
    </div>
  );
}

export default StatsUpperLeft;
