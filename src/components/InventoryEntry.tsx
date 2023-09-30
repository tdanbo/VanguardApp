import * as Constants from "../Constants";
import { Qualities } from "../functions/rules/Qualities";
import { ItemEntry } from "../Types";
import { useContext } from "react";
import { useRoll } from "../functions/CombatFunctions";
import { CharacterContext } from "../contexts/CharacterContext";
import { onChangeQuantity } from "../functions/CharacterFunctions";
import {
  onDeleteItem,
  onEquipItem,
  onUnequipItem,
  onAddInventoryItem,
} from "../functions/CharacterFunctions";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

interface InventoryEntryProps {
  index: number;
  browser: boolean;
  equipped: string;
  item: ItemEntry;
  id: string;
  setInventoryState?: (inventoryState: number) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  min-height: 35px;
  max-height: 35px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
`;

const AddButton = styled.div`
  pointer: cursor;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  border-right-bottom-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const EquipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  margin-left: 5px;
`;

const NameBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex: 1;
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: bold;
`;

const TypeBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
`;

const QualityContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const QualityBox = styled.div`
  display: flex;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  width: 40px;

  font-size: 12px;
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

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

type StyledButtonProps = {
  $isequipped: boolean;
  color: string;
  index: number;
};

const EquipButton = styled.button<StyledButtonProps>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isequipped ? props.color : Constants.WIDGET_BACKGROUND};
  margin: 1px 0px 1px 1px;
  width: 20px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${(props) =>
    props.index === 0 || props.index === 2 ? Constants.BORDER_RADIUS : "unset"};
  border-bottom-left-radius: ${(props) =>
    props.index === 1 || props.index === 2 ? Constants.BORDER_RADIUS : "unset"};
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

function InventoryEntry({
  item,
  browser,
  equipped,
  id,
  setInventoryState,
}: InventoryEntryProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const HandleEquip = (item: ItemEntry, position: string) => {
    const updatedCharacter = onEquipItem({ character, item, position });
    setCharacter(updatedCharacter);
  };

  const HandleUnequip = (position: string) => {
    const updatedCharacter = onUnequipItem({ character, position });
    setCharacter(updatedCharacter);
  };

  const AddInventorySlot = () => {
    const updatedCharacter = onAddInventoryItem({ character, item });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
    if (setInventoryState) {
      setInventoryState(1);
    }
  };

  const DeleteInventorySlot = (id: string) => {
    const updatedCharacter = onDeleteItem({ id, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const onRollDice = useRoll();

  const handleRoll = () => {
    onRollDice({
      dice: item.roll.dice,
      modifier: item.roll.mod,
      count: 1,
      target: 0,
      source: item.name,
      active: "Inventory Item",
      add_mod: true,
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
    const newQuantity = item.quantity.count + 1;
    const updatedCharacter = onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
    setCharacter(updatedCharacter);
  };

  const handleMinusClick = () => {
    const newQuantity = item.quantity.count - 1;
    const updatedCharacter = onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
    setCharacter(updatedCharacter);
  };

  return (
    <Container>
      <EquipContainer>
        {item.equip === "1H" && (
          <>
            <EquipButton
              color={COLOR}
              index={0}
              key={"MH"}
              onClick={() => {
                equipHandler(item, "MH");
              }}
              $isequipped={isItemEquipped(item, "MH")}
            />
            <EquipButton
              color={COLOR}
              index={1}
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
            color={COLOR}
            index={2}
            key={"2H"}
            onClick={() => {
              equipHandler(item, "2H");
            }}
            $isequipped={isItemEquipped(item, "2H")}
          />
        )}
        {item.equip === "AR" && (
          <EquipButton
            color={COLOR}
            index={2}
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
      <NameContainer>
        <NameBox color={COLOR}>{item.name}</NameBox>
        <TypeBox>{item.type}</TypeBox>
      </NameContainer>

      <QualityContainer>
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

          return (
            <QualityBox key={index} title={titleContent}>
              {quality.slice(0, 2)}
            </QualityBox>
          );
        })}
      </QualityContainer>
      {item.quality.length > 0 && (item.roll.roll || item.quantity.bulk) && (
        <Divider />
      )}

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
      {
        browser ? (
          <AddButton onClick={() => AddInventorySlot()}>
            <FontAwesomeIcon icon={faPlus} />
          </AddButton>
        ) : equipped === "" ? (
          <AddButton onClick={() => DeleteInventorySlot(id)}>
            <FontAwesomeIcon icon={faXmark} />
          </AddButton> // else part for equipped
        ) : (
          <AddButton></AddButton>
        ) // else part for equipped
      }
    </Container>
  );
}
export default InventoryEntry;
