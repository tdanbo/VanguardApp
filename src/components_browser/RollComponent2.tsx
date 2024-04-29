import "../layout.css";

import Icon from "@mdi/react";
import { mdiShield, mdiSwordCross } from "@mdi/js";
import {
  GetDatabaseEquipment,
  IsArmor,
  IsWeapon,
} from "../functions/UtilityFunctions";

import { toTitleCase } from "../functions/UtilityFunctions";
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
import {
  faAnglesDown,
  faAnglesUp,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { GetGameData } from "../contexts/GameContent";

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

function PickRandomWeapon(character: CharacterEntry) {
  const weapon_list = [];

  for (const item of character.inventory) {
    if (
      (IsWeapon(item) || item.static.category === "shield") &&
      item.equipped
    ) {
      weapon_list.push(item);
    }
  }

  if (weapon_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * weapon_list.length);

  return weapon_list[randomIndex];
}

function PickRandomArmor(character: CharacterEntry, equipment: ItemEntry[]) {
  const armor_list = [];

  for (const item of character.inventory) {
    const item_database = GetDatabaseEquipment(item, equipment);
    if (IsArmor(item_database) && item.equipped) {
      armor_list.push(item);
    }
  }

  if (armor_list.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * armor_list.length);

  return armor_list[randomIndex];
}

function HasAmmunition(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (
      item.static.category === "projectile" &&
      item.equipped &&
      item.quantity > 0
    ) {
      item.quantity -= 1;
      return true;
    }
  }
  return false;
}

function HasRangedWeapon(character: CharacterEntry) {
  for (const item of character.inventory) {
    if (item.static.category === "ranged weapon" && item.equipped) {
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
  setModValue,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
}: RollComponentProps) {
  const { equipment } = GetGameData();

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
      } else if (roll1 === 20 && roll2 === 20) {
        critical_type.state = 0;
      }
    } else if (
      activeState === "weak" &&
      (result1 > target || result2 > target)
    ) {
      success = false;
      if (roll1 === 20 || roll2 === 20) {
        critical_type.state = 0;
      } else if (roll1 === 1 && roll2 === 1) {
        critical_type.state = 2;
      }
    } else if (result1 <= target) {
      success = true;
      if (roll1 === 1) {
        critical_type.state = 2;
      }
    } else {
      success = false;
      if (roll1 === 20) {
        critical_type.state = 0;
      }
    }

    // let success = true;
    // if (target !== 0 && result > target) {
    //   success = false;
    // }

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
      random_item = PickRandomArmor(character, equipment);
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
    console.log("RollComponent: advantage not possible", advantage, roll_type);
  }

  return (
    <div
      className="column button"
      style={{
        minWidth: "40px",
        maxWidth: "40px",
        borderLeft: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "0px",
        justifyContent: "center",
        gap: "0px",
      }}
      onClick={is_possible ? () => RollDIce() : () => {}}
      title={"Roll " + toTitleCase(roll_type)}
    >
      <div
        className="row"
        style={{
          color: Constants.WIDGET_SECONDARY_FONT,
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        d{dice}
        {dice_mod > 0 && roll_source !== "Skill Test" ? `+${dice_mod}` : null}
      </div>
      <div
        className="row"
        style={{
          color: "rgba(255, 255, 255, 0.2)",
          fontSize: "10px",
          gap: "3px",
        }}
      >
        {roll_type === "damage" ? (
          <Icon path={mdiSwordCross} size={0.6} color={Constants.COLOR_1} />
        ) : roll_type === "armor" ? (
          <Icon path={mdiShield} size={0.6} color={Constants.COLOR_2} />
        ) : roll_type === "ability" ||
          roll_type === "mystical power" ||
          roll_type === "utility" ||
          roll_type === "monsterous trait" ? (
          <FontAwesomeIcon
            icon={faStarOfLife}
            color={color}
            style={{ fontSize: "12px" }}
          />
        ) : (
          <Icon path={mdiSwordCross} size={0.6} color={Constants.COLOR_1} />
        )}
        {activeState === "full" ? (
          <FontAwesomeIcon
            icon={faAnglesUp}
            color={Constants.WIDGET_PRIMARY_FONT}
            style={{ fontSize: "14px" }}
          />
        ) : activeState === "weak" ? (
          <FontAwesomeIcon
            icon={faAnglesDown}
            color={Constants.WIDGET_PRIMARY_FONT}
            style={{ fontSize: "14px" }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default RollComponent;
