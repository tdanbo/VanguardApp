import {
  faBars,
  faCoins,
  faFeather,
  faPlus,
  faSkull,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Icon from "@mdi/react";
import { mdiSack } from "@mdi/js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { AddToLoot } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";
import RollComponent2 from "../components_browser/RollComponent2";
import { CheckAbility } from "../functions/ActivesFunction";
import { DeleteInventorySlot } from "../functions/CharacterFunctions";
import { GetMaxSlots, RulesDiceAdjust } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { IsArmor, IsWeapon, StyledText } from "../functions/UtilityFunctions";
import { Qualities } from "../functions/rules/Qualities";
import { cloneDeep } from "lodash";
import { ShuffleArray, toTitleCase } from "../functions/UtilityFunctions";
import DurabilityComponent from "./DurabilityComponent";
import QuantityComponent from "./QuantityComponent";
import { GetItemPrice } from "../functions/UtilityFunctions";
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
  height: 40px;
  max-height: 40px;
  padding: 2px;
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
  font-size: 15px;
  font-weight: bold;
  margin-top: 2px;
`;

const CostBox = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const TypeBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
  gap: 5px;
  align-items: flex-start;
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
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  isDrop: boolean;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
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
  isDrop,
  criticalState,
  setCriticalState,
}: InventoryEntryProps) {
  const COLOR = Constants.TYPE_COLORS[item.static.category] || "defaultColor";
  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const HandleEquip = (item: ItemEntry) => {
    item.equipped = true;
    update_session(session, websocket, character, isCreature);
  };

  const HandleUnequip = () => {
    item.equipped = false;
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
        if (loot.id === item.id && loot.quantity > 0) {
          return {
            ...loot,
            quantity: loot.quantity - 1,
          };
        }
        return loot;
      });
    };

    if (item.static.bulk === true && item.quantity > 1) {
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

  const AddResource = (item: ItemEntry, buy: boolean, share: boolean) => {
    if (share) {
      let bulk = item.quantity;
      const character_index = ShuffleArray(
        createArray(session.characters.length),
      );
      while (bulk > 0) {
        for (const index of character_index) {
          if (bulk <= 0) break; // Stop if no more items to distribute
          if (item.name === "Thaler") {
            session.characters[index].coins += item.static.cost;
            bulk -= 1;
          } else if (item.name === "Ration") {
            session.characters[index].rations += 1;
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
      if (item.name === "Thaler") {
        character.coins += item.static.cost;
      } else if (item.name === "Ration") {
        character.rations += 1;
      }
    }
  };

  const AddBulkItem = (item: ItemEntry, buy: boolean) => {
    if (!CheckBuy(item, buy)) {
      return;
    }

    const inventoryItem = character.inventory.find(
      (inventory_item) =>
        inventory_item.name === item.name && item.static.bulk === true,
    );

    if (inventoryItem) {
      RemoveBulkItem(item);
      inventoryItem.quantity += 1;
    } else {
      RemoveBulkItem(item);
      const new_item = cloneDeep(item);
      new_item.id = generateRandomId();
      new_item.quantity = 1;
      character.inventory.push(new_item);
    }
  };

  const CheckBuy = (item: ItemEntry, buy: boolean) => {
    if (buy) {
      if (character.coins < item.static.cost) {
        return false;
      }
      character.coins -= item.static.cost;
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
    new_item.quantity = 1;
    character.inventory.push(new_item);
  };

  const AddInventorySlot = (buy: boolean, share: boolean) => {
    const inventory = character.inventory;
    if (
      inventory.length === GetMaxSlots(character) * 2 ||
      (buy && character.coins < item.static.cost)
    ) {
      return;
    }

    if (item.static.category === "resource") {
      AddResource(item, buy, share);
    } else if (item.static.bulk === true) {
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
    if (item.static.bulk) {
      if (item.quantity === 0) {
        return;
      }
      item.quantity -= 1;

      if (item.quantity === 0) {
        DeleteInventorySlot(character, item.id);
      }

      AddToLoot(item, session, websocket, character, isCreature);
      update_session(session, websocket, character, isCreature);
    } else {
      DeleteInventorySlot(character, item_id);
      session.loot.drops.push(item);
      update_session(session, websocket, character, isCreature);
    }
  };

  const equipHandler = (item: ItemEntry) => {
    if (item.equipped) {
      HandleUnequip();
    } else {
      HandleEquip(item);
    }
  };

  const [expanded, setExpanded] = useState<boolean>(false);

  // This is a big function that correct all dice rolls based on the character's abilities
  const dice = RulesDiceAdjust(character, item, advantage, criticalState);

  const HandleLightSetting = () => {
    console.log("Light setting");
    item.light = !item.light;
    update_session(session, websocket, character, isCreature);
  };

  const RemoveSingleLoot = (item: ItemEntry) => {
    RemoveLootItem(item);
    update_session(session, websocket, character, isCreature);
  };

  return (
    <MasterContainer>
      <Container className="button-hover">
        <EquipContainer>
          {[1, 2, 3].includes(item.static.slot) ? (
            <EquipButton
              className="button"
              color={COLOR}
              key={"2H"}
              onClick={() => {
                browser && isGm
                  ? AddToLoot(item, session, websocket, character, isCreature)
                  : equipHandler(item);
              }}
              $isequipped={item.equipped}
            >
              {item.static.slot === 1
                ? "I"
                : item.static.slot === 2
                ? "II"
                : ""}
            </EquipButton>
          ) : (item.static.category === "general good" ||
              item.static.category === "container") &&
            isGm ? (
            <NoEquipBox
              className="button"
              key={"unequip"}
              color={COLOR}
              onClick={() => {
                HandleLightSetting();
              }}
            >
              {item.light ? (
                <FontAwesomeIcon
                  icon={faFeather}
                  style={{ fontSize: "12px" }}
                />
              ) : null}
            </NoEquipBox>
          ) : (
            <NoEquipBox key={"unequip"} color={COLOR}>
              {" "}
              {item.light ? (
                <FontAwesomeIcon
                  icon={faFeather}
                  style={{ fontSize: "12px" }}
                />
              ) : null}
            </NoEquipBox>
          )}
        </EquipContainer>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <NameBox color={COLOR}>
            {item.name}

            <CorruptionContainer>
              {item.static.rarity === "unique" &&
              !CheckAbility(character, "Artifact Crafting", "novice") ? (
                <FontAwesomeIcon icon={faSkull} style={{ fontSize: "14px" }} />
              ) : null}
            </CorruptionContainer>
          </NameBox>
          <Row>
            <TypeBox>
              {browser && isGm ? (
                <CostBox>{GetItemPrice(item)} Thaler</CostBox>
              ) : null}
              {item.static.rarity !== "normal"
                ? toTitleCase(item.static.rarity)
                : null}{" "}
              {toTitleCase(item.static.category)}
              {item.static.quality.length > 0 && ","}
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
                  <QualityBox key={index} title={titleContent}>
                    {quality}
                    {!isLastItem && ","}
                  </QualityBox>
                );
              })}
            </TypeBox>
          </Row>
        </NameContainer>
        {/* {item.description !== "" && (
          <Description color={COLOR}> — {item.description}</Description>
        )} */}

        <RollContainer>
          {item.static.roll.roll === true && (
            <RollBox color={COLOR}>
              <RollComponent2
                session={session}
                character={character}
                websocket={websocket}
                roll_type={
                  IsWeapon(item)
                    ? "damage"
                    : item.static.category === "shield"
                    ? "damage"
                    : IsArmor(item)
                    ? "armor"
                    : "custom"
                }
                roll_source={item.name}
                isCreature={isCreature}
                dice={dice}
                dice_mod={item.static.roll.mod}
                color={COLOR}
                item={item}
                inactive={item.equipped}
                advantage={advantage}
                activeState={activeState}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
              />
            </RollBox>
          )}

          {[1, 2, 3].includes(item.static.slot) &&
          item.static.category !== "projectile" ? (
            <RollBox color={COLOR}>
              <DurabilityComponent
                item={item}
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                inactive={item.equipped}
              />
            </RollBox>
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
        </RollContainer>

        <Column>
          {browser ? (
            <>
              {isDrop ? (
                <>
                  {isGm ? (
                    <AddButton
                      className={"button"}
                      onClick={() => RemoveSingleLoot(item)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        style={{ fontSize: "12px" }}
                        color={Constants.WIDGET_SECONDARY_FONT}
                        title={"Remove loot"}
                      />
                    </AddButton>
                  ) : (
                    <AddButton
                      className={"button"}
                      onClick={() => AddInventorySlot(canBuy, false)}
                    >
                      <FontAwesomeIcon
                        icon={canBuy ? faCoins : faPlus}
                        style={{ fontSize: "12px" }}
                        color={
                          canBuy ? "#f5c542" : Constants.WIDGET_SECONDARY_FONT
                        }
                        title={canBuy ? "Buy One" : "Add to inventory"}
                      />
                    </AddButton>
                  )}
                </>
              ) : (
                <AddButton
                  className={"button"}
                  onClick={() =>
                    AddToLoot(item, session, websocket, character, isCreature)
                  }
                >
                  <Icon path={mdiSack} size={0.6} />
                </AddButton>
              )}
              {item.static.category === "resource" ? (
                <AddButton
                  className={"button"}
                  title={"Distribute to group"}
                  onClick={() => AddInventorySlot(false, true)}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ fontSize: "12px" }}
                  />
                </AddButton>
              ) : Array.isArray(item.static.effect) &&
                item.static.effect.length > 0 ? (
                expanded ? (
                  <AddButton className={"button"}>
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{
                        fontSize: "12px",
                        color: Constants.WIDGET_SECONDARY_FONT,
                      }}
                    />
                  </AddButton>
                ) : (
                  <AddButton className={"button"}>
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
                className={"button"}
                onClick={() => RemoveInventorySlot(id)}
                title={"Drop item"}
              >
                <FontAwesomeIcon icon={faXmark} style={{ fontSize: "12px" }} />
              </DeleteButton>
              {Array.isArray(item.static.effect) &&
              item.static.effect.length > 0 ? (
                expanded ? (
                  <AddButton className={"button"}>
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{
                        fontSize: "12px",
                        color: Constants.WIDGET_SECONDARY_FONT,
                      }}
                    />
                  </AddButton>
                ) : (
                  <AddButton className={"button"}>
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
      {Array.isArray(item.static.effect) && item.static.effect.length > 0 && (
        <EffectContainer $expanded={expanded}>
          {item.static.effect.map((effect, effectIndex) => (
            <React.Fragment key={effectIndex}>
              {effectIndex > 0 && <RowDivider />}
              <StyledText
                key={"effect" + effectIndex.toString()}
                effect={effect}
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
            </React.Fragment>
          ))}
        </EffectContainer>
      )}
    </MasterContainer>
  );
}
export default InventoryEntry;
