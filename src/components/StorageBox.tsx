import { mdiSack } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";

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

const IconBag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

interface StorageBoxProps {
  item: ItemEntry;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function StorageBox({
  item,
  character,
  session,
  isCreature,
  websocket,
}: StorageBoxProps) {
  console.log(isCreature);
  const HandleDeleteItem = () => {
    const filter_inventory = character.inventory.filter(
      (i) => i.id !== item.id,
    );
    character.inventory = filter_inventory;
    update_session(session, character, isCreature, websocket);
  };

  return (
    <OuterContainer>
      <Navigator onClick={HandleDeleteItem}>
        <IconBag>
          <Icon path={mdiSack} size={0.8} />
        </IconBag>
        {/* <Divider />
        <Container>8</Container> */}
      </Navigator>
    </OuterContainer>
  );
}

export default StorageBox;
