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
  height: 50px;
  min-height: 50px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
  padding-right: 5px;
`;

const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-left-top-radius: ${Constants.BORDER_RADIUS};
  border-left-bottom-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND};
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
    <Container>
      {
        browser ? (
          <AddButton onClick={() => AddInventorySlot()}>+</AddButton>
        ) : equipped === "" ? (
          <AddButton onClick={() => DeleteInventorySlot(id)}>x</AddButton> // else part for equipped
        ) : (
          <AddButton></AddButton>
        ) // else part for equipped
      }
      <EquipContainer>
        {
          !browser ? ( // if browser is false
            equipped === "" ? ( // if equipped is an empty string
              <>
                {item.equip.map((hand, index) => (
                  <div
                    key={index}
                    className="flex grow"
                    style={{
                      backgroundColor: Constants.WIDGET_BORDER,
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
                    backgroundColor: Constants.WIDGET_BORDER,
                    width: "8px",
                    marginBottom: "1px",
                  }}
                  onClick={() => UnequipInventorySlot(equipped)}
                ></div>
              </>
            )
          ) : null // if browser is true, render nothing
        }
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
    </Container>
  );
}
export default InventoryEntry;
