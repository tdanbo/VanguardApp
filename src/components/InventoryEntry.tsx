import * as Constants from "../Constants";

import { ItemEntry, EquipEntry } from "../Types";
import Quantity from "./Modals/Quantity";
import { useContext } from "react";
import { useRoll } from "../functions/CombatFunctions";
import { CharacterContext } from "../contexts/CharacterContext";
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
  setInventoryState: (inventoryState: number) => void;
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
    props.index === 0 ? Constants.BORDER_RADIUS : "unset"};
  border-bottom-left-radius: ${(props) =>
    props.index === 1 ? Constants.BORDER_RADIUS : "unset"};
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

function InventoryEntry({
  item,
  browser,
  equipped,
  id,
  setInventoryState,
}: InventoryEntryProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const HandleEquip = (item: ItemEntry, equipItem: EquipEntry) => {
    if (equipItem.equipped === true) {
      const updatedCharacter = onUnequipItem({ character, item, equipItem });
      setCharacter(updatedCharacter);
    } else {
      const updatedCharacter = onEquipItem({ character, item, equipItem });
      setCharacter(updatedCharacter);
    }
  };

  const AddInventorySlot = () => {
    const updatedCharacter = onAddInventoryItem({ character, item });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
    setInventoryState(1);
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
      modifier: 0,
      count: 1,
      target: 0,
      source: item.name,
      active: "Inventory Item",
      add_mod: true,
    });
  };

  return (
    <Container>
      <EquipContainer>
        {item.equip.map((equip_item, index) => (
          <EquipButton
            $isequipped={equip_item.equipped}
            color={COLOR}
            index={index}
            key={index}
            onClick={() => HandleEquip(item, equip_item)}
          ></EquipButton>
        ))}
        {item.equip.length === 0 && (
          <NoEquipBox key={"unequip"} color={COLOR}></NoEquipBox>
        )}
      </EquipContainer>
      <NameContainer>
        <NameBox color={COLOR}>{item.name}</NameBox>
        <TypeBox>{item.type}</TypeBox>
      </NameContainer>

      <QualityContainer>
        {item.quality.map((item, index) => (
          <QualityBox key={index}>{item.slice(0, 2)}</QualityBox>
        ))}
      </QualityContainer>
      <Divider />
      <RollContainer>
        {item.roll.roll === true && (
          <RollBox color={COLOR} onClick={handleRoll}>
            {item.roll.dice}
          </RollBox>
        )}
        {item.quantity.bulk === true && <Quantity item={item} />}
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
