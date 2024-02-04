import styled from "styled-components";
import {
  Dice10FillIcon,
  Dice12FillIcon,
  Dice20FillIcon,
  Dice4FillIcon,
  Dice6FillIcon,
  Dice8FillIcon,
} from "../Images";
import { IsArmor, IsWeapon } from "../functions/UtilityFunctions";

import { random } from "lodash";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  CombatEntry,
  CriticalType,
  DurabilityEntry,
  ItemEntry,
  RollEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { SetDurability } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";

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
  setModValue?: React.Dispatch<React.SetStateAction<number>>;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
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

function PickRandomWeapon(character: CharacterEntry) {
  const weapon_list = character.inventory.filter(
    (item) =>
      (IsWeapon(item) || item.category === "shield") && item.equip.equipped,
  );

  if (weapon_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * weapon_list.length);

  return weapon_list[randomIndex];
}

function PickRandomArmor(character: CharacterEntry) {
  const armor_list = character.inventory.filter(
    (armor) => IsArmor(armor) && armor.equip.equipped,
  );

  if (armor_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * armor_list.length);

  return armor_list[randomIndex];
}

function HasAmmunition(character: CharacterEntry) {
  for (const i of character.inventory) {
    if (
      i.category === "projectile" &&
      i.equip.equipped &&
      i.quantity.count > 0
    ) {
      i.quantity.count -= 1;
      return true;
    }
  }
  return false;
}

function HasRangedWeapon(character: CharacterEntry) {
  for (const i of character.inventory) {
    if (i.category === "ranged weapon" && i.equip.equipped) {
      return true;
    }
  }
  return false;
}

function Ammunition(character: CharacterEntry) {
  if (HasAmmunition(character)) {
    return true;
  } else {
    return false;
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
  inactive = true,
  setModValue,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
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
    // let roll = Math.floor(Math.random() * dice) + 1;

    let roll1 = random(1, dice);
    let roll2 = random(1, dice);

    const critical_type: CriticalType = {
      state: 1,
      result: random(1, 6),
    };

    let result1 = roll1;
    let result2 = roll2;

    let roll_state = activeState;

    if (roll_source !== "Skill Test") {
      result1 += dice_mod;
      result2 += dice_mod;
    }

    let success = false;

    if (activeState === "full" && (result1 <= target || result2 <= target)) {
      success = true;
      if (roll1 === 1 || roll2 === 1) {
        critical_type.state = 2;
      }
    } else if (
      activeState === "weak" &&
      (result1 > target || result2 > target)
    ) {
      success = false;
      if (roll1 === 20 || roll2 === 20) {
        critical_type.state = 0;
      }
    } else if (result1 <= target) {
      console.log("NORMAL SUCCESS");
      success = true;
      if (roll1 === 1) {
        critical_type.state = 2;
      }
    } else {
      console.log("NORMAL FAILURE");
      success = false;
      if (roll1 === 20) {
        critical_type.state = 0;
      }
    }

    // let success = true;
    // if (target !== 0 && result > target) {
    //   success = false;
    // }

    console.log(roll_source);

    if (roll_type === "attack" && HasRangedWeapon(character)) {
      if (!Ammunition(character)) {
        return;
      }
    }

    const roll_entry: RollEntry = {
      result1: result1,
      result2: result2,
      roll1: roll1,
      roll2: roll2,
      critical: critical_type,
      advantage: advantage,
      mod: dice_mod,
      target: target,
      success: success,
      dice: dice,
    };

    const durability_item: DurabilityEntry = {
      name: "",
      check: random(1, 4),
    };

    let random_item: null | ItemEntry = null;
    if (roll_type === "attack" && !success && durability_item.check === 4) {
      random_item = PickRandomWeapon(character);
    } else if (
      roll_type === "defense" &&
      !success &&
      durability_item.check === 4
    ) {
      random_item = PickRandomArmor(character);
    }

    if (random_item) {
      SetDurability(character, random_item.id);
      durability_item.name = random_item.name;
    }

    const NewCombatEntry: CombatEntry = {
      character,
      roll_type,
      roll_source, // Short Sword, Medium Armor, Skill Test,
      roll_state,
      roll_entry,
      uuid: uuidv4(),
      entry: "CombatEntry",
      durability: durability_item,
    };

    session.combatlog.push(NewCombatEntry);
    session.combatlog = session.combatlog.slice(-20);

    if (setModValue) {
      if (!["attack", "defense", "casting", "sneaking"].includes(roll_type))
        setModValue(0);
    }

    setActiveState("");
    setAdvantage("");

    update_session(session, websocket, character, isCreature);
  };

  const is_possible =
    (advantage === "flanked" &&
      (roll_type === "defense" || roll_type === "armor")) ||
    (advantage === "flanking" &&
      (roll_type === "attack" || roll_type === "damage")) ||
    advantage === "";

  if (!is_possible) {
    inactive = false;
  }

  return (
    <RollContainer
      dice_icon={dice_icon}
      dice_size={dice_size}
      color={color}
      title={`Roll d${dice}`}
      onClick={is_possible ? () => RollDIce() : () => {}}
      inactive={inactive}
    >
      d{dice}
      {dice_mod > 0 && roll_source !== "Skill Test" ? `+${dice_mod}` : null}
      {activeState === "full" ? (
        <FontAwesomeIcon
          icon={faAnglesUp}
          color={Constants.WIDGET_PRIMARY_FONT}
          style={{ marginLeft: "5px", fontSize: "15px" }}
        />
      ) : activeState === "weak" ? (
        <FontAwesomeIcon
          icon={faAnglesDown}
          color={Constants.WIDGET_PRIMARY_FONT}
          style={{ marginLeft: "5px", fontSize: "15px" }}
        />
      ) : null}
    </RollContainer>
  );
}

export default RollComponent;
