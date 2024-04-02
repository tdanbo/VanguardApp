import {
  faBars,
  faChevronRight,
  faCoins,
  faFeather,
  faSkull,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { GetGameData } from "../contexts/GameContent";
import { GetDatabaseEquipment } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemDynamic,
  ItemEntry,
  SessionEntry,
} from "../Types";
import RollComponent from "../components_general/RollComponent";
import { CheckAbility } from "../functions/ActivesFunction";
import { DeleteInventorySlot } from "../functions/CharacterFunctions";
import { GetMaxSlots, RulesDiceAdjust } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { IsArmor, IsWeapon, StyledText } from "../functions/UtilityFunctions";
import { Qualities } from "../functions/rules/Qualities";

import { cloneDeep } from "lodash";
import { ShuffleArray, toTitleCase } from "../functions/UtilityFunctions";
import DurabilityComponent from "./DurabilityComponent";
const MasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 5px;
  height: 35px;
  max-height: 35px;
`;

interface EffectContainerProps {
  $expanded: boolean;
}

const EffectContainer = styled.div<EffectContainerProps>`
  display: ${(props) => (props.$expanded ? "flex" : "none")};
  flex-direction: column;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: #191c1b;
  font-size: 12px;
  padding: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
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

const EquipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 5px;
  user-select: none;
`;

const NameBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex: 1;
  color: ${(props) => props.color};
  font-size: 14px;
  font-weight: bold;
`;

const CostBox = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

interface RollBoxProps {
  color: string;
}

const RollBox = styled.div<RollBoxProps>`
  display: flex;
  flex-grow: 1;
  color: ${(props) => props.color};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 40px;
  font-size: 14px;
`;

const RowDivider = styled.div`
  display: flex;
  background-color: ${Constants.BACKGROUND};
  width: 100%;
  height: 1px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

type StyledButtonProps = {
  $isequipped: boolean;
  color: string;
};

const EquipButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isequipped ? props.color : Constants.WIDGET_BACKGROUND};
  margin: 1px 0px 1px 1px;
  width: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  width: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
`;

type NoEquipButtonProps = {
  color: string;
};

const NoEquipBox = styled.div<NoEquipButtonProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
  width: 20px;
  max-width: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
`;

const QuantityBox = styled.button<RollBoxProps>`
  display: flex;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 40px;
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const TypeBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  gap: 5px;
`;

const QualityBox = styled.div`
  display: flex;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
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

