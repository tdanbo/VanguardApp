import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import { CharacterEntry } from "../../Types";
import StatSettings from "../Modals/StatSettings";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function StatsLower() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <>
      <div className="flex">
        <StatSettings />
        <TitleBox title={"Stats"} />
      </div>
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox type_name={"cunning"} type_value={character.stats.cunning} />
        <StatBox type_name={"discreet"} type_value={character.stats.discreet} />
        <StatBox
          type_name={"persuasive"}
          type_value={character.stats.persuasive}
        />
        <StatBox type_name={"quick"} type_value={character.stats.quick} />
        <StatBox type_name={"resolute"} type_value={character.stats.resolute} />
        <StatBox type_name={"strong"} type_value={character.stats.strong} />
        <StatBox type_name={"vigilant"} type_value={character.stats.vigilant} />
        <StatBox type_name={"accurate"} type_value={character.stats.accurate} />
      </div>
    </>
  );
}

export default StatsLower;
