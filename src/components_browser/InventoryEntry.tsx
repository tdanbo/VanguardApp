import { faBars, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Socket } from "socket.io-client";
import RollComponent2 from "./RollComponent2";
import EquipComponent from "../components_cleanup/EquipComponent";
import ItemButtonComponent from "../components_cleanup/ItemButtonComponent";
import * as Constants from "../Constants";
import { CheckAbility } from "../functions/ActivesFunction";
import { Qualities } from "../functions/rules/Qualities";
import { RulesItemDiceAdjust } from "../functions/RulesFunctions";
import {
  IsArmor,
  IsWeapon,
  StyledText,
  toTitleCase,
} from "../functions/UtilityFunctions";
import {
  CharacterEntry,
  ItemEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";
import DurabilityComponent from "./DurabilityComponent";
import QuantityComponent from "./QuantityComponent";
import { IsFocusedItem } from "../functions/CharacterFunctions";

interface InventoryEntryProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  browser: boolean;
  item: ItemEntry;
  isGm: boolean;
  isCreature: boolean;
  state: ItemStateType;
  tag: string;
}

function InventoryEntry({
  character,
  session,
  websocket,
  item,
  browser,
  isCreature,
  isGm,
  state,
}: InventoryEntryProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const categoryColor =
    Constants.CATEGORY_FONT_CLASSES[item.static.category] || "font--primary-1";

  const [expanded, setExpanded] = useState<boolean>(false);

  // This is a big function that correct all dice rolls based on the character's abilities
  return (
    <div className="column bg--primary-1 border">
      <div className="row row--card bg--primary-2 padding--small ">
        <EquipComponent
          item={item}
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
          isGm={isGm}
          state={state}
        />
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
            {item.name}

            {item.static.rarity === "unique" &&
            !CheckAbility(character, "Artifact Crafting", "novice") ? (
              <FontAwesomeIcon
                icon={faSkull}
                style={{
                  fontSize: "14px",
                  color: Constants.WIDGET_PRIMARY_FONT,
                }}
              />
            ) : null}
            <div className="font--size-tiny font--primary-4">
              {browser && isGm ? <div>{item.static.cost} Thaler</div> : null}
            </div>
          </div>
          <div
            className="row font--primary-3 font--size-tiny gap--small"
            style={{ justifyContent: "flex-start" }}
          >
            <div className="font--primary-2 ">
              {item.static.rarity !== "normal"
                ? toTitleCase(item.static.rarity)
                : null}{" "}
              {toTitleCase(item.static.category)}
              {item.static.quality.length > 0 && ","}
            </div>

            {item.static.quality.map((quality, index) => {
              let description = "";

              if (Qualities[quality]) {
                description = Qualities[quality].description;
              } else {
                console.warn("Missing quality:", quality);
                return null; // Skip rendering this item if the quality is missing
              }

              const titleContent = `${quality}\n\n${description}`;
              const isLastItem = index === item.static.quality.length - 1; // Check if it's the last item

              return (
                <div key={index} title={titleContent}>
                  {quality}
                  {!isLastItem && ","}
                </div>
              );
            })}
          </div>
        </div>
        {item.static.roll.length > 0 && (
          <RollComponent2
            session={session}
            character={character}
            websocket={websocket}
            roll_type={item.static.roll[0].type}
            roll_source={item.name}
            roll_color={Constants.TYPE_COLORS[item.static.category]}
            isCreature={isCreature}
            roll_values={RulesItemDiceAdjust(character, item)}
            is_focused={IsFocusedItem(character, item)}
            inactive={item.equipped}
          />
        )}
        {[1, 2, 3].includes(item.static.slot) &&
        item.static.category !== "projectile" ? (
          <DurabilityComponent
            item={item}
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            inactive={item.equipped}
          />
        ) : null}
        {item.static.bulk === true && (
          <QuantityComponent
            item={item}
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        )}
        <ItemButtonComponent
          state={state}
          item={item}
          session={session}
          character={character}
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
          {item.static.effect.length > 0 ? (
            <FontAwesomeIcon icon={faBars} size="sm" />
          ) : null}
        </div>
      </div>

      {item.static.effect.length > 0 && expanded
        ? item.static.effect.map((effect, effectIndex) => (
            <>
              {effectIndex > 0 ? (
                <div className="horizontal-divider bg--primary-3" />
              ) : null}
              <div
                className="row font--size-normal font--primary-2 padding--medium"
                style={{
                  justifyContent: "flex-start",
                }}
                key={"effect" + effectIndex.toString()} // Moved the key here for better performance and to avoid React warning
              >
                <StyledText
                  effect={effect}
                  websocket={websocket}
                  character={character}
                  session={session}
                  isCreature={isCreature}
                />
              </div>
            </>
          ))
        : null}
    </div>
  );
}
export default InventoryEntry;
