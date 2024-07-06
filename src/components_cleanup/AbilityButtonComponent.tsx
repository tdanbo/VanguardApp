import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  SessionEntry,
  CharacterEntry,
  ItemStateType,
  AbilityEntry,
} from "../Types";

import { Socket } from "socket.io-client";

import { update_session } from "../functions/SessionsFunctions";
import { uniqueId } from "lodash";

interface ItemButtonComponent {
  state: ItemStateType;
  ability: AbilityEntry;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
}

function AbilityButtonComponent({
  state,
  ability,
  session,
  character,
  websocket,
  isCreature,
}: ItemButtonComponent) {
  const AddAbilitySlot = () => {
    const abilityWithId = {
      ...ability,
      id: uniqueId(),
    };

    character.abilities.push(abilityWithId);

    update_session(session, websocket, character, isCreature);
  };

  const DeleteAbilitySlot = (ability: AbilityEntry) => {
    const ability_id = ability.id;
    const new_abilities = character.abilities.filter(
      (item) => item.id !== ability_id,
    );

    character.abilities = new_abilities;

    update_session(session, websocket, character, isCreature);
  };
  return (
    <div
      className="faded_button"
      style={{
        maxWidth: "40px",
        minWidth: "40px",
      }}
      onClick={() => {
        state === "take" ? AddAbilitySlot() : DeleteAbilitySlot(ability);
      }}
    >
      <FontAwesomeIcon icon={state === "drop" ? faXmark : faPlus} size="sm" />
    </div>
  );
}

export default AbilityButtonComponent;
