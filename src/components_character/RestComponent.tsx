import "../layout.css";
import { SessionEntry, CharacterEntry, CombatEntry } from "../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import { GetBurnRate } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Icon from "@mdi/react";
import { mdiSleep } from "@mdi/js";
interface DayComponentProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

export default function RestComponent({
  session,
  character,
  websocket,
  isCreature,
}: DayComponentProps) {
  const HandleEat = () => {
    const burnrate = GetBurnRate(character);
    if (
      character.rations.food >= burnrate &&
      character.rations.water >= burnrate
    ) {
      character.rations.food -= burnrate;
      character.rations.water -= burnrate;

      character.effects = character.effects.filter(
        (effect) => effect.name !== "Exhausted",
      );

      character.health.energy = Constants.MAX_ENERGY;

      const sleeping_log: CombatEntry = {
        character: character,
        roll_type: "eating",
        roll_source: "Eating",
        roll_state: "",
        roll_entry: {
          result1: 0,
          result2: 0,
          roll1: 0,
          roll2: 0,
          advantage: "",
          critical: { state: 1, result: 0 },
          mod: 0,
          target: 0,
          success: true,
          dice: 0,
        },
        durability: [],
        uuid: uuidv4(),
        entry: "CombatEntry",
      };

      session.combatlog.push(sleeping_log);

      update_session(session, websocket, character, isCreature);
    }
  };

  const HandleSleep = () => {
    if (character.health.damage > 0) {
      character.health.damage -= 1;
    }
    character.health.shield = 0;

    const sleeping_log: CombatEntry = {
      character: character,
      roll_type: "sleeping",
      roll_source: "Sleeping",
      roll_state: "",
      roll_entry: {
        result1: 0,
        result2: 0,
        roll1: 0,
        roll2: 0,
        advantage: "",
        critical: { state: 1, result: 0 },
        mod: 0,
        target: 0,
        success: true,
        dice: 0,
      },
      durability: [],
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    session.combatlog.push(sleeping_log);
    update_session(session, websocket, character, isCreature);
  };

  return (
    <div className="row">
      <div
        className="row button_color button"
        style={{ fontSize: "15px", color: Constants.WIDGET_PRIMARY_FONT }}
        title="Rest"
        onClick={HandleSleep}
      >
        <Icon path={mdiSleep} size={0.9} />
      </div>
      {character.rations.food < GetBurnRate(character) ||
      character.rations.water < GetBurnRate(character) ? (
        <div
          className="row button_color button"
          style={{
            fontSize: "15px",
            color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
          }}
          title="You don't have enough rations to eat equal to your consumption, and can't refresh your energy levels."
          onClick={HandleEat}
        >
          <FontAwesomeIcon icon={faUtensils} />
        </div>
      ) : (
        <div
          className="row button_color button"
          style={{ fontSize: "15px" }}
          title="Will eat rations equal to your consumption, and refresh your energy levels."
          onClick={HandleEat}
        >
          <FontAwesomeIcon icon={faUtensils} />
        </div>
      )}
    </div>
  );
}
