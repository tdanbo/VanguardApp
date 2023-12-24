import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../../Constants";
import Icon from "@mdi/react";
import {
  Ability,
  AbilityEntry,
  CharacterEntry,
  SessionEntry,
} from "../../Types";
import { useRoll } from "../../functions/CombatFunctions";

import { faChevronRight, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../../functions/SessionsFunctions";
import { ExceptionalStats } from "../../functions/rules/ExceptionalStats";
import { StyledText } from "../../functions/UtilityFunctions";
import {
  mdiRomanNumeral1,
  mdiRomanNumeral2,
  mdiRomanNumeral3,
  mdiSword,
} from "@mdi/js";
interface LevelComponentProps {
  level: string;
  ability: AbilityEntry;
  ability_level: Ability;
  type: string;
  radius: string;
}

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

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  margin-left: 5px;
`;

const LevelSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
  gap: 2px;
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
  color: ${Constants.WIDGET_SECONDARY_FONT};
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
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-bottom: 5px;
`;

const CorruptionButten = styled.div`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: rgba(25, 25, 25, 1);
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  justify-content: center;
  align-items: center;
  align-items: right;
  font-weight: bold;
  width: 40px;
  font-size: 14px;
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
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_SECONDARY_FONT};
  font-size: 15px;
  font-weight: bold;
`;

const AbilityDetail = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const LevelSelection = styled.div<LevelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid #3d3d3c;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 12px;
  width: 40px;
  cursor: pointer;
`;

const AbilityDescription = styled.div`
  align-items: center;
  padding: 10px;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
`;

const RollButton = styled.div<LevelProps>`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  justify-content: center;
  align-items: center;
  align-items: right;
  font-weight: bold;
  width: 40px;
  font-size: 14px;
`;

interface AbilityEntryItemProps {
  ability: AbilityEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function AbilityEntryItem({
  ability,
  browser,
  setInventoryState,
  character,
  session,
  websocket,
  isCreature,
}: AbilityEntryItemProps) {
  const [abilityLevel, setAbilityLevel] = useState<string>(ability.level);

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

  useEffect(() => {
    if (browser) {
      if (ability.master.description !== "") {
        setAbilityLevel("Master");
      } else if (ability.adept.description !== "") {
        setAbilityLevel("Adept");
      } else if (ability.novice.description !== "") {
        setAbilityLevel("Novice");
      } else {
        setAbilityLevel("Novice");
      }
    }
  });

  const [expanded, setExpanded] = useState<boolean>(false);

  const AddAbilitySlot = () => {
    const abilityWithId = {
      ...ability,
      id: generateRandomId(),
    };

    character.abilities.push(abilityWithId);

    const update_stats = ExceptionalStats({
      character: character,
      state: "add",
      ability: abilityWithId,
      level: abilityWithId.level,
      originalLevel: ability.level,
    });

    character.stats = update_stats.stats;
    update_session(session, character, isCreature, websocket);
    if (setInventoryState) {
      setInventoryState(2);
    }
  };

  const DeleteAbilitySlot = (ability: AbilityEntry) => {
    const ability_id = ability.id;
    const new_abilities = character.abilities.filter(
      (item) => item.id !== ability_id,
    );

    character.abilities = new_abilities;

    const update_stats = ExceptionalStats({
      character: character,
      state: "sub",
      ability: ability,
      level: ability.level,
      originalLevel: ability.level,
    });

    character.stats = update_stats.stats;

    update_session(session, character, isCreature, websocket);
  };

  interface LevelSelectorProps {
    ability: AbilityEntry;
  }

  const LevelSelector = ({ ability }: LevelSelectorProps) => {
    type Level = "Novice" | "Adept" | "Master";

    const levels: Level[] = ["Novice", "Adept", "Master"];

    const handleLevelChange = () => {
      const currentIndex = levels.indexOf(abilityLevel as Level);
      const nextIndex = (currentIndex + 1) % levels.length;
      const nextLevel = levels[nextIndex];

      setAbilityLevel(nextLevel);

      const id = ability.id;

      const abilities = character.abilities.map((ability) => {
        if (ability.id === id) {
          return {
            ...ability,
            level: nextLevel,
          };
        } else {
          return ability;
        }
      });
      character.abilities = abilities;

      const update_stats = ExceptionalStats({
        character: character,
        state: "change",
        ability: ability,
        level: nextLevel,
        originalLevel: ability.level,
      });

      character.stats = update_stats.stats;

      update_session(session, character, isCreature, websocket);
    };

    const levelIcons: Record<Level, any> = {
      Novice: mdiRomanNumeral1,
      Adept: mdiRomanNumeral2,
      Master: mdiRomanNumeral3,
    };

    const isActive = (level: Level) => {
      const currentIndex = levels.indexOf(abilityLevel as Level);
      const levelIndex = levels.indexOf(level);
      return levelIndex <= currentIndex;
    };

    return (
      <LevelSelection
        className={"button-hover"}
        type={ability.type}
        $active={isActive(abilityLevel as Level)}
        onClick={handleLevelChange}
      >
        <Icon
          path={levelIcons[abilityLevel as Level]}
          size={1.0}
          color={Constants.WIDGET_PRIMARY_FONT}
        />
      </LevelSelection>
    );
  };

  return (
    <BaseContainer>
      <Container>
        <ExpandButten
          className={"button-hover"}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          {expanded ? "-" : "+"}
        </ExpandButten>
        <NameContainer>
          <AbilityName type={ability.type} $active={true}>
            {ability.name}
          </AbilityName>
          <AbilityDetail>
            {ability.tradition === ""
              ? ability.type
              : `${ability.type}, ${ability.tradition}`}
          </AbilityDetail>
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
          <AddButton
            className={"button-hover"}
            onClick={() => DeleteAbilitySlot(ability)}
          >
            x
          </AddButton>
        )}
      </Container>
      <LevelContainer $expanded={expanded}>
        {ability.novice.description !== "" && abilityLevel === "Novice" && (
          <LevelComponent
            effect={ability.novice.description}
            radius={Constants.BORDER_RADIUS}
          />
        )}

        {ability.adept.description !== "" && abilityLevel === "Adept" && (
          <>
            <LevelComponent
              effect={ability.novice.description}
              radius={"0px"}
            />
            <LevelComponent
              effect={ability.adept.description}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}

        {ability.master.description !== "" && abilityLevel === "Master" && (
          <>
            <LevelComponent
              effect={ability.novice.description}
              radius={"0px"}
            />
            <LevelComponent effect={ability.adept.description} radius={"0px"} />
            <LevelComponent
              effect={ability.master.description}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}
      </LevelContainer>
    </BaseContainer>
  );
}

export default AbilityEntryItem;
