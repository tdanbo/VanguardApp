import * as Constants from "../Constants";

import { ItemEntry, EquipEntry } from "../Types";
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

import styled from "styled-components";

interface InventoryEntryProps {
  index: number;
  browser: boolean;
  equipped: string;
  item: ItemEntry;
  id: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-height: 50px;
  max-height: 50px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
`;

const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  border-right-bottom-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const EquipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: left;
  margin-left: 5px;
`;

const QualityContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const QualityBox = styled.div`
  display: flex;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 20px;
  font-size: 12px;
`;

interface RollBoxProps {
  color: string;
}

const RollBox = styled.div<RollBoxProps>`
  display: flex;
  flex-grow: 1;
  color: ${(props) => props.color};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 40px;
  height: 20px;
  font-size: 14px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

function InventoryEntry({
  index,
  item,
  browser,
  equipped,
  id,
}: InventoryEntryProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const HandleEquip = (item: ItemEntry, equipItem: EquipEntry) => {
    console.log("Handling Equip");
    if (equipItem.equipped === true) {
      const updatedCharacter = onUnequipItem({ character, item, equipItem });
      setCharacter(updatedCharacter);
    } else {
      const updatedCharacter = onEquipItem({ character, item, equipItem });
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
    <Container>
      <EquipContainer>
        {equipped === "" ? ( // if equipped is an empty string
          <>
            {item.equip.map((equip_item, index) => (
              <div
                key={index}
                className="flex grow"
                style={{
                  backgroundColor:
                    equip_item.equipped === true
                      ? COLOR
                      : Constants.WIDGET_BACKGROUND,
                  margin: "1px 0px 1px 1px",
                  width: "20px",
                  border: `1px solid ${Constants.WIDGET_BORDER}`,
                  borderTopLeftRadius:
                    index === 0 ? Constants.BORDER_RADIUS : undefined,
                  borderBottomLeftRadius:
                    index === 1 ? Constants.BORDER_RADIUS : undefined,
                }}
                onClick={() => HandleEquip(item, equip_item)}
              ></div>
            ))}
            {item.equip.length === 0 && (
              <div
                // If 'index' isn't available in this scope, use another unique value
                key={"unequip"}
                className="flex grow"
                style={{
                  backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
                  width: "20px",
                  height: "100%",
                }}
              ></div>
            )}
          </>
        ) : (
          // else part for equipped
          <div
            // Remove the 'key' prop or replace it with a meaningful value,
            // since 'index' isn't defined in this scope
            key={"unequip-else"}
            className="flex grow"
            style={{
              backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
              width: "20px",
              height: "100%",
            }}
          ></div>
        )}
      </EquipContainer>
      <NameContainer>
        <div className="m-0 flex flex-col justify-center">
          <p
            className="mb-3"
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: Constants.WIDGET_SECONDARY_FONT,
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
      </NameContainer>
      <QualityContainer>
        {item.quality.map((item, index) => (
          <QualityBox key={index}>{item.slice(0, 2)}</QualityBox>
        ))}
      </QualityContainer>
      <Divider />
      <RollContainer>
        {item.roll.roll === true && (
          <RollBox
            color={COLOR}
            onClick={
              item.type === "Ranged Weapon" ? handleRangeRoll : handleRoll
            }
          >
            {item.roll.dice}
          </RollBox>
        )}
        {item.quantity.bulk === true && <Quantity item={item} />}
      </RollContainer>
      {
        browser ? (
          <AddButton onClick={() => AddInventorySlot()}>+</AddButton>
        ) : equipped === "" ? (
          <AddButton onClick={() => DeleteInventorySlot(id)}>x</AddButton> // else part for equipped
        ) : (
          <AddButton></AddButton>
        ) // else part for equipped
      }
    </Container>
  );
}
export default InventoryEntry;
