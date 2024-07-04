import {
  faArrowDown,
  faCoins,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";
import {
  ItemEntry,
  SessionEntry,
  CharacterEntry,
  ItemStateType,
} from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { TakeItem, DropItem } from "../functions/ItemHandleFunctions";
import { Socket } from "socket.io-client";
import { cloneDeep } from "lodash";
import uniqueId from "lodash/uniqueId";

interface ItemButtonComponent {
  state: ItemStateType;
  item: ItemEntry;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function ItemButtonComponent({
  state,
  item,
  session,
  character,
  websocket,
  isCreature,
}: ItemButtonComponent) {
  const icon =
    state === "buy"
      ? faCoins
      : state === "drop"
      ? faXmark
      : state === "give"
      ? faArrowDown
      : faPlus;

  const HandleTakeItem = (item: ItemEntry, quantity: number) => {
    TakeItem(item, character, session, websocket, isCreature, quantity);
  };

  const HandleDropItem = (
    item: ItemEntry,
    quantity: number,
    destroy: boolean,
  ) => {
    DropItem(
      item,
      character,
      session,
      websocket,
      isCreature,
      quantity,
      destroy,
    );
  };

  const HandleBuyItem = (item: ItemEntry, quantity: number) => {
    console.log("Buying item", item);
  };

  const HandleGiveItem = (item: ItemEntry, quantity: number) => {
    console.log("Giving item", item);
  };

  return (
    <div
      className="row"
      style={{
        maxWidth: "40px",
        background: Constants.WIDGET_BACKGROUND_EMPTY,
        borderRadius: "0px",
        borderLeft: "1px solid rgba(0, 0, 0, 0.25)",
        color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
      }}
      onClick={() =>
        state === "buy"
          ? HandleBuyItem(item, 1)
          : state === "drop"
          ? HandleDropItem(item, 1, false)
          : state === "give"
          ? HandleGiveItem(item, 1)
          : HandleTakeItem(item, 1)
      }
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </div>
  );
}

export default ItemButtonComponent;
