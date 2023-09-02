import DetailsBox from "../DetailsBox";
import XpBox from "../XpBox";
import * as Constants from "../../Constants";
import { CharacterEntry } from "../../Types";
import TitleBox from "../TitleBox";
import {
  onAddUnspentXp,
  onSubUnspentXp,
} from "../../functions/CharacterFunctions";
import React, { useState, useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";
import {
  getCharacterXp,
  getCharacterMovement,
  getActiveModifiers,
} from "../../functions/CharacterFunctions";

function InventoryUpper() {
  const { character, setCharacter } = useContext(CharacterContext);
  console.log("Sneaking mod: ");
  console.log(character.actives.sneaking.mod);
  // const character_modifiers = getActiveModifiers(character);
  const xp_spent = getCharacterXp(character);
  const movement = getCharacterMovement(character);

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
          <XpBox
            onAddFunction={onAddUnspentXp}
            onSubFunction={onSubUnspentXp}
          />
          <DetailsBox type_name={"Ft."} type_value={movement} />
        </div>
      </>
    </div>
  );
}

export default InventoryUpper;
