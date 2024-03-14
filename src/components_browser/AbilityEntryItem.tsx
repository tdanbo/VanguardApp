import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import Icon from "@mdi/react";
import { toTitleCase } from "../functions/UtilityFunctions";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { CheckAbility } from "../functions/ActivesFunction";
import {
  faBars,
  faChevronRight,
  faXmark,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { update_session } from "../functions/SessionsFunctions";
import { ExceptionalStats } from "../functions/rules/ExceptionalStats";
import { StyledText } from "../functions/UtilityFunctions";
import { mdiRomanNumeral1, mdiRomanNumeral2, mdiRomanNumeral3 } from "@mdi/js";
import RollComponent from "../components_general/RollComponent";
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
`;

const CorruptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 0;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  gap: 2px;
  margin-left: 5px;
`;

interface RollBoxProps {
  color: string;
}

const RollBox = styled.div<RollBoxProps>`
  display: flex;
  color: ${(props) => props.color};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  gap: 15px;
  margin-right: 15px;
`;

interface AbilityEntryItemProps {
  ability: AbilityEntry;
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

function GetCurrentLevel(ability: AbilityEntry) {
  if (ability.level === "Master") {
    return ability.master;
  } else if (ability.level === "Adept") {
    return ability.adept;
  } else {
    return ability.novice;
  }
}

function AbilityEntryItem({
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
}: AbilityEntryItemProps) {
  const [abilityLevel, setAbilityLevel] = useState<string>("Novice");
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
    update_session(session, websocket, character, isCreature);
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

    update_session(session, websocket, character, isCreature);
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

      update_session(session, websocket, character, isCreature);
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

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

  const current_level = GetCurrentLevel(ability);

  return (
    <BaseContainer className="button-hover">
      <Container>
        <ExpandButten className={"button-hover"}></ExpandButten>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <AbilityName type={ability.type} $active={true}>
            {ability.name}
            <CorruptionContainer>
              {(ability.type === "mystical power" ||
                ability.type === "ritual") && (
                <>
                  {(ability.level === "Novice" ||
                    ability.level === "Adept" ||
                    ability.level === "Master") &&
                    !(
                      ability.tradition.includes("Theurgy") &&
                      has_theurgy_novice
                    ) &&
                    !(
                      ability.tradition.includes("Wizardry") &&
                      has_wizardry_novice
                    ) && (
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ fontSize: "14px" }}
                      />
                    )}
                  {(ability.level === "Adept" || ability.level === "Master") &&
                    !(
                      ability.tradition.includes("Theurgy") && has_theurgy_adept
                    ) &&
                    !(
                      ability.tradition.includes("Wizardry") &&
                      has_wizardry_adept
                    ) && (
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ fontSize: "14px" }}
                      />
                    )}
                  {ability.level === "Master" &&
                    !(
                      ability.tradition.includes("Theurgy") &&
                      has_theurgy_master
                    ) &&
                    !(
                      ability.tradition.includes("Wizardry") &&
                      has_wizardry_master
                    ) && (
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ fontSize: "14px" }}
                      />
                    )}
                </>
              )}
            </CorruptionContainer>
          </AbilityName>
          <AbilityDetail>
            {ability.tradition === ""
              ? toTitleCase(ability.type)
              : `${toTitleCase(ability.type)}, ${ability.tradition}`}
          </AbilityDetail>
        </NameContainer>

        <RollBox color={Constants.BRIGHT_RED}>
          {current_level.roll.map((i, index) => (
            <RollComponent
              session={session}
              character={character}
              websocket={websocket}
              roll_type={ability.type as RollTypeEntry}
              roll_source={ability.name}
              isCreature={isCreature}
              dice={i.dice}
              dice_mod={i.mod}
              color={EntryColor(i.type)}
              key={index}
              activeState={""}
              advantage={""}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
            />
          ))}
        </RollBox>
        <LevelSelectionContainer>
          {ability.adept.description !== "" &&
          ability.master.description !== "" ? (
            <LevelSelector ability={ability} />
          ) : null}
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
        {ability.novice.description !== "" && abilityLevel === "Novice" && (
          <>
            <LevelComponent
              effect={ability.novice.description}
              radius={Constants.BORDER_RADIUS}
            />
          </>
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
