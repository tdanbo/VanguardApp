import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import StorageBox from "../StorageBox";
import OverburdenBox from "../OverburdenBox";
import { CharacterContext } from "../../contexts/CharacterContext";
import { SessionContext } from "../../contexts/SessionContext";
import { useContext, useEffect, useState } from "react";
import AddMemberBox from "../AddMemberBox";
import { getNpcEntry } from "../../functions/CharacterFunctions";
import { CharacterEntry } from "../../Types";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

interface NavigatorProps {
  $active: boolean;
}

const Navigator = styled.button<NavigatorProps>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border: ${(props) =>
    props.$active ? `1px solid ${Constants.WIDGET_BORDER}` : `0px solid white`};
  color: ${(props) =>
    props.$active
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_BACKGROUND};
  background-color: ${(props) =>
    props.$active
      ? Constants.WIDGET_BACKGROUND_EMPTY
      : Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  width: 50px;
  height: 36px;
`;

const storageModifiers = [
  "Storage 2",
  "Storage 4",
  "Storage 6",
  "Storage 8",
  "Storage 10",
];
interface NavigationProps {
  inventoryState: number;
  setInventoryState: (browserState: number) => void;
}

function InventoryNavigation({
  inventoryState,
  setInventoryState,
}: NavigationProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const { session } = useContext(SessionContext);
  const onHandleItems = () => {
    if (inventoryState === 1) {
      setInventoryState(2);
    } else setInventoryState(1);
  };

  const selectMember = async (id: string) => {
    console.log(id);
    const member = await getNpcEntry(id);
    setCharacter(member);
  };

  return (
    <Container>
      {inventoryState === 1 ? (
        <Navigator $active={inventoryState === 1} onClick={onHandleItems}>
          <OverburdenBox />
        </Navigator>
      ) : (
        <Navigator $active={inventoryState === 2} onClick={onHandleItems}>
          <FontAwesomeIcon icon={faBolt} />
        </Navigator>
      )}
      {character.id === session.id ? (
        <>
          {character.entourage.map(
            (id, index) =>
              id !== "" && (
                <Navigator
                  key={index} // Always use a key when mapping over arrays in React
                  $active={inventoryState === 1}
                  onClick={() => selectMember(id)}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Navigator>
              ),
          )}
          <AddMemberBox />
        </>
      ) : null}
    </Container>
  );
}

export default InventoryNavigation;
