import * as Constants from "../Constants";

import { ItemEntry } from "../Types";
import Quantity from "./Modals/Quantity";
import { TYPE_COLORS } from "../Constants";
import { useContext } from "react";
import { useRoll } from "../functions/CombatFunctions";
import { CharacterContext } from "../contexts/CharacterContext";
import {
  onDeleteItem,
  onEquipItem,
  onUnequipItem,
  onAddInventoryItem,
  onUseAmmunition,
} from "../functions/CharacterFunctions";
import chroma from "chroma-js";

interface InventoryEntryProps {
  index: number;
  browser: boolean;
  equipped: string;
  item: ItemEntry;
  id: string;
}

function InventoryEntry({
  index,
  item,
  browser,
  equipped,
  id,
}: InventoryEntryProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const DARKER_PRIMARY = chroma(Constants.PRIMARY).darken(1).hex();
  const DARKER_PRIMARY_DARKER = chroma(Constants.PRIMARY_DARKER)
    .darken(1)
    .hex();
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      if (browser) {
        return Constants.PRIMARY_DARKER;
      }
      if (index >= character.stats.strong.value) {
        return DARKER_PRIMARY_DARKER;
      } else {
        return Constants.PRIMARY_DARKER;
      }
    } else {
      if (browser) {
        return Constants.PRIMARY;
      }
      if (index >= character.stats.strong.value) {
        return DARKER_PRIMARY;
      } else {
        return Constants.PRIMARY;
      }
    }
  };

  const COLOR = TYPE_COLORS[item.category] || "defaultColor";

  const EquipInventorySlot = (id: string, hand: string) => {
    const updatedCharacter = onEquipItem({ id, character, item, hand });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const UnequipInventorySlot = (equipped: string) => {
    const updatedCharacter = onUnequipItem({ character, item, equipped });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const AddInventorySlot = () => {
    const updatedCharacter = onAddInventoryItem({ character, item });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const DeleteInventorySlot = (id: string) => {
    const updatedCharacter = onDeleteItem({ id, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const onRollDice = useRoll();

  const handleRoll = () => {
    onRollDice({
      dice: item.roll.dice,
      count: 1,
      target: 0,
      type: item.roll.type,
      add_mod: true,
    });
  };

  const handleRangeRoll = () => {
    const { updatedCharacter, hasAmmunition } = onUseAmmunition(character);
    setCharacter(updatedCharacter);
    if (!hasAmmunition) {
      console.log("no ammo");
      // handle case when onUseAmmunition is false
      return;
    }

    onRollDice({
      dice: item.roll.dice,
      count: 1,
      target: 0,
      type: item.roll.type,
      add_mod: true,
    });
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
      {
        browser ? (
          <button
            className="flex items-center justify-center"
            style={{
              backgroundColor: COLOR,
              width: "16px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onClick={() => AddInventorySlot()}
          >
            +
          </button>
        ) : equipped === "" ? (
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
          </button> // else part for equipped
        ) : (
          <button
            className="flex items-center justify-center"
            style={{
              backgroundColor: COLOR,
              width: "8px",
              fontSize: "10px",
            }}
          ></button>
        ) // else part for equipped
      }
      <div
        className="flex flex-col"
        style={{
          backgroundColor: BackgroundColor(),
          marginLeft: "1px",
        }}
      >
        {
          !browser ? ( // if browser is false
            equipped === "" ? ( // if equipped is an empty string
              <>
                {item.equip.map((hand, index) => (
                  <div
                    key={index}
                    className="flex grow"
                    style={{
                      backgroundColor: Constants.BORDER,
                      width: "8px",
                      marginBottom: "1px",
                    }}
                    onClick={() => EquipInventorySlot(id, hand)}
                  ></div>
                ))}
              </>
            ) : (
              // else part for equipped
              <>
                <div
                  key={index} // Note: You might get an error here if index is not defined in this scope
                  className="flex grow"
                  style={{
                    backgroundColor: Constants.BORDER,
                    width: "8px",
                    marginBottom: "1px",
                  }}
                  onClick={() => UnequipInventorySlot(equipped)}
                ></div>
              </>
            )
          ) : null // if browser is true, render nothing
        }
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
      {item.roll.roll === true && (
        <div
          className="m-1 flex items-center justify-start rounded p-2 text-xs font-bold"
          style={{
            backgroundColor: Constants.PRIMARY_HOVER,
            border: `1px solid ${COLOR}`,
            color: COLOR,
            height: "22px",
          }}
          onClick={item.type === "Ranged Weapon" ? handleRangeRoll : handleRoll}
        >
          {item.roll.dice}
        </div>
      )}
      {item.quantity.bulk === true && <Quantity item={item} />}
    </div>
  );
}
export default InventoryEntry;
