import ActiveBox from "../ActiveBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import { getActiveModifiers } from "../../functions/CharacterFunctions";

function StatsLower() {
  const { character, setCharacter } = useContext(CharacterContext);
  // const character_modifiers = getActiveModifiers(character);
  return (
    <div className="grow flex-row pr-1">
      <TitleBox title={"ACTIVE"} />
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <ActiveBox
          active="sneaking"
          type_name={character.actives.sneaking.stat}
          type_value={character.actives.sneaking.mod}
        />
        <ActiveBox
          active="casting"
          type_name={character.actives.casting.stat}
          type_value={character.actives.casting.mod}
        />

        <ActiveBox
          active="defense"
          type_name={character.actives.defense.stat}
          type_value={character.actives.defense.mod}
        />
        <ActiveBox
          active="attack"
          type_name={character.actives.attack.stat}
          type_value={character.actives.attack.mod}
        />
      </div>
    </div>
  );
}

export default StatsLower;
