import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";

import { toTitleCase } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EffectEntry,
  SessionEntry,
} from "../Types";

import {
  faBars,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText } from "../functions/UtilityFunctions";
import LevelComponent from "./LevelComponent";

const EntryColor = (type: string) => {
  return Constants.TYPE_COLORS[type.toLowerCase()] || Constants.WIDGET_BORDER;
};

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 0px;
  min-height: 35px;
  max-height: 35px;
`;

interface ExpandedContainerProps {
  expanded: boolean;
}

const ExpandedContainer = styled.div<ExpandedContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};

  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;

  /* When expanded is true, always show the icon */
  ${({ expanded }) =>
    expanded &&
    `
    visibility: visible;
    opacity: 1;
  `}
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 5px;
  &:hover {
    ${ExpandedContainer} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const LevelSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
`;

const DeleteButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  &:hover {
    color: ${Constants.BRIGHT_RED};
  }
`;

const ExpandButten = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  padding-bottom: 5px;
  font-size: 12px;
`;

interface LevelContainerProps {
  $expanded: boolean;
}

const LevelContainer = styled.div<LevelContainerProps>`
  display: ${(props) => (props.$expanded ? "flex" : "none")};
  flex-direction: column;
`;

interface LevelProps {
  $active: boolean;
  type: string;
}

const AbilityName = styled.div<LevelProps>`
  align-items: flex;
  display: flex;
  flex-grow: 1;
  color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
  font-weight: bold;
`;

const AbilityDetail = styled.div`
  display: flex;
  flex-grow: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
`;

const AbilityDescription = styled.div`
  align-items: center;
  padding: 10px;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
`;

interface EffectEntryItemProps {
  effect: EffectEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function EffectEntryItem({
  effect,
  browser,
  setInventoryState,
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
}: EffectEntryItemProps) {
  const [_abilityLevel, setAbilityLevel] = useState<number>(1);
  useEffect(() => {
    setAbilityLevel(effect.level);
  });

  interface LevelProps {
    effect: string;
    radius: string;
  }

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

    character.effects = new_effects;

    // TODO: There used to be a sub traction functions for exceptional stats. But i dont think it is used.

    update_session(session, websocket, character, isCreature);
  };

  return (
    <BaseContainer className="button-hover">
      <Container>
        <ExpandButten className={"button-hover"}></ExpandButten>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <AbilityName type={effect.static.category} $active={true}>
            {effect.name}
          </AbilityName>
          <AbilityDetail>{toTitleCase(effect.static.category)}</AbilityDetail>
        </NameContainer>
        <LevelSelectionContainer>
          <LevelComponent
            ability={effect}
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </LevelSelectionContainer>
        {browser ? (
          <AddButton className={"button-hover"} onClick={AddAbilitySlot}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "12px" }}
            />
          </AddButton>
        ) : (
          <Column>
            <DeleteButton
              className={"button-hover"}
              onClick={() => DeleteAbilitySlot(effect)}
            >
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: "12px" }} />
            </DeleteButton>
            {expanded ? (
              <AddButton className={"button-hover"}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    fontSize: "12px",
                    color: Constants.WIDGET_SECONDARY_FONT,
                  }}
                />
              </AddButton>
            ) : (
              <AddButton className={"button-hover"}>
                <FontAwesomeIcon
                  icon={faBars}
                  style={{
                    fontSize: "12px",
                  }}
                />
              </AddButton>
            )}
          </Column>
        )}
      </Container>
      <LevelContainer $expanded={expanded}>
        <LevelDescriptionComponent
          effect={effect.static.effect}
          radius={Constants.BORDER_RADIUS}
        />
      </LevelContainer>
    </BaseContainer>
  );
}

export default EffectEntryItem;
