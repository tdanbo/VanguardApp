import { useState } from "react";
import * as Constants from "../Constants";

import styled from "styled-components";
import "../App.css";
import {
  ActiveKey,
  AttackActive,
  CharacterEntry,
  DefenseActive,
  SessionEntry,
  SimpleActive,
} from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { update_session } from "../functions/SessionsFunctions";

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
  min-height: 30px;
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
  character: CharacterEntry;
  session: SessionEntry;
  websocket: WebSocket;
  isCreature: boolean;
}

function isAttackActive(obj: any): obj is AttackActive {
  return typeof obj.value === "number" && typeof obj.dice2 === "number";
  // you can add more checks for other properties if needed
}

function isDefenseActive(obj: any): obj is DefenseActive {
  return typeof obj.value === "number" && typeof obj.dice === "number";
  // you can add more checks for other properties if needed
}

function ActiveBox({
  active_name,
  active,
  character,
  session,
  websocket,
  isCreature,
}: Props) {
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
      websocket,
      character,
      session,
      dice: 20,
      count: 1,
      modifier: modValue,
      target: Math.max(active.value + modValue, 1),
      source: "Skill Test",
      active: active_name,
      add_mod: false,
      isCreature,
    });
  };

  const handleDiceRoll = (
    dice: number,
    dice_name: string,
    dice_mod: number,
    damage_armor: string,
  ) => {
    onRollDice({
      websocket,
      character,
      session,
      dice: dice,
      count: 1,
      target: 0,
      modifier: dice_mod,
      source: dice_name,
      active: damage_armor,
      add_mod: false,
      isCreature,
    });
  };

  const handleRangeRoll = (
    dice: number,
    dice_name: string,
    dice_mod: number,
    damage_armor: string,
  ) => {
    type Quantity = {
      count: number;
    };

    type EquipmentItem = {
      id: string;
      category: string;
      quantity: Quantity;
    };

    let usedAmmunitionId = "";
    const { main, off, armor } = character.equipment;
    const equipment_slots: EquipmentItem[] = [main, off];

    let hasAmmunition = false;

    equipment_slots.map((item) => {
      if (item.category === "ammunition" && item.quantity.count > 0) {
        hasAmmunition = true;
        usedAmmunitionId = item.id;
        item.quantity.count -= 1;
        character.inventory.map((item) => {
          if (item.id === usedAmmunitionId) {
            item.quantity.count -= 1;
          }
        });
      } else {
        hasAmmunition = false;
      }
    });

    if (!hasAmmunition) {
      // handle case when onUseAmmunition is false
      console.log("No ammunition");
    } else {
      update_session(session, character, isCreature, websocket);
      onRollDice({
        websocket,
        character,
        session,
        dice: dice,
        count: 1,
        target: 0,
        modifier: dice_mod,
        source: dice_name,
        active: damage_armor,
        add_mod: false,
        isCreature,
      });
    }
  };

  return (
    <Container>
      <Value
        onClick={handleActiveRoll}
        className="dice-icon-hover button-hover"
      >
        {Math.max(active.value + modValue, 1)}
        <ActiveValue>{active_name.toUpperCase()}</ActiveValue>
      </Value>
      <Row>
        <Modifier
          onClick={handleSubValue}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddValue();
          }}
          className="mouse-icon-hover button-hover"
        >
          {modValue}
        </Modifier>
        {isAttackActive(active) ? (
          <>
            {active.dice1 !== 0 && (
              <Dice
                className="button-hover"
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
            )}
            {active.dice2_name !== "Knuckles" && active.dice2 !== 0 && (
              <Dice
                className="button-hover"
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
            className="button-hover"
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
