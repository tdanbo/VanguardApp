import {
  faBars,
  faChevronRight,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../../Types";

import RollComponent from "../../component/RollComponent";
import { DeleteInventorySlot } from "../../functions/CharacterFunctions";
import { GetMaxSlots } from "../../functions/RulesFunctions";
import { update_session } from "../../functions/SessionsFunctions";
import {
  StyledText,
  IsArmor,
  IsWeapon,
} from "../../functions/UtilityFunctions";
import { Qualities } from "../../functions/rules/Qualities";
import { ManAtArms_dice } from "../../functions/rules/ManAtArms";
import { NaturalWeapon_dice } from "../../functions/rules/NaturalWeapon";
import { NaturalWarrior_dice } from "../../functions/rules/NaturalWarrior";
import { Berserker_dice } from "../../functions/rules/Berserker";
import { SteelThrow_dice } from "../../functions/rules/SteelThrow";
import { PolearmMastery_dice } from "../../functions/rules/PolearmMastery";
import { ShieldFighter_dice } from "../../functions/rules/ShieldFighter";
import { ArmoredMystic_dice } from "../../functions/rules/ArmoredMystic";
import { Marksman_dice } from "../../functions/rules/Marksman";
import { TwohandedForce_dice } from "../../functions/rules/TwohandedForce";
import { Armored_dice } from "../../functions/rules/Armored";
import { IronFist_dice } from "../../functions/rules/IronFist";
import { Robust_dice } from "../../functions/rules/Robust";
import { TwinAttack_dice } from "../../functions/rules/TwinAttack";
import { ItemRulesDice } from "../../functions/rules/ItemRulesDice";
import { toTitleCase } from "../../functions/UtilityFunctions";
import DurabilityComponent from "../../component/DurabilityComponent";

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

  const HandleEquip = (item: ItemEntry) => {
    item.equip.equipped = true;
    update_session(session, character, isCreature, websocket);
  };

  const HandleUnequip = () => {
    item.equip.equipped = false;
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
    update_session(session, character, isCreature, websocket);
    if (setInventoryState) {
      setInventoryState(1);
    }
  };

  const RemoveInventorySlot = (item_id: string) => {
    DeleteInventorySlot(character, item_id);
    update_session(session, character, isCreature, websocket);
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
    update_session(session, character, isCreature, websocket);
  };

  const handleMinusClick = () => {
    item.quantity.count -= 1;
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

  function GetDice() {
    let dice = item.roll.dice;
    dice += NaturalWeapon_dice(character, item);
    dice += NaturalWarrior_dice(character, item);
    dice += Berserker_dice(character, item);
    dice += ManAtArms_dice(character, item);
    dice += SteelThrow_dice(character, item);
    dice += PolearmMastery_dice(character, item);
    dice += ShieldFighter_dice(character, item);
    dice += ArmoredMystic_dice(character, item);
    dice += Marksman_dice(character, item);
    dice += TwohandedForce_dice(character, item);
    dice += Armored_dice(character, item);
    dice += IronFist_dice(character, item);
    dice += Robust_dice(character);
    dice += TwinAttack_dice(character, item);
    dice += ItemRulesDice(character, item);
    return dice;
  }

  return (
    <MasterContainer>
      <Container className="button-hover">
        <EquipContainer>
          {[1, 2, 3].includes(item.equip.slot) ? (
            <EquipButton
              color={COLOR}
              key={"2H"}
              onClick={() => {
                equipHandler(item);
              }}
              $isequipped={item.equip.equipped}
            >
              {item.equip.slot === 1 ? "I" : item.equip.slot === 2 ? "II" : ""}
            </EquipButton>
          ) : (
            <NoEquipBox key={"unequip"} color={COLOR} />
          )}
        </EquipContainer>
        <NameContainer
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          <NameBox color={COLOR}>
            {item.name}{" "}
            <CorruptionContainer>
              {item.type === "artifact" ? (
                <FontAwesomeIcon icon={faSkull} style={{ fontSize: "14px" }} />
              ) : null}
            </CorruptionContainer>
          </NameBox>
          <Row>
            <TypeBox>
              {gmMode === true && (
                <CostBox>{ConvertCurrency(item.cost)}</CostBox>
              )}
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
                  IsWeapon(item) ? "damage" : IsArmor(item) ? "armor" : "custom"
                }
                roll_source={item.name}
                isCreature={isCreature}
                dice={GetDice()}
                dice_mod={item.roll.mod}
                color={COLOR}
                item={item}
                inactive={item.equip.equipped}
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
              />
            </React.Fragment>
          ))}
        </EffectContainer>
      )}
    </MasterContainer>
  );
}
export default InventoryEntry;
