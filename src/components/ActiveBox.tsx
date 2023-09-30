import * as Constants from "../Constants";
import { useState } from "react";

import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import { ActiveKey, AttackActive, DefenseActive, SimpleActive } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { onUseAmmunition } from "../functions/CharacterFunctions";
import "../App.css";

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

const Value = styled.button`
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
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
`;

const ActiveValue = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: ${Constants.WIDGET_BACKGROUND};
  letter-spacing: 1px;
`;

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

interface Props {
  active_name: ActiveKey;
  active: AttackActive | DefenseActive | SimpleActive;
}

function isAttackActive(obj: any): obj is AttackActive {
  return typeof obj.value === "number" && typeof obj.dice2 === "number";
  // you can add more checks for other properties if needed
}

function isDefenseActive(obj: any): obj is DefenseActive {
  return typeof obj.value === "number" && typeof obj.dice === "number";
  // you can add more checks for other properties if needed
}

function ActiveBox({ active_name, active }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [modValue, setModvalue] = useState<number>(0);

  const handleAddValue = () => {
    const newValue = modValue + 1;
    setModvalue(newValue);
  };

  const handleSubValue = () => {
    const newValue = modValue - 1;
    setModvalue(newValue);
  };

  const onRollDice = useRoll();

  const handleActiveRoll = () => {
    onRollDice({
      dice: 20,
      count: 1,
      modifier: modValue,
      target: Math.max(active.value + modValue, 1),
      source: "Skill Test",
      active: active_name,
      add_mod: false,
    });
  };

  const handleDiceRoll = (
    dice: number,
    dice_name: string,
    dice_mod: number,
    damage_armor: string,
  ) => {
    onRollDice({
      dice: dice,
      count: 1,
      target: 0,
      modifier: dice_mod,
      source: dice_name,
      active: damage_armor,
      add_mod: false,
    });
  };

  const handleRangeRoll = (
    dice: number,
    dice_name: string,
    dice_mod: number,
    damage_armor: string,
  ) => {
    const { updatedCharacter, hasAmmunition } = onUseAmmunition(character);
    console.log("Ranged Attack Updated Character");
    console.log(updatedCharacter);

    setCharacter(updatedCharacter);

    console.log("Ranged Attack");
    console.log(hasAmmunition);
    console.log(updatedCharacter);

    if (!hasAmmunition) {
      // handle case when onUseAmmunition is false
      return;
    }

    onRollDice({
      dice: dice,
      count: 1,
      target: 0,
      modifier: dice_mod,
      source: dice_name,
      active: damage_armor,
      add_mod: false,
    });
  };

  return (
    <Container>
      <Value onClick={handleActiveRoll} className="dice-icon-hover">
        {Math.max(active.value + modValue, 1)}
        <ActiveValue> {active_name.toUpperCase()}</ActiveValue>
      </Value>
      <Row>
        <Modifier
          onClick={handleSubValue}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddValue();
          }}
          className="mouse-icon-hover"
        >
          {modValue}
        </Modifier>
        {isAttackActive(active) ? (
          <>
            <Dice
              onClick={() => {
                [
                  "Bow",
                  "Crossbow",
                  "Small Crossbow",
                  "Repeating Crossbow",
                  "Longbow",
                  "Horsema's Longbow",
                  "Composite Bow",
                  "Arbalest",
                ].includes(active.dice1_name)
                  ? handleRangeRoll(
                      active.dice1,
                      active.dice1_name,
                      active.dice1_mod,
                      "Damage",
                    )
                  : handleDiceRoll(
                      active.dice1,
                      active.dice1_name,
                      active.dice1_mod,
                      "Damage",
                    );
              }}
              color={Constants.TYPE_COLORS[active_name]}
            >
              d{active.dice1}
              {active.dice1_mod > 0 ? `+${active.dice1_mod}` : null}
            </Dice>

            {active.dice2_name !== "Knuckles" && (
              <Dice
                onClick={() => {
                  [
                    "Bow",
                    "Crossbow",
                    "Small Crossbow",
                    "Repeating Crossbow",
                    "Longbow",
                    "Horsema's Longbow",
                    "Composite Bow",
                    "Arbalest",
                  ].includes(active.dice2_name)
                    ? handleRangeRoll(
                        active.dice2,
                        active.dice2_name,
                        active.dice2_mod,
                        "Damage",
                      )
                    : handleDiceRoll(
                        active.dice2,
                        active.dice2_name,
                        active.dice2_mod,
                        "Damage",
                      );
                }}
                color={Constants.TYPE_COLORS[active_name]}
              >
                d{active.dice2}
                {active.dice2_mod > 0 ? `+${active.dice2_mod}` : null}
              </Dice>
            )}
          </>
        ) : isDefenseActive(active) ? (
          <Dice
            onClick={() => {
              handleDiceRoll(
                active.dice,
                active.dice_name,
                active.dice_mod,
                "Armor",
              );
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            d{active.dice}
            {active.dice_mod > 0 ? `+${active.dice_mod}` : null}
          </Dice>
        ) : null}
      </Row>
    </Container>
  );
}

export default ActiveBox;
