import { ItemEntry, SessionEntry, CharacterEntry } from "../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import * as Constants from "../Constants";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";

type containerprops = {
  active: boolean;
};

const inactive = "rgba(255, 255, 255, 0.05)";

const Container = styled.div<containerprops>`
  display: flex;
  flex-grow: 1;
  color: ${(props) =>
    props.active ? Constants.WIDGET_SECONDARY_FONT : inactive};
  background-color: ${(props) =>
    props.active
      ? Constants.WIDGET_BACKGROUND_EMPTY
      : Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  max-width: 40px;
  font-size: 14px;
  margin: 5px 0px 5px 5px;
  gap: 2px;
  user-select: none;
`;

type DurabilityBoxProps = {
  active: boolean;
  item: ItemEntry;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
};

function DurabilityBox({
  active,
  item,
  session,
  character,
  isCreature,
  websocket,
}: DurabilityBoxProps) {
  const handleAddDurability = () => {
    const max_durability = item.roll.dice + item.roll.mod;
    if (item.durability >= max_durability) {
      return;
    }
    item.durability = item.durability + 1;
    update_session(session, character, isCreature, websocket);
  };

  const handleSubDurability = () => {
    item.durability = item.durability - 1;
    update_session(session, character, isCreature, websocket);
  };
  return (
    <Container
      active={active}
      onClick={handleSubDurability}
      onContextMenu={(e) => {
        e.preventDefault();
        handleAddDurability();
      }}
    >
      <FontAwesomeIcon icon={faHeart} size="sm" style={{ marginTop: "1px" }} />
      {item.durability}
    </Container>
  );
}

export default DurabilityBox;
