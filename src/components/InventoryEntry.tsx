import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cloneDeep from "lodash/cloneDeep";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, EmptyArmor, EmptyWeapon, ItemEntry, SessionEntry } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { GetMaxSlots } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { Qualities } from "../functions/rules/Qualities";
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

const CostBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.4);
  font-size: 10px;
  margin-left: 5px;
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

interface InventoryEntryProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: WebSocket;
  index: number;
  browser: boolean;
  equipped: string;
  item: ItemEntry;
  id: string;
  setInventoryState?: (inventoryState: number) => void;
  gmMode: boolean;
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
}: InventoryEntryProps) {
  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const HandleEquip = (item: ItemEntry, position: string) => {
    const equipment = character.equipment;
  
    const isItemInMainHand =
      "id" in equipment.main && equipment.main.id === item.id;
    const isItemInOffHand = "id" in equipment.off && equipment.off.id === item.id;
    const isMainHand2H = "id" in equipment.main && equipment.main.equip === "2H";
  
    // Check if the same item is already equipped in the Main Hand (MH)
    if (position === "OH" && (isItemInMainHand || isMainHand2H)) {
      equipment.main = EmptyWeapon;
    }
  
    if (position === "MH") {
      equipment.main = cloneDeep(item);
      if (isItemInOffHand) {
        equipment.off = EmptyWeapon;
      }
    } else if (position === "OH") {
      equipment.off = cloneDeep(item);
    } else if (position === "2H") {
      equipment.main = cloneDeep(item);
      equipment.off = EmptyWeapon;
    } else if (position === "AR") {
      equipment.armor = cloneDeep(item);
    }
  
    update_session(session, websocket);
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
  
    update_session(session, websocket);
  };

  const AddInventorySlot = () => {
    console.log("Adding Item")
    const inventory = character.inventory;
    if (inventory.length === GetMaxSlots(character) * 2) {
      console.log("You can't carry any more items!")
    } else {
      const itemWithId: ItemEntry = {
        ...item,
        id: generateRandomId(),
      };
      inventory.push(itemWithId)    
    }
    update_session(session, websocket);
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

      update_session(session, websocket);
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
      character,
      session,
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
  
    update_session(session, websocket);
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
  
    update_session(session, websocket);
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

  return (
    <Container>
      <EquipContainer>
        {item.equip === "1H" && (
          <>
            <EquipButton
              className={"button-hover"}
              color={COLOR}
              index={0}
              key={"MH"}
              onClick={() => {
                equipHandler(item, "MH");
              }}
              $isequipped={isItemEquipped(item, "MH")}
            />
            <EquipButton
              className={"button-hover"}
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
            className={"button-hover"}
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
            className={"button-hover"}
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
        <TypeBox>
          {item.type}
          {gmMode === true && <CostBox>{ConvertCurrency(item.cost)}</CostBox>}
        </TypeBox>{" "}
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
          <AddButton
            className={"button-hover"}
            onClick={() => AddInventorySlot()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </AddButton>
        ) : equipped === "" ? (
          <AddButton
            className={"button-hover"}
            onClick={() => DeleteInventorySlot(id)}
          >
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
