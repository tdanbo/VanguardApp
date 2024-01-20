import styled from "styled-components";
import {
  Dice10FillIcon,
  Dice12FillIcon,
  Dice20FillIcon,
  Dice4FillIcon,
  Dice6FillIcon,
  Dice8FillIcon,
} from "../Images";

import * as Constants from "../Constants";
import {
  RollEntry,
  RollTypeEntry,
  CombatEntry,
  SessionEntry,
  CharacterEntry,
  ItemEntry,
} from "../Types";
import { v4 as uuidv4 } from "uuid";
import { SetDurability } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";

type RollComponentProps = {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  roll_type: RollTypeEntry;
  roll_source: string;
  dice: number;
  dice_mod?: number;
  color?: string;
  target?: number;
  item?: ItemEntry;
  isCreature: boolean;
};

type RollContainerProps = {
  dice_icon: string;
  dice_size: string;
  color: string;
};

const dice_size = "25px";

const RollContainer = styled.div<RollContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${dice_size};
  height: ${dice_size};
  font-weight: bold;
  font-size: 16px;
  color: ${(props) => props.color};
  text-align: center; /* Center text horizontally */
  background-image: url(${(props) => props.dice_icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${dice_size};
  text-shadow: 1px 1px 2px black;
`;

function RollComponent({
  roll_type,
  roll_source,
  dice,
  dice_mod = 0,
  color = Constants.WIDGET_SECONDARY_FONT,
  target = 0,
  session,
  character,
  websocket,
  isCreature,
  item,
}: RollComponentProps) {
  let dice_icon = Dice20FillIcon;
  if (dice === 4) {
    dice_icon = Dice4FillIcon;
  } else if (dice === 6) {
    dice_icon = Dice6FillIcon;
  } else if (dice === 8) {
    dice_icon = Dice8FillIcon;
  } else if (dice === 10) {
    dice_icon = Dice10FillIcon;
  } else if (dice === 12) {
    dice_icon = Dice12FillIcon;
  } else if (dice === 20) {
    dice_icon = Dice20FillIcon;
  } else if (dice === 100) {
    dice_icon = Dice20FillIcon;
  }

  const RollDIce = () => {
    let roll = Math.floor(Math.random() * dice) + 1;
    let result = roll;
    if (roll_source !== "Skill Test") {
      result += dice_mod;
    }

    let success = true;
    if (target !== 0 && result > target) {
      success = false;
    }

    const roll_entry: RollEntry = {
      result: result,
      roll: roll,
      mod: dice_mod,
      target: target,
      success: success,
      dice: dice,
    };

    const NewCombatEntry: CombatEntry = {
      character,
      roll_type, // Damage, Armor, Accurate etc
      roll_source, // Short Sword, Medium Armor, Skill Test,
      roll_entry,
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    console.log("COMBAT LOG");
    console.log(session);
    console.log(session.combatlog);

    session.combatlog.push(NewCombatEntry);
    session.combatlog = session.combatlog.slice(-20);

    if (
      item &&
      (roll_type === "damage" || roll_type === "armor") &&
      roll_entry.roll == 1
    ) {
      SetDurability(character, item.id);
    }
    update_session(session, character, isCreature, websocket);
  };

  return (
    <RollContainer
      dice_icon={dice_icon}
      dice_size={dice_size}
      color={color}
      title={`Roll d${dice}`}
      onClick={() => RollDIce()}
    >
      d{dice}
      {dice_mod > 0 ? `+${dice_mod}` : null}
    </RollContainer>
  );
}

export default RollComponent;
