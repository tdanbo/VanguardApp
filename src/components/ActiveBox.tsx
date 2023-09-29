import * as Constants from "../Constants";
import { useState } from "react";

import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext, useEffect } from "react";
import {
  ActiveKey,
  ItemEntry,
  StatName,
  AttackActive,
  DefenseActive,
  SimpleActive,
} from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { onUseAmmunition } from "../functions/CharacterFunctions";
import { ActivesContext } from "../contexts/ActivesContext";
import { UpdateActives } from "../functions/ActivesFunction";
import "../App.css";
import { set } from "lodash";
interface Props {
  active_name: ActiveKey;
}

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

function isAttackActive(obj: any): obj is AttackActive {
  return typeof obj.value === "number" && typeof obj.dice2 === "number";
  // you can add more checks for other properties if needed
}

function isDefenseActive(obj: any): obj is DefenseActive {
  return typeof obj.value === "number" && typeof obj.dice === "number";
  // you can add more checks for other properties if needed
}

function ActiveBox({ active_name }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [modValue, setModvalue] = useState<number>(0);

  const actives = UpdateActives(character);

  const currentActive = actives[active_name];

  console.log(currentActive);

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
      target: currentActive.value,
      source: "Skill Test",
      active: active_name,
      add_mod: false,
    });
  };

  const handleDiceRoll = (
    dice: number,
    dice_name: string,
    damage_armor: string,
  ) => {
    onRollDice({
      dice: dice,
      count: 1,
      target: 0,
      modifier: 0,
      source: dice_name,
      active: damage_armor,
      add_mod: false,
    });
  };

  const handleRangeRoll = (
    dice: number,
    dice_name: string,
    damage_armor: string,
  ) => {
    const { updatedCharacter, hasAmmunition } = onUseAmmunition(character);
    setCharacter(updatedCharacter);
    if (!hasAmmunition) {
      // handle case when onUseAmmunition is false
      return;
    }

    onRollDice({
      dice: dice,
      count: 1,
      target: 0,
      modifier: 0,
      source: dice_name,
      active: damage_armor,
      add_mod: false,
    });
  };

  return (
    <Container>
      <Value onClick={handleActiveRoll} className="dice-icon-hover">
        {currentActive.value}
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
        {isAttackActive(currentActive) ? (
          <>
            <Dice
              onClick={() => {
                currentActive.dice1_name === "Ranged Weapon"
                  ? handleRangeRoll(
                      currentActive.dice1,
                      currentActive.dice1_name,
                      "Damage",
                    )
                  : handleDiceRoll(
                      currentActive.dice1,
                      currentActive.dice1_name,
                      "Damage",
                    );
              }}
              color={Constants.TYPE_COLORS[active_name]}
            >
              d{currentActive.dice1}
            </Dice>

            {currentActive.dice2_name !== "Knuckles" && (
              <Dice
                onClick={() => {
                  currentActive.dice2_name === "Ranged Weapon"
                    ? handleRangeRoll(
                        currentActive.dice2,
                        currentActive.dice2_name,
                        "Damage",
                      )
                    : handleDiceRoll(
                        currentActive.dice2,
                        currentActive.dice2_name,
                        "Damage",
                      );
                }}
                color={Constants.TYPE_COLORS[active_name]}
              >
                d{currentActive.dice2}
              </Dice>
            )}
          </>
        ) : isDefenseActive(currentActive) ? (
          <Dice
            onClick={() => {
              handleDiceRoll(
                currentActive.dice,
                currentActive.dice_name,
                "Armor",
              );
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            d{currentActive.dice}
          </Dice>
        ) : null}
      </Row>
    </Container>
  );
}

export default ActiveBox;
