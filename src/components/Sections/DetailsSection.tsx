import DetailsBox from "../DetailsBox";
import XpBox from "../XpBox";
import * as Constants from "../../Constants";
import {
  onAddUnspentXp,
  onSubUnspentXp,
} from "../../functions/CharacterFunctions";
import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";
import { getCharacterMovement } from "../../functions/CharacterFunctions";

import DeleteCharacter from "../DeleteCharacter";
import DropdownCharacter from "../DropdownCharacter";
import AddCharacter from "../AddCharacter";

function DetailsSection() {
  const { character } = useContext(CharacterContext);
  console.log("Sneaking mod: ");
  console.log(character.actives.sneaking.mod);
  // const character_modifiers = getActiveModifiers(character);
  const movement = getCharacterMovement(character);

  return (
    <>
      <div
        className="flex"
        style={{
          height: Constants.SECTION_TITLE_HEIGHT,
          minHeight: Constants.SECTION_TITLE_HEIGHT,
        }}
      >
        <DeleteCharacter />
        <DropdownCharacter />
        <AddCharacter />
      </div>
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <XpBox onAddFunction={onAddUnspentXp} onSubFunction={onSubUnspentXp} />
        <DetailsBox type_name={"Ft."} type_value={movement} />
        <DetailsBox
          type_name={"Pain"}
          type_value={character.toughness.pain.value}
        />
      </div>
    </>
  );
}

export default DetailsSection;
