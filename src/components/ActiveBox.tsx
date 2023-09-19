import * as Constants from "../Constants";
import { useState } from "react";

import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext, useEffect } from "react";
import { Active } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { onAddCorruption } from "../functions/CharacterFunctions";

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
  flex: 2;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

// background-color: ${Constants.WIDGET_BACKGROUND};
// background-image: url("src/assets/icons/${(props) => props.active_name}.png");
// background-size: 70%;
// background-repeat: no-repeat;
// background-position: center;

const Modifier = styled.button`
  display: flex;
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

  const [dice, setDice] = useState<string>();

  const updateDiceForActiveName = (activeName: string) => {
    console.log("GETTING NEW DICE");
    switch (activeName) {
      case "sneaking":
        return "d20";
      case "casting":
        return "d4";
      case "defense":
        for (const invItem of character.inventory) {
          console.log("Checking inventory item:", invItem); // See each inventory item
          for (const equipItem of invItem.equip) {
            console.log("Checking equipment item:", equipItem); // See each equipment item
            if (equipItem.type === "AR" && equipItem.equipped) {
              console.log("Defense dice found:", invItem.roll.dice);
              return invItem.roll.dice;
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
              return invItem.roll.dice;
            }
          }
        }
        break;
    }
    console.log("No dice found for:", activeName); // Log if no dice value is found
    return "d4"; // Default return value when no dice is found
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
    setDice(updateDiceForActiveName(active_name));
  }, [active_name, character]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [character, active]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [modValue]);

  const onRollDice = useRoll();

  const handleActiveRoll = () => {
    onRollDice({
      dice: "d20",
      count: 1,
      target: value,
      type: active_name,
      add_mod: false,
    });
  };

  const handleDiceRoll = () => {
    onRollDice({
      dice: dice || "d4",
      count: 1,
      target: 0,
      type: active_name,
      add_mod: false,
    });
  };

  const RollCorruptionDice = () => {
    const dice_result = onRollDice({
      dice: "d4",
      count: 1,
      target: 0,
      type: "corruption",
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
        <Dice
          onClick={() => {
            if (active_name === "casting") {
              RollCorruptionDice();
            } else {
              handleDiceRoll();
            }
          }}
          color={Constants.TYPE_COLORS[active_name]}
        >
          {dice}
        </Dice>
      </Row>
    </Container>
  );
}

export default ActiveBox;
