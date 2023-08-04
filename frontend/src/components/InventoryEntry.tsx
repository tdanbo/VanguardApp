import * as Constants from "../Constants";

import { ItemEntry } from "../Types";

import { TYPE_COLORS } from "../Constants";
import { Color } from "react-bootstrap/esm/types";
import { CharacterEntry } from "../Types";
import { useEffect, useState } from "react";
import axios from "axios";

interface InventoryEntryProps {
  index: number;
  browser: boolean;
  item: ItemEntry;
  selectedCharacter: CharacterEntry;
  update: number;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
}

function InventoryEntry({
  index,
  item,
  browser,
  selectedCharacter,
  setUpdater,
  update,
}: InventoryEntryProps) {
  const UpdateInventoryState = () => {
    let inventoryList: string[] = Object.keys(selectedCharacter.inventory);

    inventoryList.some((key, index) => {
      const itemSlot = selectedCharacter.inventory[key];
      if (
        itemSlot === null ||
        (typeof itemSlot === "object" && Object.keys(itemSlot).length === 0)
      ) {
        console.log("Found an empty slot!");
        selectedCharacter.inventory[key] = item;
        return true; // This will break the loop.
      }
      return false; // This will continue the loop.
    });

    console.log(selectedCharacter.inventory);
    setUpdater((prevUpdate) => prevUpdate + 1);
  };

  const UpdateInventoryEquip = () => {};

  useEffect(() => {
    axios
      .put(
        `http://localhost:8000/api/characterlog/${selectedCharacter.details.name}`,
        selectedCharacter,
      )
      .then((res) => console.log(res));
  }, [update]);

  const COLOR = TYPE_COLORS[item.category] || "defaultColor";
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      return Constants.PRIMARY;
    } else {
      return Constants.PRIMARY_DARKER;
    }
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
          onClick={UpdateInventoryState}
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
            {console.log(item.equip)}
            {item.equip.map((item, index) => (
              <div
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
