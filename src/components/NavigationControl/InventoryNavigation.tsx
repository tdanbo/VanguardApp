import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import * as Constants from "../../Constants";
import { CharacterEntry, SessionEntry } from "../../Types";
import OverburdenBox from "../OverburdenBox";
import StorageBox from "../StorageBox";
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
  gmMode: boolean;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function InventoryNavigation({
  inventoryState,
  setInventoryState,
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  const onHandleItems = () => {
    if (inventoryState === 1) {
      setInventoryState(2);
    } else setInventoryState(1);
  };

  return (
    <Container>
      {inventoryState === 1 ? (
        <>
          <Navigator $active={inventoryState === 1} onClick={onHandleItems}>
            <OverburdenBox character={character} />
          </Navigator>
          {character.inventory.map((item) => {
            if (item.category === "container") {
              return (
                <StorageBox
                  key={item.id}
                  item={item}
                  character={character}
                  session={session}
                  isCreature={isCreature}
                  websocket={websocket}
                />
              );
            }
            return null; // Don't forget to handle other cases if needed
          })}
        </>
      ) : (
        <Navigator $active={inventoryState === 2} onClick={onHandleItems}>
          <FontAwesomeIcon icon={faBolt} />
        </Navigator>
      )}
    </Container>
  );
}

export default InventoryNavigation;
