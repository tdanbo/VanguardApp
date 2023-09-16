import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { getCharacterXp } from "../functions/CharacterFunctions";
import { useContext } from "react";
import styled from "styled-components";

type Props = {
  onAddFunction: (character: CharacterEntry) => CharacterEntry;
  onSubFunction: (character: CharacterEntry) => CharacterEntry;
};

function XpBox({ onAddFunction, onSubFunction }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAdd = () => {
    const updated_character = onAddFunction(character);
    setCharacter(updated_character);
  };

  const handleSub = () => {
    const updated_character = onSubFunction(character);
    setCharacter(updated_character);
  };

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    font-weight: bold;
    h1 {
      font-size: 1.5em;
      color: ${Constants.WIDGET_PRIMARY_FONT};
    }
    h2 {
      font-size: 0.75em;
      margin-right: 10px;
      margin-top: 10px;
      color: ${Constants.WIDGET_SECONDARY_FONT};
    }
  `;

  return (
    <Container onClick={handleAdd}>
      <h2>XP</h2>
      <h1>
        {getCharacterXp(character)} / {character.details.xp_earned}
      </h1>
    </Container>
  );
}

export default XpBox;
