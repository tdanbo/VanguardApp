import * as Constants from "../Constants";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { RestCharacter, GetBurnRate } from "../functions/CharacterFunctions";
import { onDeleteItem } from "../functions/CharacterFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faHorseHead } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRoll } from "../functions/CombatFunctions";
import { ItemEntry } from "../Types";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 35px;
  width: 48px;
  letter-spacing: 1px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 16px;
  margin: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

interface StorageBoxProps {
  item: ItemEntry;
}

function StorageBox({ item }: StorageBoxProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const HandleDeleteItem = () => {
    const updatedCharacter = onDeleteItem({
      id: item.id,
      character,
    });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  return (
    <OuterContainer>
      <Navigator onClick={HandleDeleteItem}>
        <Icon>
          <FontAwesomeIcon icon={faHorseHead} />
        </Icon>
        {/* <Divider />
        <Container>8</Container> */}
      </Navigator>
    </OuterContainer>
  );
}

export default StorageBox;