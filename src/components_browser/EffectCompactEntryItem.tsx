import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";

import { toTitleCase } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EffectEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

import {
  faBars,
  faPlus,
  faQuestion,
  faShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText } from "../functions/UtilityFunctions";
import LevelComponent from "./LevelComponent";
import { EffectsIcons } from "../Effects";

interface ContainerProps {
  radius: string;
}

interface EffectCompactEntryItemProps {
  effect: EffectEntry;
  browser: boolean;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  state: ItemStateType;
  setInventoryState?: (inventoryState: number) => void;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

function EffectCompactEntryItem({
  effect,
  state,
  setInventoryState,
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCriticalState,
}: EffectCompactEntryItemProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
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

    character.effects.sort((a, b) => {
      if (a.active && !b.active) {
        return -1;
      } else if (!a.active && b.active) {
        return 1;
      } else {
        return 0;
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
      <span className="font--size-small font--primary-3">{effect.level}</span>
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
