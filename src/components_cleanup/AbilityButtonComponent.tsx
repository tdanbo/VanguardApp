import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  AbilityEntry,
  CharacterEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

import { Socket } from "socket.io-client";

import { update_session } from "../functions/SessionsFunctions";

function generateID(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

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
      id: generateID(),
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
    <>
      <div className="vertical-divider bg--primary-1" />
      <div
        className="button bg--primary-3 font--primary-4 border-radius--none"
        onClick={() => {
          state === "take" ? AddAbilitySlot() : DeleteAbilitySlot(ability);
        }}
      >
        <FontAwesomeIcon icon={state === "drop" ? faXmark : faPlus} size="sm" />
      </div>
    </>
  );
}

export default AbilityButtonComponent;
