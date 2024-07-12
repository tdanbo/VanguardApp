import { faBars, faSkull } from "@fortawesome/free-solid-svg-icons";
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
  ItemStateType,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import LevelComponent from "../components_browser/LevelComponent";
import RollComponent2 from "../components_browser/RollComponent2";
import AbilityButtonComponent from "../components_cleanup/AbilityButtonComponent";
import { CheckAbility } from "../functions/ActivesFunction";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText, toTitleCase } from "../functions/UtilityFunctions";

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

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 5px;
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
  state: ItemStateType;
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
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCriticalState,
  state,
}: AbilityEntryItemProps) {
  // We will get the dynamic object and look for the database entry. If it doesn't exist, we will return null.
  const [isHovered, setIsHovered] = useState<boolean>(false);
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
      <>
        <div
          className="row font--size-normal font--primary-2 padding--medium"
          style={{
            justifyContent: "flex-start",
          }}
        >
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
        </div>
      </>
    );
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

  const categoryColor =
    Constants.CATEGORY_FONT_CLASSES[ability.static.category] ||
    "font--primary-1";

  return (
    <div className="column bg--primary-1 border">
      <div className="row row--card bg--primary-2 padding--small ">
        <div
          className="button border-radius--left bg--primary-3"
          style={{ minWidth: "25px", maxWidth: "25px" }}
          title={free ? "Free Ability" : ""}
          onClick={ChangeFreeHandle}
        >
          {free ? "F" : null}
        </div>
        <div className="vertical-divider bg--primary-1" />
        <div
          className="column gap--none padding--medium"
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`row font--bold ${categoryColor}`}
            style={{ justifyContent: "flex-start" }}
          >
            {ability.name}
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
          </div>
          <div
            className="row font--primary-3 font--size-tiny gap--small"
            style={{ justifyContent: "flex-start" }}
          >
            {toTitleCase(ability.static.category)}
            {ability.static.tradition &&
              ability.static.tradition.length > 0 &&
              ", " + toTitleCase(ability.static.tradition.join(", ")) + ", "}
            <div
              className="font--primary-2"
              style={{
                color: Constants.WIDGET_SECONDARY_FONT,
              }}
            >
              {GetTagNames(ability)}
            </div>
          </div>
        </div>
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
              color={categoryColor}
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
        <AbilityButtonComponent
          state={state}
          ability={ability}
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
        />
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
      {ability.static.novice.description !== "" &&
        abilityLevel === "Novice" &&
        expanded && (
          <>
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.novice}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}
      {ability.static.adept.description !== "" &&
        abilityLevel === "Adept" &&
        expanded && (
          <>
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.novice}
              radius={"0px"}
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.adept}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}
      {ability.static.master.description !== "" &&
        abilityLevel === "Master" &&
        expanded && (
          <>
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.novice}
              radius={"0px"}
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.adept}
              radius={"0px"}
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.master}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}
    </div>
  );
}

export default AbilityEntryItem;
