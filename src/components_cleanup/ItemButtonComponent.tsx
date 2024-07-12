import {
  faArrowDown,
  faCoins,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";
import {
  CharacterEntry,
  ItemEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { DropItem, TakeItem } from "../functions/ItemHandleFunctions";
import { toTitleCase } from "../functions/UtilityFunctions";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setQuantity(state === "buy" || state === "drop" ? 1 : item.quantity);
  }, [item]);

  const icon =
    state === "buy"
      ? faCoins
      : state === "drop"
      ? faXmark
      : state === "give"
      ? faArrowDown
      : faPlus;

  const HandleTakeItem = () => {
    TakeItem(item, character, session, websocket, isCreature, quantity, false);
    setIsModalOpen(false);
  };

  const HandleGamemasterTakeItem = () => {
    TakeItem(item, character, session, websocket, isCreature, quantity, true);
    setIsModalOpen(false);
  };

  const HandleDropItem = (destroy: boolean) => {
    DropItem(
      item,
      character,
      session,
      websocket,
      isCreature,
      quantity,
      false, // Give
      destroy,
    );
    setIsModalOpen(false);
  };

  const HandleBuyItem = () => {
    console.log("Buying item", item);
    character.coins -= quantity * item.static.cost;
    TakeItem(item, character, session, websocket, isCreature, quantity, false);
    setIsModalOpen(false);
  };

  const HandleShareItem = () => {
    let character_portion = Math.floor(quantity / session.characters.length);

    for (const character of session.characters) {
      if (character_portion === 0) break;

      TakeItem(
        item,
        character,
        session,
        websocket,
        isCreature,
        character_portion,
        false,
      );
    }

    setIsModalOpen(false);
  };

  const HandleGiveItem = () => {
    DropItem(
      item,
      character,
      session,
      websocket,
      isCreature,
      quantity,
      true, // Give
      false,
    );
    setIsModalOpen(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the value is a valid non-negative number
    if (
      !/^\d*$/.test(value) ||
      (state === "give" && !item.static.bulk) ||
      (state !== "give" && parseInt(value) > item.quantity) ||
      parseInt(value) <= 0
    ) {
      // If the value is not a valid non-negative number, don't update the state
      return;
    }

    // Update the input value state
    setQuantity(parseInt(value));
  };

  const handleSingleQuantityChange = (add: boolean) => {
    let newValue = quantity;
    if (add) {
      newValue += 1;
    } else {
      newValue -= 1;
    }

    if (QuantityChangeRules(newValue.toString())) {
      setQuantity(newValue);
    }
  };

  const QuantityChangeRules = (value: string) => {
    if (
      !/^\d*$/.test(value) ||
      (state === "give" && !item.static.bulk) ||
      (state !== "give" && parseInt(value) > item.quantity) ||
      parseInt(value) <= 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button bg--primary-3 font--primary-4 border-radius--none"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={icon} size="sm" />
      </div>
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.50)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="column bg--primary-1 border-radius padding--large"
            style={{
              minWidth: "400px",
              maxWidth: "15%",
              maxHeight: "20%",
            }}
            onClick={stopPropagation}
          >
            <div className="row" style={{ fontSize: "25px" }}>
              <div>{item.name}</div>
              <div className="font--primary-4 font--size-medium">
                {item.quantity - quantity > 0
                  ? `x ${item.quantity - quantity}`
                  : ""}
              </div>
            </div>
            <div className="row bg--primary-1 padding--large border">
              <div className="row">
                <div
                  className="row button bg--primary-4"
                  style={{ fontSize: "30px", fontWeight: "bold" }}
                  onClick={() => handleSingleQuantityChange(false)}
                >
                  -
                </div>
                <input
                  className="row empty_color"
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    fontSize: "40px",
                    minWidth: "50%",
                    padding: "0px",
                    color: Constants.WIDGET_SECONDARY_FONT,
                    textAlign: "center",
                    border: "none",
                  }}
                />
                <div
                  className="row button bg--primary-4"
                  style={{ fontSize: "30px", fontWeight: "bold" }}
                  onClick={() => handleSingleQuantityChange(true)}
                >
                  +
                </div>
              </div>
            </div>
            <div className="row bg--primary-1 padding--large border">
              <div
                className="row button bg--primary-4"
                disabled={
                  state === "buy" &&
                  character.coins < quantity * item.static.cost
                }
                onClick={() =>
                  state === "buy"
                    ? HandleBuyItem()
                    : state === "drop"
                    ? HandleDropItem(false)
                    : state === "give"
                    ? HandleGiveItem()
                    : HandleTakeItem()
                }
              >
                {toTitleCase(state)}
              </div>
              {state === "drop" ? (
                <div
                  className="row button bg--primary-4"
                  onClick={() => HandleDropItem(true)}
                >
                  Destroy
                </div>
              ) : state === "give" ? (
                <div
                  className="row button bg--primary-4"
                  onClick={() => HandleGamemasterTakeItem()}
                >
                  {character.name}
                </div>
              ) : state === "take" ? (
                <div
                  className="row button bg--primary-4"
                  disabled={quantity < session.characters.length}
                  onClick={() => HandleShareItem()}
                >
                  Share
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemButtonComponent;
