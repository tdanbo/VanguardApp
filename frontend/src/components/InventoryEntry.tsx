import * as Constants from "../Constants";

import { ItemEntry } from "../Types";

import { TYPE_COLORS } from "../Constants";
import { CharacterEntry } from "../Types";
import { useEffect, useState } from "react";
import axios from "axios";
import chroma from "chroma-js";

interface InventoryEntryProps {
  index: number;
  browser: boolean;
  item: ItemEntry;
  selectedCharacter: CharacterEntry;
  update: number;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  onDeleteItem: (id: string) => void;
}

function InventoryEntry({
  index,
  item,
  browser,
  selectedCharacter,
  setUpdater,
  update,
  id,
  onDeleteItem,
}: InventoryEntryProps) {
  const DARKER_PRIMARY = chroma(Constants.PRIMARY).darken(1).hex();
  const DARKER_PRIMARY_DARKER = chroma(Constants.PRIMARY_DARKER)
    .darken(1)
    .hex();
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      if (browser) {
        return Constants.PRIMARY_DARKER;
      }
      if (index >= selectedCharacter.stats.strong) {
        return DARKER_PRIMARY_DARKER;
      } else {
        return Constants.PRIMARY_DARKER;
      }
    } else {
      if (browser) {
        return Constants.PRIMARY;
      }
      if (index >= selectedCharacter.stats.strong) {
        return DARKER_PRIMARY;
      } else {
        return Constants.PRIMARY;
      }
    }
  };

  const COLOR = TYPE_COLORS[item.category] || "defaultColor";

  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const AddInventorySlot = () => {
    console.log("Adding Item");
    if (
      selectedCharacter.inventory.length ===
      Math.ceil(selectedCharacter.stats.strong * 2)
    ) {
      console.log("Inventory is full");
      return;
    } else {
      console.log("Adding Item");
      const itemWithId = {
        ...item,
        id: generateRandomId(),
      };
      selectedCharacter.inventory.push(itemWithId);
    }
    setUpdater((prevUpdate) => prevUpdate + 1);
  };

  const DeleteInventorySlot = (id: string) => {
    onDeleteItem(id);
  };

  return (
    <div
      className="flex"
      style={{
        backgroundColor: BackgroundColor(),
        padding: "1px",
        height: Constants.INTENTORY_ENTRY_HEIGHT,
        minHeight: Constants.INTENTORY_ENTRY_HEIGHT,
        borderTop: `1px solid ${Constants.BORDER}`,
      }}
    >
      {browser ? (
        <button
          className="flex items-center justify-center"
          style={{
            backgroundColor: COLOR,
            width: "16px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          onClick={AddInventorySlot}
        >
          +
        </button>
      ) : (
        <button
          className="flex items-center justify-center"
          style={{
            backgroundColor: COLOR,
            width: "8px",
            fontSize: "10px",
          }}
          onClick={() => DeleteInventorySlot(id)}
        >
          x
        </button>
      )}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: BackgroundColor(),
          marginLeft: "1px",
        }}
      >
        {!browser && (
          <>
            {item.equip.map((item, index) => (
              <div
                key={index}
                className="flex grow"
                style={{
                  backgroundColor: Constants.BORDER,
                  width: "8px",
                  marginBottom: "1px",
                }}
              ></div>
            ))}
          </>
        )}
      </div>
      <div className="flex px-2 py-1">
        <div
          className="grid grid-cols-2 gap-0"
          style={{
            backgroundColor: BackgroundColor(),
          }}
        >
          {item.quality.map((item, index) => (
            <div
              key={index}
              className="flex grow items-center justify-center rounded"
              style={{
                backgroundColor: Constants.BORDER,
                width: "22px",
                height: "22px",
                margin: "1px",
                color: COLOR,
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {item.slice(0, 2)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex grow flex-row">
        <div className="m-0 flex flex-col justify-center">
          <p
            className="mb-3"
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: Constants.DARK,
            }}
          >
            {item.name}
          </p>
          <p
            className="-mt-2 mb-0"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: COLOR,
            }}
          >
            {item.type}
          </p>
        </div>
      </div>
      <div
        className="m-1 flex items-center justify-start rounded p-2"
        style={{
          backgroundColor: Constants.PRIMARY_HOVER,
          border: `1px solid ${Constants.BORDER}`,
          color: Constants.DARK,
          fontSize: "11px",
          fontWeight: "bold",
          height: "22px",
        }}
      >
        119x
      </div>
    </div>
  );
}
export default InventoryEntry;
