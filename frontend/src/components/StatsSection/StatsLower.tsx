import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function StatsLower() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <>
      <TitleBox title={"Stats"} />
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"Cunning"} type_value={character.stats.cunning} />
        <StatBox type_name={"Discreet"} type_value={character.stats.discreet} />
        <StatBox
          type_name={"Persuasive"}
          type_value={character.stats.persuasive}
        />
        <StatBox type_name={"Quick"} type_value={character.stats.quick} />
        <StatBox type_name={"Resolute"} type_value={character.stats.resolute} />
        <StatBox type_name={"Strong"} type_value={character.stats.strong} />
        <StatBox type_name={"Vigilant"} type_value={character.stats.vigilant} />
        <StatBox type_name={"Accurate"} type_value={character.stats.accurate} />
      </div>
    </>
  );
}

export default StatsLower;
