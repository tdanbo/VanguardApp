import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faChevronLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import OverburdenBox from "../OverburdenBox";
import { CharacterContext } from "../../contexts/CharacterContext";
import { SessionContext } from "../../contexts/SessionContext";
import { useContext } from "react";
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

interface NavigationProps {
  inventoryState: number;
  setInventoryState: (browserState: number) => void;
  mainCharacter: CharacterEntry | undefined;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  gmMode: boolean;
}

function InventoryNavigation({
  inventoryState,
  mainCharacter,
  setInventoryState,
  setCreatureEdit,
  gmMode,
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

  const backToMain = () => {
    console.log("Back to main character");
    if (!mainCharacter) return;
    console.log("Back to main character");
    setCharacter(mainCharacter);
  };

  const HandleLeaveEdit = () => {
    if (!mainCharacter) return;
    setCharacter(mainCharacter);
    setCreatureEdit(false);
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
          {character.entourage.map((rostermember, index) =>
            rostermember.id !== "" ? (
              <Navigator
                title={rostermember.name}
                key={index}
                $active={inventoryState === 1}
                onClick={() => selectMember(rostermember.id)}
              >
                <FontAwesomeIcon icon={faUser} />
              </Navigator>
            ) : null,
          )}
        </>
      ) : gmMode ? (
        <Navigator
          title={"Leave Edit Mode"}
          $active={inventoryState === 1}
          onClick={HandleLeaveEdit}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Navigator>
      ) : (
        <Navigator
          title={"Back to Main Character"}
          $active={inventoryState === 1}
          onClick={backToMain}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Navigator>
      )}
    </Container>
  );
}

export default InventoryNavigation;
