import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { CharacterEntry, CombatEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { SetDurability } from "./RulesFunctions";
interface RollDiceProps {
  dice: number;
  active: string;
  source: string;
  modifier: number;
  count: number;
  target: number;
  add_mod: boolean;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  item_id?: string;
}

export function useRoll() {
  // const { sendRequest } = useWebSocket();

  return async ({
    dice,
    count,
    target,
    active,
    source,
    modifier,
    character,
    session,
    websocket,
    isCreature,
    item_id,
  }: RollDiceProps) => {
    let roll = 0;
    let total = 0;

    for (let i = 0; i < count; i++) {
      roll += Math.floor(Math.random() * dice) + 1;
    }

    if (source === "Skill Test") {
      total += roll;
    } else {
      total += modifier + roll;
    }

    const roll_result = total;

    let success = true;
    if (target === 0) {
      success = true;
    } else if (roll_result > target) {
      success = false;
    }

    // Durability

    const NewCombatEntry: CombatEntry = {
      id: session.id,
      portrait: character.portrait,
      character: character.name,
      source: source,
      active: active,
      dice: dice,
      result: roll_result,
      success: success,
      roll: roll,
      modifier: modifier,
      target: target,
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    session.combatlog.push(NewCombatEntry);
    session.combatlog = session.combatlog.slice(-20);

    if (
      item_id &&
      (active === "Damage" || active === "Armor") &&
      roll_result - modifier == 1
    ) {
      SetDurability(character, item_id);
    }

    console.log(active);

    update_session(session, character, isCreature, websocket);
    return roll_result;
  };
}