interface InventoryEntryProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  index: number;
  browser: boolean;
  equipped: string;
  item: ItemDynamic;
  id: string;
  isGm: boolean;
  setInventoryState?: (inventoryState: number) => void;
  isCreature: boolean;
  canBuy: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function InventoryEntry({
  character,
  session,
  websocket,
  item,
  browser,
  equipped,
  id,
  setInventoryState,
  isCreature,
  canBuy,
  isGm,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
}: InventoryEntryProps) {
  const { equipment } = GetGameData();
  const item_database = GetDatabaseEquipment(item, equipment);

  if (!item_database) {
    console.log(item.name + " not found in database.");
    return null;
  }

  const [_light, setLight] = useState<boolean>(false);
  const COLOR = Constants.TYPE_COLORS[item_database.category] || "defaultColor";
  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const HandleEquip = (item: ItemDynamic) => {
    item.equipped = true;
    update_session(session, websocket, character, isCreature);
  };

  const HandleUnequip = () => {
    item.equipped = false;
    update_session(session, websocket, character, isCreature);
  };

  const AddToLoot = () => {
    const drop_item = session.loot.drops.find(
      (drop_item) =>
        drop_item.name === item.name && item_database.bulk === true,
    );

    if (drop_item) {
      drop_item.quantity += 1;
    } else {
      const new_item = cloneDeep(item);
      new_item.id = generateRandomId();
      session.loot.drops.push(new_item);
    }
    update_session(session, websocket, character, isCreature);
  };

  const RemoveLootItem = (item: ItemDynamic) => {
    session.loot.drops = session.loot.drops.filter(
      (loot) => loot.id !== item.id,
    );
    session.loot.general = session.loot.general.filter(
      (loot) => loot.id !== item.id,
    );
    session.loot.armory = session.loot.armory.filter(
      (loot) => loot.id !== item.id,
    );
    session.loot.alchemy = session.loot.alchemy.filter(
      (loot) => loot.id !== item.id,
    );
    session.loot.novelty = session.loot.novelty.filter(
      (loot) => loot.id !== item.id,
    );
  };

  const RemoveBulkItem = (item: ItemDynamic, item_database: ItemEntry) => {
    const decrementCount = (lootArray: ItemDynamic[]) => {
      return lootArray.map((loot) => {
        if (loot.id === item.id && loot.quantity > 0) {
          return {
            ...loot,
            quantity: loot.quantity - 1,
          };
        }
        return loot;
      });
    };

    if (item_database.bulk === true && item.quantity > 1) {
      item.quantity -= 1;
      session.loot.general = decrementCount(session.loot.general);
      session.loot.armory = decrementCount(session.loot.armory);
      session.loot.alchemy = decrementCount(session.loot.alchemy);
      session.loot.novelty = decrementCount(session.loot.novelty);
    } else {
      RemoveLootItem(item);
    }
  };

  const createArray = (number: number) => {
    return Array.from({ length: number }, (_, index) => index);
  };

  const AddResource = (
    item: ItemDynamic,
    item_database: ItemEntry,
    buy: boolean,
    share: boolean,
  ) => {
    if (share) {
      let bulk = item.quantity;
      let character_index = ShuffleArray(
        createArray(session.characters.length),
      );
      while (bulk > 0) {
        for (const index of character_index) {
          if (bulk <= 0) break; // Stop if no more items to distribute
          if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
            session.characters[index].money += item_database.cost;
            bulk -= 1;
          } else if (item.name === "Food") {
            session.characters[index].rations.food += 1;
            bulk -= 1;
          } else if (item.name === "Water") {
            session.characters[index].rations.water += 1;
            bulk -= 1;
          }
        }
      }
      RemoveLootItem(item);
    } else {
      if (!CheckBuy(item_database, buy)) {
        return;
      }
      RemoveBulkItem(item, item_database);
      if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
        character.money += item_database.cost;
      } else if (item.name === "Food") {
        character.rations.food += 1;
      } else if (item.name === "Water") {
        character.rations.water += 1;
      }
    }
  };

  const AddBulkItem = (
    item: ItemDynamic,
    item_database: ItemEntry,
    buy: boolean,
  ) => {
    if (!CheckBuy(item_database, buy)) {
      return;
    }

    const inventoryItem = character.inventory.find(
      (inventory_item) =>
        inventory_item.name === item.name && item_database.bulk === true,
    );

    if (inventoryItem) {
      RemoveBulkItem(item, item_database);
      inventoryItem.quantity += 1;
    } else {
      RemoveBulkItem(item, item_database);
      const new_item = cloneDeep(item);
      new_item.id = generateRandomId();
      new_item.quantity = 1;
      character.inventory.push(new_item);
    }
  };

  const CheckBuy = (item: ItemEntry, buy: boolean) => {
    if (buy) {
      if (character.money < item.cost) {
        return false;
      }
      character.money -= item.cost;
      return true;
    }
    return true;
  };

  const AddRegularItem = (
    item: ItemDynamic,
    item_database: ItemEntry,
    buy: boolean,
  ) => {
    if (!CheckBuy(item_database, buy)) {
      return;
    }
    RemoveLootItem(item);
    const new_item = cloneDeep(item);
    new_item.id = generateRandomId();
    new_item.quantity = 1;
    character.inventory.push(new_item);
  };

  const AddInventorySlot = (buy: boolean, share: boolean) => {
    const inventory = character.inventory;
    if (
      inventory.length === GetMaxSlots(character) * 2 ||
      (buy && character.money < item_database.cost)
    ) {
      return;
    }

    if (item_database.category === "resource") {
      AddResource(item, item_database, buy, share);
    } else if (item_database.bulk === true) {
      AddBulkItem(item, item_database, buy);
    } else {
      AddRegularItem(item, item_database, buy);
    }

    update_session(session, websocket, character, isCreature);
    if (setInventoryState) {
      setInventoryState(1);
    }
  };

  const RemoveInventorySlot = (item_id: string) => {
    DeleteInventorySlot(character, item_id);
    update_session(session, websocket, character, isCreature);
  };

  const equipHandler = (item: ItemDynamic) => {
    if (item.equipped) {
      HandleUnequip();
    } else {
      HandleEquip(item);
    }
  };

  const handlePlusClick = () => {
    item.quantity += 1;
    update_session(session, websocket, character, isCreature);
  };

  const handleMinusClick = () => {
    item.quantity -= 1;
    update_session(session, websocket, character, isCreature);
  };

  function ConvertCurrency(cost: number) {
    const thaler = Math.floor(cost / 100);
    const remainingAfterThaler = cost - thaler * 100;
    const shillings = Math.floor(remainingAfterThaler / 10);
    const orthegs = remainingAfterThaler - shillings * 10;

    let value = "";

    if (thaler > 0) {
      value += `${thaler} Thaler `;
    }
    if (shillings > 0) {
      value += `${shillings} Shilling `;
    }
    if (orthegs > 0) {
      value += `${orthegs} Orteg `;
    }

    // Trim to remove any trailing whitespace
    return value.trim();
  }

  const [expanded, setExpanded] = useState<boolean>(false);

  // This is a big function that correct all dice rolls based on the character's abilities
  const dice = RulesDiceAdjust(character, item_database, advantage);

  const HandleLightSetting = () => {
    item_database.quality.includes("Light")
      ? item_database.quality.pop() && setLight(false)
      : item_database.quality.push("Light") && setLight(true);
  };

  return (
    <MasterContainer>
      <Container className="button-hover">
        <EquipContainer>
          {[1, 2, 3].includes(item_database.slot) ? (
            <EquipButton
              color={COLOR}
              key={"2H"}
              onClick={() => {
                browser && isGm ? AddToLoot() : equipHandler(item);
              }}
              $isequipped={item.equipped}
            >
              {browser && isGm ? (
                <FontAwesomeIcon icon={faCoins} style={{ fontSize: "12px" }} />
              ) : item_database.slot === 1 ? (
                "I"
              ) : item_database.slot === 2 ? (
                "II"
              ) : (
                ""
              )}
            </EquipButton>
          ) : (
            <NoEquipBox
              key={"unequip"}
              color={COLOR}
              onClick={() => {
                browser && isGm ? AddToLoot() : null;
              }}
            >
              {browser && isGm ? (
                <FontAwesomeIcon icon={faCoins} style={{ fontSize: "12px" }} />
              ) : null}{" "}
            </NoEquipBox>
          )}
        </EquipContainer>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <NameBox color={COLOR}>
            {item.name}

            <CorruptionContainer>
              {item_database.rarity === "unique" &&
              !CheckAbility(character, "Artifact Crafting", "novice") ? (
                <FontAwesomeIcon icon={faSkull} style={{ fontSize: "14px" }} />
              ) : null}
            </CorruptionContainer>
          </NameBox>
          <Row>
            <TypeBox>
              {browser && isGm ? (
                <CostBox>{ConvertCurrency(item_database.cost)}</CostBox>
              ) : null}
              {item_database.rarity !== "normal"
                ? toTitleCase(item_database.rarity)
                : null}{" "}
              {toTitleCase(item_database.category)}
              {item_database.quality.length > 0 && ","}
              {item_database.quality.map((quality, index) => {
                let description = "";

                if (Qualities[quality]) {
                  description = Qualities[quality].description;
                } else {
                  console.warn("Missing quality:", quality);
                  return null; // Skip rendering this item if the quality is missing
                }

                const titleContent = `${quality}\n\n${description}`;
                const isLastItem = index === item_database.quality.length - 1; // Check if it's the last item

                return (
                  <QualityBox key={index} title={titleContent}>
                    {quality}
                    {!isLastItem && ","}
                  </QualityBox>
                );
              })}
            </TypeBox>{" "}
          </Row>
        </NameContainer>
        {/* {item.description !== "" && (
          <Description color={COLOR}> — {item.description}</Description>
        )} */}

        <RollContainer>
          {item_database.roll.roll === true && (
            <RollBox color={COLOR}>
              <RollComponent
                session={session}
                character={character}
                websocket={websocket}
                roll_type={
                  IsWeapon(item_database)
                    ? "damage"
                    : item_database.category === "shield"
                    ? "damage"
                    : IsArmor(item_database)
                    ? "armor"
                    : "custom"
                }
                roll_source={item.name}
                isCreature={isCreature}
                dice={dice}
                dice_mod={item_database.roll.mod}
                color={COLOR}
                item={item_database}
                inactive={item.equipped}
                advantage={advantage}
                activeState={""}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
              />
            </RollBox>
          )}

          {[1, 2, 3].includes(item_database.slot) &&
          item_database.category !== "projectile" ? (
            <RollBox color={COLOR}>
              <DurabilityComponent
                item={item}
                item_database={item_database}
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                inactive={item.equipped}
              />
            </RollBox>
          ) : null}
          {item_database.bulk === true && (
            <QuantityBox
              color={COLOR}
              onClick={handleMinusClick}
              onContextMenu={(e) => {
                e.preventDefault();
                handlePlusClick();
              }}
              className="mouse-icon-hover"
            >
              {item.quantity}x
            </QuantityBox>
          )}
        </RollContainer>

        <Column>
          {browser ? (
            <>
              <AddButton
                className={"button-hover"}
                onClick={() => AddInventorySlot(canBuy, false)}
              >
                <FontAwesomeIcon
                  icon={canBuy ? faCoins : faChevronRight}
                  style={{ fontSize: "12px" }}
                  color={canBuy ? "#f5c542" : Constants.WIDGET_SECONDARY_FONT}
                  title={canBuy ? "Buy One" : "Add One"}
                />
              </AddButton>
              {item_database.category === "resource" ? (
                <AddButton
                  className={"button-hover"}
                  title={"Distribute to group"}
                  onClick={() => AddInventorySlot(false, true)}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ fontSize: "12px" }}
                  />
                </AddButton>
              ) : Array.isArray(item_database.effect) &&
                item_database.effect.length > 0 ? (
                expanded ? (
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
                      style={{ fontSize: "12px" }}
                    />
                  </AddButton>
                )
              ) : (
                <AddButton />
              )}
              {item_database.category === "general good" &&
              browser &&
              isGm &&
              !item_database.quality.includes("Light") ? (
                <AddButton
                  className={"button-hover"}
                  onClick={() => HandleLightSetting()}
                >
                  <FontAwesomeIcon
                    icon={faFeather}
                    style={{ fontSize: "12px" }}
                    color={canBuy ? "#f5c542" : Constants.WIDGET_SECONDARY_FONT}
                    title={canBuy ? "Buy One" : "Add One"}
                  />
                </AddButton>
              ) : null}
            </>
          ) : equipped === "" ? (
            <>
              <DeleteButton
                className={"button-hover"}
                onClick={() => RemoveInventorySlot(id)}
              >
                <FontAwesomeIcon icon={faXmark} style={{ fontSize: "12px" }} />
              </DeleteButton>
              {Array.isArray(item_database.effect) &&
              item_database.effect.length > 0 ? (
                expanded ? (
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
                      style={{ fontSize: "12px" }}
                    />
                  </AddButton>
                )
              ) : (
                <AddButton />
              )}
            </>
          ) : null}
        </Column>
      </Container>
      {Array.isArray(item_database.effect) &&
        item_database.effect.length > 0 && (
          <EffectContainer $expanded={expanded}>
            {item_database.effect.map((effect, effectIndex) => (
              <React.Fragment key={effectIndex}>
                {effectIndex > 0 && <RowDivider />}
                <StyledText
                  entry={item_database}
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
              </React.Fragment>
            ))}
          </EffectContainer>
        )}
    </MasterContainer>
  );
}
export default InventoryEntry;
