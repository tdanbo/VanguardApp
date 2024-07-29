import { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";

import { toTitleCase } from "../functions/UtilityFunctions";
import {
  CharacterEntry,
  EffectEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

import { faBars, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText } from "../functions/UtilityFunctions";
import LevelComponent from "./LevelComponent";

interface ContainerProps {
  radius: string;
}

const LevelBaseContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom-left-radius: ${(props) => props.radius};
  border-bottom-right-radius: ${(props) => props.radius};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

interface LevelContainerProps {
  $expanded: boolean;
}

const LevelContainer = styled.div<LevelContainerProps>`
  display: ${(props) => (props.$expanded ? "flex" : "none")};
  flex-direction: column;
`;

const AbilityDescription = styled.div`
  align-items: center;
  padding: 10px;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
`;

interface EffectEntryItemProps {
  effect: EffectEntry;
  browser: boolean;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;

  state: ItemStateType;
  setInventoryState?: (inventoryState: number) => void;
}

function EffectEntryItem({
  effect,
  state,
  setInventoryState,
  character,
  session,
  websocket,
  isCreature,
}: EffectEntryItemProps) {
  interface LevelProps {
    effect: string;
    radius: string;
  }
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const LevelDescriptionComponent = ({ effect, radius }: LevelProps) => {
    return (
      <LevelBaseContainer radius={radius}>
        <AbilityDescription>
          <StyledText
            effect={effect}
            websocket={websocket}
            character={character}
            session={session}
            isCreature={isCreature}
          />
        </AbilityDescription>
      </LevelBaseContainer>
    );
  };

  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const [expanded, setExpanded] = useState<boolean>(false);

  const AddAbilitySlot = () => {
    const abilityWithId = {
      ...effect,
      id: generateRandomId(),
    };

    character.effects.push(abilityWithId);

    update_session(session, websocket, character, isCreature);
    if (setInventoryState) {
      setInventoryState(2);
    }
  };

  const DeleteAbilitySlot = (effect: EffectEntry) => {
    const ability_id = effect.id;
    const new_effects = character.effects.filter(
      (item) => item.id !== ability_id,
    );

    if (effect.name === "Starving") {
      character.health.energy = 0;
    }

    character.effects = new_effects;

    // TODO: There used to be a sub traction functions for exceptional stats. But i dont think it is used.

    update_session(session, websocket, character, isCreature);
  };

  return (
    <div className="column bg--primary-1 border">
      <div className="row row--card bg--primary-2 padding--small ">
        <div
          className="button border-radius--left bg--primary-3"
          style={{ minWidth: "25px", maxWidth: "25px" }}
        />
        <div className="vertical-divider bg--primary-1" />
        <div
          className="column gap--none padding--medium"
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="row font--bold font--primary-2"
            style={{ justifyContent: "flex-start" }}
          >
            {effect.name}
          </div>
          <div
            className="row font--primary-3 font--size-tiny gap--small"
            style={{ justifyContent: "flex-start" }}
          >
            {toTitleCase(effect.static.category)}
          </div>
        </div>
        <LevelComponent
          ability={effect}
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
        />
        <div className="vertical-divider bg--primary-1" />
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
        <div className="vertical-divider bg--primary-1" />
        <div
          className="button bg--primary-3 border-radius--right"
          style={{
            minWidth: "25px",
            maxWidth: "25px",
            color:
              expanded || isHovered
                ? Constants.WIDGET_SECONDARY_FONT
                : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
          }}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <FontAwesomeIcon icon={faBars} size="sm" />
        </div>
      </div>
      <LevelContainer $expanded={expanded}>
        <LevelDescriptionComponent
          effect={effect.static.description}
          radius={Constants.BORDER_RADIUS}
        />
      </LevelContainer>
    </div>
  );
}

export default EffectEntryItem;
