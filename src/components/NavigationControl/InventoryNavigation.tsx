import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../../Constants";
import StorageBox from "../StorageBox";
import OverburdenBox from "../OverburdenBox";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  font-size: 18px;
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
  height: 38px;
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
  const { character } = useContext(CharacterContext);

  const onHandleItems = () => {
    if (inventoryState === 1) {
      setInventoryState(2);
    } else setInventoryState(1);
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
      {character.inventory.flatMap((item) =>
        item.quality.map((quality) => {
          if (storageModifiers.includes(quality)) {
            return <StorageBox item={item} />;
          }
          return null;
        }),
      )}
    </Container>
  );
}

export default InventoryNavigation;
