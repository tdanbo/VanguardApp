import { Socket } from "socket.io-client";

import {
  CharacterEntry,
  EffectEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

import {
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";

import { EffectsIcons } from "../Effects";

interface EffectCompactEntryItemProps {
  effect: EffectEntry;
  browser: boolean;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;

  state: ItemStateType;
  setInventoryState?: (inventoryState: number) => void;
}

function EffectCompactEntryItem({
  effect,
  character,
  session,
  websocket,
  isCreature,
}: EffectCompactEntryItemProps) {
  const bonus =
    effect.static.base_amount + effect.static.level_amount * (effect.level - 1);

  const title = `${effect.name} Effect\n${effect.static.description} ${
    bonus > 0 ? `${bonus}.` : ""
  }`;

  const icon = EffectsIcons[effect.name]
    ? EffectsIcons[effect.name].icon
    : faQuestion;

  const SetActiveEffect = () => {
    const effect_id = effect.id;
    character.effects.find((effect) => {
      if (effect.id === effect_id) {
        effect.active = !effect.active;
      }
    });

    update_session(session, websocket, character, isCreature);
  };

  return (
    <div
      className={`column ${effect.active ? "bg--primary-5" : "bg--primary-1"}`}
      onClick={() => SetActiveEffect()}
      style={{ gap: "2px" }}
      title={title}
    >
      <span style={{ fontSize: "15px" }}>
        <FontAwesomeIcon icon={icon} />
      </span>
      {effect.static.category === "effect" ? (
        <span
          className="font--size-medium font--primary-3"
          style={{ marginRight: "8px" }}
        >
          {effect.level >= 0 ? "+" : ""}
          {effect.level}
        </span>
      ) : null}
      {/* <span className="font--primary-4" style={{ fontSize: "15px" }}>
        <FontAwesomeIcon icon={ResetIcon()} />
      </span> */}
      {/* <LevelComponent
        ability={effect}
        session={session}
        character={character}
        websocket={websocket}
        isCreature={isCreature}
      /> */}
      {/* <div className="vertical-divider bg--primary-1" />
        <div
          className="button bg--primary-3 font--primary-4 border-radius--none"
          onClick={() => {
            state === "take" ? AddAbilitySlot() : DeleteAbilitySlot(effect);
          }}
        >
          <FontAwesomeIcon
            icon={state === "drop" ? faXmark : faPlus}
            size="sm"
          />
        </div>
        <div className="vertical-divider bg--primary-1" /> */}
    </div>
  );
}

export default EffectCompactEntryItem;
