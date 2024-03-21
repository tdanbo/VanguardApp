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
  gap: 5px;
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
  margin-top: 5px;
  margin-bottom: 5px;
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

interface LevelSelectionProps {
  type: string;
}

const LevelSelection = styled.div<LevelSelectionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${(props) => EntryColor(props.type)};
  border: 1px solid #3d3d3c;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 12px;
  width: 40px;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  font-size: 14px;
  user-select: none;
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
  ability: EffectEntry;
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
  ability,
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
  const [abilityLevel, setAbilityLevel] = useState<number>(1);
  useEffect(() => {
    setAbilityLevel(ability.level);
  });

  interface LevelProps {
    effect: string;
    radius: string;
  }

  const LevelComponent = ({ effect, radius }: LevelProps) => {
    return (
      <LevelBaseContainer radius={radius}>
        <AbilityDescription>
          <StyledText
            entry={ability}
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
      ...ability,
      id: generateRandomId(),
    };

    character.effects.push(abilityWithId);

    update_session(session, websocket, character, isCreature);
    if (setInventoryState) {
      setInventoryState(2);
    }
  };

  const DeleteAbilitySlot = (ability: EffectEntry) => {
    const ability_id = ability.id;
    const new_effects = character.effects.filter(
      (item) => item.id !== ability_id,
    );

    character.effects = new_effects;

    // TODO: There used to be a sub traction functions for exceptional stats. But i dont think it is used.

    update_session(session, websocket, character, isCreature);
  };

  interface LevelSelectorProps {
    ability: EffectEntry;
  }

  const LevelSelector = ({ ability }: LevelSelectorProps) => {
    const handleLevelChange = (add: boolean) => {
      let nextLevel = ability.level;
      if (add) {
        nextLevel = ability.level + 1;
      } else {
        nextLevel = ability.level - 1;
      }

      setAbilityLevel(nextLevel);

      const id = ability.id;

      const effects = character.effects.map((ability) => {
        if (ability.id === id) {
          return {
            ...ability,
            level: nextLevel,
          };
        } else {
          return ability;
        }
      });

      character.effects = effects;

      // TODO: There used to be a sub traction functions for exceptional stats. But i dont think it is used.

      update_session(session, websocket, character, isCreature);
    };

    return (
      <LevelSelection
        className={"button-hover"}
        type={ability.static.category}
        onClick={(e) => {
          e.preventDefault(); // Prevents the default action of the click event
          handleLevelChange(true);
        }}
        onContextMenu={(e) => {
          e.preventDefault(); // Prevents the browser's context menu from opening
          handleLevelChange(false);
        }}
      >
        {abilityLevel}
      </LevelSelection>
    );
  };

  return (
    <BaseContainer className="button-hover">
      <Container>
        <ExpandButten className={"button-hover"}></ExpandButten>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <AbilityName type={ability.static.category} $active={true}>
            {ability.name}
          </AbilityName>
          <AbilityDetail>{toTitleCase(ability.static.category)}</AbilityDetail>
        </NameContainer>
        <LevelSelectionContainer>
          <LevelSelector ability={ability} />
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
              onClick={() => DeleteAbilitySlot(ability)}
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
        <LevelComponent
          effect={ability.static.effect}
          radius={Constants.BORDER_RADIUS}
        />
      </LevelContainer>
    </BaseContainer>
  );
}

export default EffectEntryItem;
