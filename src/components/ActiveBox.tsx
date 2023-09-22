import * as Constants from "../Constants";
import { useState } from "react";

import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext, useEffect } from "react";
import { Active } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { onAddCorruption } from "../functions/CharacterFunctions";
import { UpperFirstLetter } from "../functions/UtilityFunctions";

type Props = {
  active: Active;
  active_name: string;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 2px;
`;

interface ValueProps {
  active_name: string;
}

const Value = styled.button<ValueProps>`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    margin-top: -10px;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
`;

// background-color: ${Constants.WIDGET_BACKGROUND};
// background-image: url("src/assets/icons/${(props) => props.active_name}.png");
// background-size: 70%;
// background-repeat: no-repeat;
// background-position: center;

const Modifier = styled.button`
  display: flex;
  flex: 1;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};

  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

type DiceProps = {
  color: string;
};

const Dice = styled.button<DiceProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

function ActiveBox({ active_name, active }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [modValue, setModvalue] = useState<number>(0);

  const computeActiveValue = () =>
    character.stats[active.stat].value + active.mod + modValue;
  const [value, setValue] = useState(computeActiveValue());

  const [itemDice, setItemDice] = useState<ItemType[]>([]);

  type ItemType = {
    name: string;
    roll: string;
  };

  const updateDiceForActiveName = (activeName: string): ItemType[] => {
    console.log("GETTING NEW DICE");

    // Initialize your array with that type
    const itemDict: ItemType[] = [];

    switch (activeName) {
      case "sneaking":
        itemDict.push({ name: "Sneaky", roll: "d4" });
        break;
      case "casting":
        itemDict.push({ name: "Corruption", roll: "d4" });
        break;
      case "defense":
        for (const invItem of character.inventory) {
          console.log("Checking inventory item:", invItem); // See each inventory item
          for (const equipItem of invItem.equip) {
            console.log("Checking equipment item:", equipItem); // See each equipment item
            if (equipItem.type === "AR" && equipItem.equipped) {
              console.log("Defense dice found:", invItem.roll.dice);
              itemDict.push({ name: invItem.name, roll: invItem.roll.dice });
            }
          }
        }
        break;
      case "attack":
        for (const invItem of character.inventory) {
          for (const equipItem of invItem.equip) {
            if (
              ["2H", "MH", "OH"].includes(equipItem.type) &&
              equipItem.equipped
            ) {
              console.log("Attack dice found:", invItem.roll.dice); // Debug log
              itemDict.push({ name: invItem.name, roll: invItem.roll.dice });
            }
          }
        }
        break;
    }

    if (itemDict.length === 0) {
      console.log("No dice found for:", activeName); // Log if no dice value is found
      itemDict.push({ name: "un-equipped", roll: "d4" }); // Default value when no dice is found
    }

    return itemDict;
  };

  const handleAddValue = () => {
    const newValue = modValue + 1;
    setModvalue(newValue);
  };

  const handleSubValue = () => {
    const newValue = modValue - 1;
    setModvalue(newValue);
  };

  useEffect(() => {
    setItemDice(updateDiceForActiveName(active_name));
  }, [active_name, character]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [character, active]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [modValue]);

  const onRollDice = useRoll();

  const handleActiveRoll = () => {
    console.log("modValue:", modValue);
    onRollDice({
      dice: "d20",
      count: 1,
      modifier: modValue,
      target: value,
      source: "Skill Test",
      active: active.stat,
      add_mod: false,
    });
  };

  const handleDiceRoll = (active: string) => {
    onRollDice({
      dice: itemDice[0].roll || "d4",
      count: 1,
      target: 0,
      modifier: 0,
      source: itemDice[0].name,
      active: active_name,
      add_mod: false,
    });
  };

  const handleOffDiceRoll = () => {
    onRollDice({
      dice: itemDice[1].roll || "d4",
      count: 1,
      target: 0,
      modifier: 0,
      source: itemDice[1].name,
      active: "Damage",

      add_mod: false,
    });
  };

  const RollCorruptionDice = () => {
    const dice_result = onRollDice({
      dice: "d4",
      count: 1,
      target: 0,
      modifier: 0,
      source: "Casting",
      active: "Corruption",
      add_mod: true,
    });

    const updated_character = onAddCorruption(character, dice_result);

    if (updated_character) {
      setCharacter(updated_character);
    }
  };

  return (
    <Container>
      <Value active_name={active_name} onClick={handleActiveRoll}>
        {value}
        <p>{active_name.toUpperCase()}</p>
      </Value>
      <Row>
        <Modifier
          onClick={handleSubValue}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddValue();
          }}
        >
          {modValue}
        </Modifier>
        {itemDice[0] && (
          <Dice
            onClick={() => {
              if (active_name === "casting") {
                RollCorruptionDice();
              } else if (active_name === "defense") {
                handleDiceRoll("armor");
              } else if (active_name === "attack") {
                handleDiceRoll("damage");
              } else if (active_name === "sneaking") {
                handleDiceRoll("skill test");
              }
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            {itemDice[0].roll}
          </Dice>
        )}
        {itemDice[1] && ( // Checks if dice[1] exists
          <Dice
            onClick={() => {
              handleOffDiceRoll();
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            {itemDice[1].roll}
          </Dice>
        )}
      </Row>
    </Container>
  );
}

export default ActiveBox;
