import {
  faBars,
  faChevronRight,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";

import {
  Ability,
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import RollComponent2 from "../components_browser/RollComponent2";
import { CheckAbility } from "../functions/ActivesFunction";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText, toTitleCase } from "../functions/UtilityFunctions";
import LevelComponent from "../components_browser/LevelComponent";

const EntryColor = (type: string) => {
  if (type === undefined) {
    return "#FF0000";
  }
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
  height: 40px;
  max-height: 40px;
  padding: 2px;
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
  font-size: 16px;
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
  font-size: 15px;
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

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

function GetCurrentLevel(ability: AbilityEntry) {
  if (ability.level === "Master") {
    return ability.static.master;
  } else if (ability.level === "Adept") {
    return ability.static.adept;
  } else {
    return ability.static.novice;
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
  setCriticalState,
}: AbilityEntryItemProps) {
  // We will get the dynamic object and look for the database entry. If it doesn't exist, we will return null.
  const [free, setFree] = useState<boolean>(false);
  const [abilityLevel, setAbilityLevel] = useState<string>("Novice");
  useEffect(() => {
    setAbilityLevel(ability.level);
    setFree(ability.free);
  });

  interface LevelProps {
    ability: AbilityEntry;
    ability_level: Ability;
    radius: string;
  }

  const LevelDescriptionComponent = ({
    ability,
    ability_level,
    radius,
  }: LevelProps) => {
    return (
      <LevelBaseContainer radius={radius}>
        <AbilityDescription>
          {ability_level.action !== "" && (
            <div
              className="base_color"
              style={{
                display: "inline-block",
                marginRight: "5px",
                padding: "2px 5px 2px 5px",
                color: Constants.WIDGET_PRIMARY_FONT,
                fontWeight: "bold",
                backgroundColor:
                  Constants.TYPE_COLORS[ability.static.category] ||
                  Constants.WIDGET_BORDER,
              }}
            >
              {toTitleCase(ability_level.action)}
            </div>
          )}
          <StyledText
            effect={ability_level.description}
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

  useEffect(() => {
    if (browser) {
      if (ability.static.master.description !== "") {
        setAbilityLevel("Master");
      } else if (ability.static.adept.description !== "") {
        setAbilityLevel("Adept");
      } else if (ability.static.novice.description !== "") {
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

    update_session(session, websocket, character, isCreature);
  };

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

  const current_level = GetCurrentLevel(ability);

  const ChangeFreeHandle = () => {
    ability.free = !free;
    update_session(session, websocket, character, isCreature);
  };

  const GetTagNames = (ability: AbilityEntry) => {
    if (ability.static.tags === undefined) {
      return "";
    }
    let tags = ability.static.tags;
    if (ability.level === "Novice") {
      tags = tags.slice(0, 1);
    } else if (ability.level === "Adept") {
      tags = tags.slice(0, 2);
    } else if (ability.level === "Master") {
      tags = tags.slice(0, 3);
    }

    return toTitleCase(tags.length > 0 ? tags.join(", ") : "");
  };

  return (
    <BaseContainer className="button-hover">
      <Container>
        <ExpandButten
          className={"button-hover"}
          title={free ? "Free Ability" : ""}
          onClick={ChangeFreeHandle}
        >
          {free ? "F" : null}
        </ExpandButten>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <AbilityName type={ability.static.category} $active={true}>
            {ability.name}
            <CorruptionContainer>
              {(ability.static.category === "mystical power" ||
                ability.static.category === "ritual") && (
                <>
                  {(ability.level === "Novice" ||
                    ability.level === "Adept" ||
                    ability.level === "Master") &&
                    !(
                      ability.static.tradition.includes("theurgy") &&
                      has_theurgy_novice
                    ) &&
                    !(
                      ability.static.tradition.includes("wizardry") &&
                      has_wizardry_novice
                    ) && (
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ fontSize: "14px" }}
                      />
                    )}
                  {(ability.level === "Adept" || ability.level === "Master") &&
                    !(
                      ability.static.tradition.includes("theurgy") &&
                      has_theurgy_adept
                    ) &&
                    !(
                      ability.static.tradition.includes("wizardry") &&
                      has_wizardry_adept
                    ) && (
                      <FontAwesomeIcon
                        icon={faSkull}
                        style={{ fontSize: "14px" }}
                      />
                    )}
                  {ability.level === "Master" &&
                    !(
                      ability.static.tradition.includes("theurgy") &&
                      has_theurgy_master
                    ) &&
                    !(
                      ability.static.tradition.includes("wizardry") &&
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
          {/* {ability.static.tradition !== []
              ? toTitleCase(ability.static.category)
              : `${toTitleCase(ability.static.category)}, ${
                  ability.static.tradition
                }`} */}
          <AbilityDetail>
            {toTitleCase(ability.static.category)}
            {ability.static.tradition &&
              ability.static.tradition.length > 0 &&
              ", " + toTitleCase(ability.static.tradition.join(", ")) + ", "}
            <div
              style={{
                marginLeft: "2px",
                color: Constants.WIDGET_SECONDARY_FONT,
              }}
            >
              {GetTagNames(ability)}
            </div>
          </AbilityDetail>
        </NameContainer>
        <RollContainer>
          {current_level.roll.map((i, index) => {
            return (
              <RollComponent2
                session={session}
                character={character}
                websocket={websocket}
                roll_type={ability.static.category as RollTypeEntry}
                roll_source={ability.name}
                isCreature={isCreature}
                dice={i.dice}
                dice_mod={i.mod}
                color={EntryColor(ability.static.category)}
                key={index}
                activeState={activeState}
                advantage={""}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
              />
            );
          })}
          {ability.static.adept.description !== "" &&
          ability.static.master.description !== "" ? (
            <LevelComponent
              ability={ability}
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
            />
          ) : null}
        </RollContainer>

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
        {ability.static.novice.description !== "" &&
          abilityLevel === "Novice" && (
            <>
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.novice}
                radius={Constants.BORDER_RADIUS}
              />
            </>
          )}
        {ability.static.adept.description !== "" &&
          abilityLevel === "Adept" && (
            <>
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.novice}
                radius={"0px"}
              />
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.adept}
                radius={Constants.BORDER_RADIUS}
              />
            </>
          )}
        {ability.static.master.description !== "" &&
          abilityLevel === "Master" && (
            <>
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.novice}
                radius={"0px"}
              />
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.adept}
                radius={"0px"}
              />
              <LevelDescriptionComponent
                ability={ability}
                ability_level={ability.static.master}
                radius={Constants.BORDER_RADIUS}
              />
            </>
          )}
      </LevelContainer>
    </BaseContainer>
  );
}

export default AbilityEntryItem;
