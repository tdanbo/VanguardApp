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
  inactive?: boolean;
};

const dice_size = "25px";

type RollContainerProps = {
  dice_icon: string;
  dice_size: string;
  color: string;
  inactive: boolean;
};

const RollContainer = styled.div<RollContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.dice_size}; // Use props.dice_size
  height: ${(props) => props.dice_size}; // Use props.dice_size
  font-weight: bold;
  font-size: 16px;
  color: ${(props) =>
    props.inactive ? props.color : Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-align: center;
  background-image: url(${(props) => props.dice_icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${(props) => props.dice_size}; // Use props.dice_size once
  text-shadow: ${(props) =>
    props.inactive ? "1px 1px 2px black" : "0px 0px 0px transparent;"};
`;

function Durability(
  character: CharacterEntry,
  item: ItemEntry,
  combat_entry: CombatEntry,
) {
  if (
    (combat_entry.roll_type === "damage" ||
      combat_entry.roll_type === "armor") &&
    combat_entry.roll_entry.roll === 1
  )
    SetDurability(character, item.id);
}

function HasAmmunition(character: CharacterEntry) {
  for (const i of character.inventory) {
    if (
      i.category === "ammunition" &&
      i.equip.equipped &&
      i.quantity.count > 0
    ) {
      i.quantity.count -= 1;
      return true;
    }
  }
  return false;
}

function Ammunition(character: CharacterEntry, item: ItemEntry) {
  if (item.category === "ranged") {
    if (HasAmmunition(character)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

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
  inactive = true,
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

    if (item) {
      if (!Ammunition(character, item)) {
        return;
      }
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

    if (item) {
      Durability(character, item, NewCombatEntry);
    }

    session.combatlog.push(NewCombatEntry);
    session.combatlog = session.combatlog.slice(-20);

    update_session(session, character, isCreature, websocket);
  };

  return (
    <RollContainer
      dice_icon={dice_icon}
      dice_size={dice_size}
      color={color}
      title={`Roll d${dice}`}
      onClick={() => RollDIce()}
      inactive={inactive}
    >
      d{dice}
      {dice_mod > 0 ? `+${dice_mod}` : null}
    </RollContainer>
  );
}

export default RollComponent;
