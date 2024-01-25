import styled from "styled-components";

import axios from "axios";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { API } from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";

import { useRef, useState } from "react";
import InventoryEntry from "../components/Entries/InventoryEntry";
import { IsArmor, IsWeapon } from "../functions/UtilityFunctions";

interface ContainerProps {
  height: string;
}

const FooterContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

interface DivProps {
  width: string;
}
const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

interface EquipmentBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  gmMode: boolean;
  isCreature: boolean;
  search: string;
}

function EquipmentBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  gmMode,
  isCreature,
  search,
}: EquipmentBrowserProps) {
  type LootCategoryType =
    | "all"
    | "weapon"
    | "projectile"
    | "armor"
    | "elixirs"
    | "tools";
  const scrollRef = useRef(null);
  const [equipmentList, setEquipmentList] = useState<ItemEntry[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<ItemEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.category) -
      Constants.CATEGORY_FILTER.indexOf(b.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentResponse = await axios.get(`${API}/api/equipment`);
        setEquipmentList(equipmentResponse.data);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
        // Handle the error appropriately
      }
    };

    fetchEquipment();
  }, []); // Empty dependency array to ensure it runs only once

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [search, session, LootCategory]);

  useEffect(() => {
    let filtered_equipment = equipmentList;

    switch (LootCategory) {
      case "weapon":
        filtered_equipment = equipmentList.filter((item) => IsWeapon(item));
        break;
      case "armor":
        filtered_equipment = equipmentList.filter((item) => IsArmor(item));
        break;
      case "projectile":
        filtered_equipment = equipmentList.filter(
          (item) => item.category === "projectile",
        );
        break;
      case "elixirs":
        filtered_equipment = equipmentList.filter(
          (item) => item.category === "elixir",
        );
        break;
      case "tools":
        filtered_equipment = equipmentList.filter(
          (item) => item.category === "tool",
        );
        break;
      default:
        // Keep the original list if no category matches
        break;
    }

    const sorted_items = [...filtered_equipment].sort(sortList);
    setFilteredEquipment(sorted_items); // Assuming you have a separate state for filtered and sorted items
  }, [LootCategory, equipmentList]);

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {filteredEquipment.map((entry, index) => {
            if (entry.entry === "ItemEntry") {
              return (
                <InventoryEntry
                  session={session}
                  character={character}
                  websocket={websocket}
                  key={`InventoryEntry${index}`}
                  browser={true}
                  index={index}
                  item={entry}
                  equipped={""}
                  id={""}
                  setInventoryState={setInventoryState}
                  gmMode={gmMode}
                  isCreature={isCreature}
                  canBuy={false}
                />
              );
            }
          })}
          {Array.from({ length: 30 }).map((_, index) => {
            return <InventoryEntryEmpty key={index} />;
          })}
        </ScrollColumn>
      </DynamicContainer>
      <FooterContainer height={"30px"}>
        <Button onClick={() => setLootCategory("weapon")}>Weapons</Button>
        <Button onClick={() => setLootCategory("armor")}>Ammunition</Button>
        <Button onClick={() => setLootCategory("projectile")}>Armor</Button>
        <Button onClick={() => setLootCategory("elixirs")}>Elixirs</Button>
        <Button onClick={() => setLootCategory("tools")}>Tools</Button>
      </FooterContainer>
    </>
  );
}

export default EquipmentBrowser;
