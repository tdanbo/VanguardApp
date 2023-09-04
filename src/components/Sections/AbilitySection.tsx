import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import AbilityBrowser from "../Modals/AbilityBrowser";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import AbilityEntryItem from "../AbilityEntryItem";

function AbilitySection() {
  const { character, setCharacter } = useContext(CharacterContext);
  return (
    <>
      <div className="flex">
        <AbilityBrowser />
        <TitleBox title={"Abilities"} />
      </div>
      <div
        className="grow flex-col-reverse overflow-auto p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        {character.abilities.map((ability, index) => {
          return (
            <AbilityEntryItem key={index} ability={ability} browser={false} />
          );
        })}
      </div>
    </>
  );
}

export default AbilitySection;
