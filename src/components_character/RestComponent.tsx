import "../layout.css";
import { SessionEntry, CharacterEntry, CombatEntry } from "../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTent } from "@fortawesome/free-solid-svg-icons";
import { SetStatusBackward, toTitleCase } from "../functions/UtilityFunctions";
import * as Constants from "../Constants";
import { GetBurnRate } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { RemoveExhaustion } from "../functions/UtilityFunctions";
import { SetStatusForward } from "../functions/UtilityFunctions";
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
  const HandleRest = () => {
    const burnrate = GetBurnRate(character);
    if (
      character.rations.food >= burnrate &&
      character.rations.water >= burnrate
    ) {
      character.rations.food -= burnrate;
      character.rations.water -= burnrate;
      if (character.health.damage > 0) {
        character.health.damage -= 1;
      }
      character.health.shield = 0;
      character.health.status = "resting";
    }

    const resting_combat: CombatEntry = {
      character: character,
      roll_type: "resting",
      roll_source: "Resting",
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
      durability: { name: "", check: 0 },
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    session.combatlog.push(resting_combat);

    RemoveExhaustion(character);
    update_session(session, websocket, character, isCreature);
  };

  const BackwardStatus = () => {
    SetStatusBackward(character);
    update_session(session, websocket, character, isCreature);
  };

  const ForwardStatus = () => {
    SetStatusForward(character);
    update_session(session, websocket, character, isCreature);
  };

  return (
    <div className="row">
      <div className="row base_color">
        <div
          className="row button"
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            color: Constants.TYPE_COLORS[character.health.status],
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
          onClick={ForwardStatus}
          onContextMenu={(e) => {
            e.preventDefault();
            BackwardStatus();
          }}
          title={"Rested | Normal | Tired | Fatigued | Exhausted"}
        >
          {toTitleCase(character.health.status)}
        </div>
        <div
          className="row"
          style={{
            backgroundColor: Constants.BACKGROUND,
            minWidth: "1px",
            maxWidth: "1px",
          }}
        />
        {character.rations.food < GetBurnRate(character) ||
        character.rations.water < GetBurnRate(character) ? (
          <div
            className="row"
            style={{
              fontSize: "15px",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
            title="Not Enough Rations"
          >
            <FontAwesomeIcon icon={faTent} />
          </div>
        ) : (
          <div
            className="row button"
            style={{ fontSize: "15px" }}
            title="Rest"
            onClick={HandleRest}
          >
            <FontAwesomeIcon icon={faTent} />
          </div>
        )}
      </div>
    </div>
  );
}
