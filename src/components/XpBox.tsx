import * as Constants from "../Constants";
import { CharacterContext } from "../contexts/CharacterContext";
import { getCharacterXp } from "../functions/CharacterFunctions";
import { useContext } from "react";
import styled from "styled-components";
import "../App.css";

import {
  onAddUnspentXp,
  onSubUnspentXp,
} from "../functions/CharacterFunctions";
const Container = styled.div`
  margin-right: 20px;
  cursor: pointer;
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
    margin-top: 18px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
`;

function XpBox() {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAddXp = () => {
    const updated_character = onAddUnspentXp(character);
    setCharacter(updated_character);
  };

  const handleSubXp = () => {
    const updated_character = onSubUnspentXp(character);
    setCharacter(updated_character);
  };

  return (
    <Container
      className="mouse-icon-hover"
      onClick={handleSubXp}
      onContextMenu={(e) => {
        e.preventDefault();
        handleAddXp();
      }}
    >
      <h2>XP</h2>
      <h1>
        {getCharacterXp(character)} / {character.details.xp_earned}
      </h1>
    </Container>
  );
}

export default XpBox;
