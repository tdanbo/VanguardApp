import {
  faChevronRight,
  faXmark,
  faBars,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from "lodash/cloneDeep";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../../Constants";
import React, { Fragment } from "react";
import {
  CharacterEntry,
  EmptyArmor,
  EmptyWeapon,
  ItemEntry,
  SessionEntry,
} from "../../Types";
import { useRoll } from "../../functions/CombatFunctions";
import { GetMaxSlots } from "../../functions/RulesFunctions";
import { update_session } from "../../functions/SessionsFunctions";
import { Qualities } from "../../functions/rules/Qualities";
import { SetFlexibleEquip } from "../../functions/CharacterFunctions";
import { StyledText } from "../../functions/UtilityFunctions";
import { useState } from "react";
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
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  margin-left: 5px;
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
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
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

const EquipButtonTop = styled.button<StyledButtonProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isequipped ? props.color : Constants.WIDGET_BACKGROUND};
  margin: 1px 0px 1px 1px;
  width: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  width: 20px;
  height: 100%;
`;

const EquipButtonBottom = styled.button<StyledButtonProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isequipped ? props.color : Constants.WIDGET_BACKGROUND};
  margin: 1px 0px 1px 1px;
  width: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  width: 20px;
  height: 100%;
`;

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
`;

const QuantityBox = styled.button<RollBoxProps>`
  display: flex;
  flex-grow: 1;
  color: ${(props) => props.color};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 40px;
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
  color: rgba(255, 255, 255, 0.05);
  gap: 2px;
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
  setInventoryState?: (inventoryState: number) => void;
  gmMode: boolean;
  isCreature: boolean;
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
  gmMode,
  isCreature,
}: InventoryEntryProps) {
  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const HandleEquip = (item: ItemEntry, position: string) => {
    const equipment = character.equipment;
    const equip_item = cloneDeep(item);

    const isItemInMainHand =
      "id" in equipment.main && equipment.main.id === item.id;
    const isItemInOffHand =
      "id" in equipment.off && equipment.off.id === item.id;
    const isMainHand2H =
      "id" in equipment.main && equipment.main.equip === "2H";

    // Check if the same item is already equipped in the Main Hand (MH)
    if (position === "OH" && (isItemInMainHand || isMainHand2H)) {
      equipment.main = EmptyWeapon;
    }

    if (position === "MH") {
      equipment.main = equip_item;
      if (isItemInOffHand) {
        equipment.off = EmptyWeapon;
      }
    } else if (position === "OH") {
      equipment.off = equip_item;
    } else if (position === "2H") {
      equipment.main = equip_item;
      equipment.off = EmptyWeapon;
    } else if (position === "AR") {
      equipment.armor = equip_item;
    }

    SetFlexibleEquip(character);
    update_session(session, character, isCreature, websocket);
  };

  const HandleUnequip = (position: string) => {
    const equipment = character.equipment;

    if (position === "MH") {
      equipment.main = EmptyWeapon;
    } else if (position === "OH") {
      equipment.off = EmptyWeapon;
    } else if (position === "2H") {
      equipment.main = EmptyWeapon;
      equipment.off = EmptyWeapon;
    } else if (position === "AR") {
      equipment.armor = EmptyArmor;
    }
    SetFlexibleEquip(character);
    update_session(session, character, isCreature, websocket);
  };

  const AddInventorySlot = () => {
    console.log("Adding Item");
    const inventory = character.inventory;
    if (inventory.length === GetMaxSlots(character) * 2) {
      console.log("You can't carry any more items!");
    } else {
      const itemWithId: ItemEntry = {
        ...item,
        id: generateRandomId(),
      };
      inventory.push(itemWithId);
    }
    SetFlexibleEquip(character);
    update_session(session, character, isCreature, websocket);
    if (setInventoryState) {
      setInventoryState(1);
    }
  };

  const DeleteInventorySlot = (id: string) => {
    const inventory = character.inventory.filter((item) => item.id !== id);
    const equipment = character.equipment;
    // Check main equipment
    if (equipment.main.id === id) {
      equipment.main = EmptyWeapon;
    }

    // Check off equipment
    if (equipment.off.id === id) {
      equipment.off = EmptyWeapon;
    }

    // Check armor equipment
    if (equipment.armor.id === id) {
      equipment.armor = EmptyArmor;
    }

    character.inventory = inventory;
    character.equipment = equipment;

    SetFlexibleEquip(character);

    update_session(session, character, isCreature, websocket);
  };

  const onRollDice = useRoll();

  const handleRoll = () => {
    onRollDice({
      websocket,
      dice: item.roll.dice,
      modifier: item.roll.mod,
      count: 1,
      target: 0,
      source: item.name,
      active: "Inventory Item",
      add_mod: true,
      character,
      session,
      isCreature,
    });
  };

  const isItemEquipped = (item: ItemEntry, position: string) => {
    switch (position) {
      case "MH":
        return (
          "id" in character.equipment.main &&
          item.id === character.equipment.main.id
        );
      case "OH":
        return (
          "id" in character.equipment.off &&
          item.id === character.equipment.off.id
        );
      case "2H":
        return (
          "id" in character.equipment.main &&
          item.id === character.equipment.main.id
        );
      case "AR":
        return (
          "id" in character.equipment.armor &&
          item.id === character.equipment.armor.id
        );
      default:
        return false;
    }
  };

  const equipHandler = (item: ItemEntry, position: string) => {
    if (isItemEquipped(item, position)) {
      HandleUnequip(position);
    } else {
      HandleEquip(item, position);
    }
  };

  const handlePlusClick = () => {
    const count = item.quantity.count + 1;
    const inventory = character.inventory;
    const equipment = character.equipment;

    inventory.forEach((item) => {
      if (item.id === id) {
        item.quantity.count = count;
      }
    });

    if (equipment.main.id === id) {
      equipment.main.quantity.count = count;
    } else if (equipment.off.id === id) {
      equipment.off.quantity.count = count;
    } else if (equipment.armor.id === id) {
      equipment.armor.quantity.count = count;
    }

    update_session(session, character, isCreature, websocket);
  };

  const handleMinusClick = () => {
    const count = item.quantity.count - 1;

    const inventory = character.inventory;
    const equipment = character.equipment;

    inventory.forEach((item) => {
      if (item.id === id) {
        item.quantity.count = count;
      }
    });

    if (equipment.main.id === id) {
      equipment.main.quantity.count = count;
    } else if (equipment.off.id === id) {
      equipment.off.quantity.count = count;
    } else if (equipment.armor.id === id) {
      equipment.armor.quantity.count = count;
    }

    update_session(session, character, isCreature, websocket);
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
      value += `${shillings} Shillings `;
    }
    if (orthegs > 0) {
      value += `${orthegs} Orthegs`;
    }

    // Trim to remove any trailing whitespace
    return value.trim();
  }

  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <MasterContainer>
      <Container className="button-hover">
        <EquipContainer>
          {item.equip === "1H" && (
            <>
              <EquipButtonTop
                className={"button-hover"}
                color={COLOR}
                key={"MH"}
                onClick={() => {
                  equipHandler(item, "MH");
                }}
                $isequipped={isItemEquipped(item, "MH")}
              />
              <EquipButtonBottom
                className={"button-hover"}
                color={COLOR}
                key={"OH"}
                onClick={() => {
                  equipHandler(item, "OH");
                }}
                $isequipped={isItemEquipped(item, "OH")}
              />
            </>
          )}
          {item.equip === "2H" && (
            <EquipButton
              className={"button-hover"}
              color={COLOR}
              key={"2H"}
              onClick={() => {
                equipHandler(item, "2H");
              }}
              $isequipped={isItemEquipped(item, "2H")}
            />
          )}
          {item.equip === "AR" && (
            <EquipButton
              className={"button-hover"}
              color={COLOR}
              key={"AR"}
              onClick={() => {
                equipHandler(item, "AR");
              }}
              $isequipped={isItemEquipped(item, "AR")}
            />
          )}
          {!["1H", "2H", "AR"].includes(item.equip) && (
            <NoEquipBox key={"unequip"} color={COLOR} />
          )}
        </EquipContainer>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <NameBox color={COLOR}>{item.name}</NameBox>
          <Row>
            <TypeBox>
              {gmMode === true && (
                <CostBox>{ConvertCurrency(item.cost)}</CostBox>
              )}
              {item.type}
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
        <CorruptionContainer>
          {(item.category === "artifact" ||
            item.category === "artifact_armor" ||
            item.category === "artifact_weapon") && (
            <FontAwesomeIcon icon={faSkull} style={{ fontSize: "20px" }} />
          )}
        </CorruptionContainer>
        <RollContainer>
          {item.roll.roll === true && (
            <RollBox color={COLOR} onClick={handleRoll}>
              d{item.roll.dice}
              {item.roll.mod > 0 ? `+${item.roll.mod}` : null}
            </RollBox>
          )}
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
                onClick={() => AddInventorySlot()}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ fontSize: "12px" }}
                />
              </AddButton>
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
          ) : equipped === "" ? (
            <>
              <DeleteButton
                className={"button-hover"}
                onClick={() => DeleteInventorySlot(id)}
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
              />
            </React.Fragment>
          ))}
        </EffectContainer>
      )}
    </MasterContainer>
  );
}
export default InventoryEntry;
