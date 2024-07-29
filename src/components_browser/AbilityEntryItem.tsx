import { faBars, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { RulesAbilityDiceAdjust } from "../functions/RulesFunctions";

import {
  AbilityEntry,
  AbilityLevelType,
  CharacterEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";
import LevelComponent from "../components_browser/LevelComponent";
import RollComponent2 from "./RollComponent2";
import AbilityButtonComponent from "../components_cleanup/AbilityButtonComponent";
import { CheckAbility } from "../functions/ActivesFunction";
import { update_session } from "../functions/SessionsFunctions";
import { StyledText, toTitleCase } from "../functions/UtilityFunctions";
import {
  GetAbilityLevel,
  IsFocusedAbility,
} from "../functions/CharacterFunctions";

interface AbilityEntryItemProps {
  ability: AbilityEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;

  state: ItemStateType;
}

function AbilityEntryItem({
  ability,
  browser,
  character,
  session,
  websocket,
  isCreature,
  state,
}: AbilityEntryItemProps) {
  // We will get the dynamic object and look for the database entry. If it doesn't exist, we will return null.

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [free, setFree] = useState<boolean>(false);
  const [abilityLevel, setAbilityLevel] = useState<string>("Novice");

  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setAbilityLevel(ability.level);
    setFree(ability.free);
  });

  interface LevelProps {
    ability: AbilityEntry;
    ability_level: AbilityLevelType;
  }

  const LevelDescriptionComponent = ({
    ability,
    ability_level,
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

  const has_theurgy_novice = CheckAbility(character, "Theurgy", "novice");
  const has_theurgy_adept = CheckAbility(character, "Theurgy", "adept");
  const has_theurgy_master = CheckAbility(character, "Theurgy", "master");

  const has_wizardry_novice = CheckAbility(character, "Wizardry", "novice");
  const has_wizardry_adept = CheckAbility(character, "Wizardry", "adept");
  const has_wizardry_master = CheckAbility(character, "Wizardry", "master");

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
                      style={{
                        fontSize: "14px",
                        color: Constants.WIDGET_PRIMARY_FONT,
                      }}
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
                      style={{
                        fontSize: "14px",
                        color: Constants.WIDGET_PRIMARY_FONT,
                      }}
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
                      style={{
                        fontSize: "14px",
                        color: Constants.WIDGET_PRIMARY_FONT,
                      }}
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
        {GetAbilityLevel(ability).roll.length > 0 && (
          <RollComponent2
            session={session}
            character={character}
            websocket={websocket}
            roll_type={"ability"}
            roll_source={ability.name}
            isCreature={isCreature}
            color={categoryColor}
            roll_values={RulesAbilityDiceAdjust(character, ability)}
            is_focused={IsFocusedAbility(character)}
          />
        )}
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
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.adept}
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
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.adept}
            />
            <div className="horizontal-divider bg--primary-3" />
            <LevelDescriptionComponent
              ability={ability}
              ability_level={ability.static.master}
            />
          </>
        )}
    </div>
  );
}

export default AbilityEntryItem;
