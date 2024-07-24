import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiSleep } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import { GetBurnRate } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import "../Styles.css";
import { CharacterEntry, CombatEntry, SessionEntry } from "../Types";
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
    if (character.rations >= burnrate) {
      character.rations -= burnrate;

      character.effects = character.effects.filter(
        (effect) => effect.name !== "Starving",
      );

      character.health.energy = Constants.MAX_ENERGY;

      const sleeping_log: CombatEntry = {
        character: character,
        roll_type: "eating",
        roll_source: "Eating",
        roll_state: "normal",
        roll_entry: {
          result1: 0,
          result2: 0,
          roll1: 0,
          roll2: 0,
          critical: { state: 1, result: 0 },
          mod: 0,
          target: 0,
          success: true,
          dice: [0],
        },
        durability: [],
        uuid: uuidv4(),
        entry: "CombatEntry",
      };

      session.combatlog.push(sleeping_log);
      session.combatlog = session.combatlog.slice(-20);

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
      roll_state: "normal",
      roll_entry: {
        result1: 0,
        result2: 0,
        roll1: 0,
        roll2: 0,
        critical: { state: 1, result: 0 },
        mod: 0,
        target: 0,
        success: true,
        dice: [0],
      },
      durability: [],
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    session.combatlog.push(sleeping_log);
    session.combatlog = session.combatlog.slice(-20);

    update_session(session, websocket, character, isCreature);
  };

  return (
    <>
      <div
        className="button bg--primary-4 border"
        style={{
          fontSize: "15px",
          color: Constants.WIDGET_PRIMARY_FONT,
          maxWidth: "50px",
        }}
        title="Rest"
        onClick={HandleSleep}
      >
        <Icon path={mdiSleep} size={0.9} />
      </div>
      {character.rations < GetBurnRate(character) ? (
        <div
          className="button bg--primary-2 font--primary-4 border"
          title="You don't have enough rations to eat equal to your consumption, and can't refresh your energy levels."
          onClick={HandleEat}
        >
          <FontAwesomeIcon icon={faUtensils} />
        </div>
      ) : (
        <div
          className="button bg--primary-4 border"
          title="Will eat rations equal to your consumption, and refresh your energy levels."
          onClick={HandleEat}
        >
          <FontAwesomeIcon icon={faUtensils} />
        </div>
      )}
    </>
  );
}
