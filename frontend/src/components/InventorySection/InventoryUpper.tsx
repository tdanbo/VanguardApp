import StatBox from "../StatBox";
import * as Constants from "../../Constants";
import { CharacterEntry } from "../../Types";
import TitleBox from "../TitleBox";

import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function InventoryUpper() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <div className="grow flex-row">
      <>
        <div
          className="flex grow flex-row p-2"
          style={{
            backgroundColor: Constants.PRIMARY,
            height: Constants.SECTION_HEIGHT,
            minHeight: Constants.SECTION_HEIGHT,
          }}
        >
          <StatBox type_name={"Xp"} type_value={character.details.xp} />
          <StatBox
            type_name={"Unspent"}
            type_value={character.details.unspent}
          />
          <StatBox type_name={"Ft."} type_value={character.details.movement} />
        </div>
      </>
    </div>
  );
}

export default InventoryUpper;
