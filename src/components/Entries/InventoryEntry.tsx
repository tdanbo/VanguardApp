import {
  faBars,
  faChevronRight,
  faCoins,
  faSkull,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemEntry,
  SessionEntry,
} from "../../Types";
import RollComponent from "../../component/RollComponent";
import { DeleteInventorySlot } from "../../functions/CharacterFunctions";
import { GetMaxSlots, RulesDiceAdjust } from "../../functions/RulesFunctions";
import { update_session } from "../../functions/SessionsFunctions";
import { CheckAbility } from "../../functions/ActivesFunction";
import {
  IsArmor,
  IsWeapon,
  StyledText,
} from "../../functions/UtilityFunctions";
import { Qualities } from "../../functions/rules/Qualities";

import { cloneDeep } from "lodash";
import DurabilityComponent from "../../component/DurabilityComponent";
import { ShuffleArray, toTitleCase } from "../../functions/UtilityFunctions";
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
  font-size: 16px;
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
  item: ItemEntry;
  id: string;
  isGm: boolean;
  setInventoryState?: (inventoryState: number) => void;
  isCreature: boolean;
  canBuy: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
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
}: InventoryEntryProps) {
  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";
  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const HandleEquip = (item: ItemEntry) => {
    item.equip.equipped = true;
    update_session(session, websocket, character, isCreature);
  };

  const HandleUnequip = () => {
    item.equip.equipped = false;
    update_session(session, websocket, character, isCreature);
  };

  const AddToLoot = () => {
    const drop_item = session.loot.drops.find(
      (drop_item) =>
        drop_item.name === item.name && item.quantity.bulk === true,
    );

    if (drop_item) {
      drop_item.quantity.count += 1;
    } else {
      const new_item = cloneDeep(item);
      new_item.id = generateRandomId();
      session.loot.drops.push(new_item);
    }
    update_session(session, websocket, character, isCreature);
  };

  const RemoveLootItem = (item: ItemEntry) => {
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

  const RemoveBulkItem = (item: ItemEntry) => {
    const decrementCount = (lootArray: ItemEntry[]) => {
      return lootArray.map((loot) => {
        if (loot.id === item.id && loot.quantity.count > 0) {
          return {
            ...loot,
            quantity: { ...loot.quantity, count: loot.quantity.count - 1 },
          };
        }
        return loot;
      });
    };

    if (item.quantity.bulk === true && item.quantity.count > 1) {
      item.quantity.count -= 1;
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

  const AddResource = (item: ItemEntry, buy: boolean, share: boolean) => {
    if (share) {
      let bulk = item.quantity.count;
      let character_index = ShuffleArray(
        createArray(session.characters.length),
      );
      while (bulk > 0) {
        for (const index of character_index) {
          if (bulk <= 0) break; // Stop if no more items to distribute
          if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
            session.characters[index].money += item.cost;
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
      if (!CheckBuy(item, buy)) {
        return;
      }
      RemoveBulkItem(item);
      if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
        character.money += item.cost;
      } else if (item.name === "Food") {
        character.rations.food += 1;
      } else if (item.name === "Water") {
        character.rations.water += 1;
      }
    }
  };

  const AddBulkItem = (item: ItemEntry, buy: boolean) => {
    if (!CheckBuy(item, buy)) {
      return;
    }

    const inventoryItem = character.inventory.find(
      (inventory_item) =>
        inventory_item.name === item.name &&
        inventory_item.quantity.bulk === true,
    );

    if (inventoryItem) {
      RemoveBulkItem(item);
      inventoryItem.quantity.count += 1;
    } else {
      RemoveBulkItem(item);
      const new_item = cloneDeep(item);
      new_item.id = generateRandomId();
      new_item.quantity.count = 1;
      character.inventory.push(new_item);
    }
  };

  const CheckBuy = (item: ItemEntry, buy: boolean) => {
    if (buy) {
      if (character.money < item.cost) {
        console.log("You don't have enough money!");
        return false;
      }
      character.money -= item.cost;
      return true;
    }
    return true;
  };

  const AddRegularItem = (item: ItemEntry, buy: boolean) => {
    if (!CheckBuy(item, buy)) {
      return;
    }
    RemoveLootItem(item);
    const new_item = cloneDeep(item);
    new_item.id = generateRandomId();
    new_item.quantity.count = 1;
    character.inventory.push(new_item);
  };

  const AddInventorySlot = (buy: boolean, share: boolean) => {
    console.log("Adding Item");
    const inventory = character.inventory;
    if (
      inventory.length === GetMaxSlots(character) * 2 ||
      (buy && character.money < item.cost)
    ) {
      console.log(
        "You can't carry any more items! Or you don't have enough money!",
      );
      return;
    }

    if (item.category === "resource") {
      AddResource(item, buy, share);
    } else if (item.quantity.bulk === true) {
      AddBulkItem(item, buy);
    } else {
      AddRegularItem(item, buy);
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

  const equipHandler = (item: ItemEntry) => {
    if (item.equip.equipped) {
      HandleUnequip();
    } else {
      HandleEquip(item);
    }
  };

  const handlePlusClick = () => {
    item.quantity.count += 1;
    update_session(session, websocket, character, isCreature);
  };

  const handleMinusClick = () => {
    item.quantity.count -= 1;
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
  const dice = RulesDiceAdjust(character, item, advantage);

  return (
    <MasterContainer>
      <Container className="button-hover">
        <EquipContainer>
          {[1, 2, 3].includes(item.equip.slot) ? (
            <EquipButton
              color={COLOR}
              key={"2H"}
              onClick={() => {
                browser && isGm ? AddToLoot() : equipHandler(item);
              }}
              $isequipped={item.equip.equipped}
            >
              {browser && isGm ? (
                <FontAwesomeIcon icon={faCoins} style={{ fontSize: "12px" }} />
              ) : item.equip.slot === 1 ? (
                "I"
              ) : item.equip.slot === 2 ? (
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
            {item.name}{" "}
            <CorruptionContainer>
              {item.type === "unique" &&
              !CheckAbility(character, "Artifact Crafting", "novice") ? (
                <FontAwesomeIcon icon={faSkull} style={{ fontSize: "14px" }} />
              ) : null}
            </CorruptionContainer>
          </NameBox>
          <Row>
            <TypeBox>
              {browser && isGm ? (
                <CostBox>{ConvertCurrency(item.cost)}</CostBox>
              ) : null}
              {item.type !== "normal" ? toTitleCase(item.type) : null}{" "}
              {toTitleCase(item.category)}
              {item.quality.length > 0 && ","}
              {item.quality.map((quality, index) => {
                let description = "";

                if (quality === "Effect") {
                  description = item.description;
                } else if (Qualities[quality]) {
                  description = Qualities[quality].description;
                } else {
                  console.warn("Missing quality:", quality);
                  return null; // Skip rendering this item if the quality is missing
                }

                const titleContent = `${quality}\n\n${description}`;
                const isLastItem = index === item.quality.length - 1; // Check if it's the last item

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
          {item.roll.roll === true && (
            <RollBox color={COLOR}>
              <RollComponent
                session={session}
                character={character}
                websocket={websocket}
                roll_type={
                  IsWeapon(item)
                    ? "damage"
                    : item.category === "shield"
                    ? "damage"
                    : IsArmor(item)
                    ? "armor"
                    : "custom"
                }
                roll_source={item.name}
                isCreature={isCreature}
                dice={dice + (advantage && IsWeapon(item) ? 4 : 0)}
                dice_mod={item.roll.mod}
                color={COLOR}
                item={item}
                inactive={item.equip.equipped}
                advantage={advantage}
                activeState={activeState}
              />
            </RollBox>
          )}

          {[1, 2, 3].includes(item.equip.slot) &&
          item.category !== "projectile" ? (
            <RollBox color={COLOR}>
              <DurabilityComponent
                item={item}
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                inactive={item.equip.equipped}
              />
            </RollBox>
          ) : null}
          {item.quantity.bulk === true && (
            <QuantityBox
              color={COLOR}
              onClick={handleMinusClick}
              onContextMenu={(e) => {
                e.preventDefault();
                handlePlusClick();
              }}
              className="mouse-icon-hover"
            >
              {item.quantity.count}x
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
              {item.category === "resource" ? (
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
              ) : Array.isArray(item.effect) && item.effect.length > 0 ? (
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
          ) : equipped === "" ? (
            <>
              <DeleteButton
                className={"button-hover"}
                onClick={() => RemoveInventorySlot(id)}
              >
                <FontAwesomeIcon icon={faXmark} style={{ fontSize: "12px" }} />
              </DeleteButton>
              {Array.isArray(item.effect) && item.effect.length > 0 ? (
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
      {Array.isArray(item.effect) && item.effect.length > 0 && (
        <EffectContainer $expanded={expanded}>
          {item.effect.map((effect, effectIndex) => (
            <React.Fragment key={effectIndex}>
              {effectIndex > 0 && <RowDivider />}
              <StyledText
                entry={item}
                effect={effect}
                websocket={websocket}
                character={character}
                session={session}
                isCreature={isCreature}
                activeState={activeState}
                advantage={advantage}
              />
            </React.Fragment>
          ))}
        </EffectContainer>
      )}
    </MasterContainer>
  );
}
export default InventoryEntry;
