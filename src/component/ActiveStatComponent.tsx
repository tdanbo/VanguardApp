import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMinus,
  faPlus,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { toTitleCase } from "../functions/UtilityFunctions";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2px;
`;

interface DivProps {
  height: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-direction: row;
  border 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: ${(props) => props.height};
  height: ${(props) => props.height};
`;

const Value = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
  width: 50%;
`;

const ActiveValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  letter-spacing: 1px;
  width: 50%;
`;

const Modifier = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 50%;
  letter-spacing: 5px;
`;

type DiceProps = {
  color: string;
};

const Dice = styled.button<DiceProps>`
  display: flex;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
  padding-top: 5px;
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  max-width: 30px;
`;

const DiceIcon = styled.button<DiceProps>`
  display: flex;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
  padding-top: 5px;
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  max-width: 30px;
  width: 30px;
`;

const Plus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
`;

const Minus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
`;

interface Props {
  active_name: ActiveKey;
  active: AttackActive | DefenseActive | SimpleActive;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
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

function ActiveStatComponent({
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
    active_id?: string,
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
      item_id: active_id,
    });
  };

  const handleRangeRoll = (
    dice: number,
    dice_name: string,
    dice_mod: number,
    damage_armor: string,
    active_id: string,
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
    const { main, off } = character.equipment;
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
        item_id: active_id,
      });
    }
  };

  return (
    <Container>
      <Row height={"70%"} className="button-hover">
        {isAttackActive(active) ? (
          <>
            {(active.dice2_name !== "Knuckles" && active.dice2 !== 0 && (
              <DiceIcon
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
                        active.equip2_id,
                      )
                    : handleDiceRoll(
                        active.dice2,
                        active.dice2_name,
                        active.dice2_mod,
                        "Damage",
                        active.equip2_id,
                      );
                }}
                color={Constants.TYPE_COLORS[active_name]}
              >
                d{active.dice2}
                {active.dice2_mod > 0 ? `+${active.dice2_mod}` : null}
              </DiceIcon>
            )) || <DiceIcon color={Constants.TYPE_COLORS[active_name]} />}
          </>
        ) : (
          <DiceIcon color={Constants.TYPE_COLORS[active_name]} />
        )}
        <Value onClick={handleActiveRoll} className="dice-icon-hover">
          {Math.max(active.value + modValue, 1)}
          <ActiveValue>{toTitleCase(active_name)}</ActiveValue>
        </Value>
        {isAttackActive(active) ? (
          <>
            {active.dice1 !== 0 && (
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
                        active.equip1_id,
                      )
                    : handleDiceRoll(
                        active.dice1,
                        active.dice1_name,
                        active.dice1_mod,
                        "Damage",
                        active.equip1_id,
                      );
                }}
                color={Constants.TYPE_COLORS[active_name]}
              >
                d{active.dice1}
                {active.dice1_mod > 0 ? `+${active.dice1_mod}` : null}
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
                active.equip_id,
              );
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            d{active.dice}
            {active.dice_mod > 0 ? `+${active.dice_mod}` : null}
          </Dice>
        ) : active_name === "casting" ? (
          <Dice
            onClick={() => {
              handleDiceRoll(4, "Corruption", 0, "Casting");
            }}
            color={Constants.TYPE_COLORS[active_name]}
          >
            <FontAwesomeIcon
              icon={faSkull}
              style={{
                filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
              }}
            />
          </Dice>
        ) : (
          <Dice color={Constants.TYPE_COLORS[active_name]}>
            <FontAwesomeIcon
              icon={faEye}
              color={Constants.TYPE_COLORS[active_name]}
            />
          </Dice>
        )}
      </Row>
      <Row height={"30%"}>
        <Minus className="button-hover" onClick={handleSubValue}>
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Minus>
        <Modifier className="mouse-icon-hover">
          {modValue > 0 ? "+" : ""}
          {modValue}
        </Modifier>
        <Plus className="button-hover" onClick={handleAddValue}>
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Plus>
      </Row>
    </Container>
  );
}

export default ActiveStatComponent;
