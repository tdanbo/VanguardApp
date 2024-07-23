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
  faShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
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
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            setCriticalState={setCriticalState}
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

    console.log(effect.name);

    if (effect.name === "Exhausted") {
      console.log("Resetting");
      character.health.energy = 0;
    }

    character.effects = new_effects;

    console.log(character.health.energy);

    // TODO: There used to be a sub traction functions for exceptional stats. But i dont think it is used.

    update_session(session, websocket, character, isCreature);
  };

  return (
    <div
      className="row row--card bg--primary-2 padding--small "
      style={{ maxWidth: "100px" }}
    >
      <div className="button border-radius--left bg--primary-3">
        <FontAwesomeIcon icon={faShield} size="lg" />
      </div>
      <LevelComponent
        ability={effect}
        session={session}
        character={character}
        websocket={websocket}
        isCreature={isCreature}
      />
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
