import { ItemEntry, SessionEntry, CharacterEntry } from "../Types";
import styled from "styled-components";
import * as Constants from "../Constants";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { AnvilIcon } from "../Images";
type DurabilityBoxProps = {
  item: ItemEntry;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  inactive?: boolean;
};

type DurabilityRContainerProps = {
  size: string;
  inactive: boolean;
};

const DurabilityContainer = styled.div<DurabilityRContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size}; // Use props.dice_size
  height: ${(props) => props.size}; // Use props.dice_size
  font-weight: bold;
  font-size: 16px;
  color: ${(props) =>
    props.inactive
      ? Constants.WIDGET_SECONDARY_FONT
      : Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-align: center;
  background-image: url(${AnvilIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${(props) => props.size}; // Use props.dice_size once
  text-shadow: ${(props) =>
    props.inactive ? "1px 1px 2px black" : "0px 0px 0px transparent;"};
  user-select: none;
`;

function DurabilityComponent({
  item,
  session,
  character,
  isCreature,
  websocket,
  inactive = true,
}: DurabilityBoxProps) {
  const handleAddDurability = () => {
    let max_durability = 0;
    if (
      item.category === "weapon accessory" ||
      item.category === "armor accessory"
    ) {
      max_durability = 4;
    } else {
      max_durability = item.roll.dice + item.roll.mod;
    }
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
    <DurabilityContainer
      title={"Durability"}
      onClick={handleSubDurability}
      onContextMenu={(e) => {
        e.preventDefault();
        handleAddDurability();
      }}
      size={"25px"}
      inactive={inactive}
    >
      {item.durability}
    </DurabilityContainer>
  );
}

export default DurabilityComponent;
