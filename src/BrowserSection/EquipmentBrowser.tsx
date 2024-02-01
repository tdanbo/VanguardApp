import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  CharacterEntry,
  GeneralItem,
  ItemEntry,
  SessionEntry,
} from "../Types";
import InventoryEntry from "../components/Entries/InventoryEntry";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";
import {
  IsArmor,
  IsConsumable,
  IsGeneralGood,
  IsTreasure,
  IsWeapon,
  toTitleCase,
} from "../functions/UtilityFunctions";

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
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
  font-size: 14px;
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
  scrollbar-width: none;
`;

interface EquipmentBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  gmMode: boolean;
  isCreature: boolean;
  search: string;
  equipment: ItemEntry[];
  isGm: boolean;
  advantage: boolean;
  activeState: ActiveStateType;
}

function EquipmentBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  isCreature,
  search,
  equipment,
  isGm,
  advantage,
  activeState,
}: EquipmentBrowserProps) {
  type LootCategoryType =
    | "all"
    | "weapon"
    | "projectile"
    | "armor"
    | "elixirs"
    | "general goods"
    | "consumables"
    | "treasure";

  const scrollRef = useRef(null);
  const [filteredEquipment, setFilteredEquipment] = useState<ItemEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.category) -
      Constants.CATEGORY_FILTER.indexOf(b.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    // // If categories are the same, then compare by rarity
    // const rarityComparison =
    //   Constants.RARITY_FILTER.indexOf(a.type) -
    //   Constants.RARITY_FILTER.indexOf(b.type);

    // return rarityComparison;
    return 0;
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = 0;
    }
  }, [search, LootCategory]);

  useEffect(() => {
    let filtered_equipment = equipment;

    switch (LootCategory) {
      case "weapon":
        filtered_equipment = equipment.filter((item) => IsWeapon(item));
        break;
      case "armor":
        filtered_equipment = equipment.filter((item) => IsArmor(item));
        break;
      case "projectile":
        filtered_equipment = equipment.filter(
          (item) => item.category === "projectile",
        );
        break;
      case "consumables":
        filtered_equipment = equipment.filter((item) => IsConsumable(item));
        break;
      case "general goods":
        filtered_equipment = equipment.filter((item) => IsGeneralGood(item));
        break;
      case "treasure":
        filtered_equipment = equipment.filter((item) => IsTreasure(item));
        break;
      default:
        // Keep the original list if no category matches
        break;
    }

    const sorted_items = [...filtered_equipment].sort(sortList);

    if (search.length > 2) {
      const searched_item = sorted_items.filter((item) =>
        (item.name.toLowerCase() + " " + item.category.toLowerCase()).includes(
          search.toLowerCase(),
        ),
      );

      if (searched_item.length === 0) {
        const new_item = cloneDeep(GeneralItem);
        new_item.name = toTitleCase(search);
        setFilteredEquipment([new_item]);
      } else {
        setFilteredEquipment(searched_item);
      }
    } else {
      setFilteredEquipment(sorted_items);
    }
  }, [LootCategory, equipment, search]);

  // useEffect(() => {
  //   const searched_sorted_items = filteredEquipment.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase()),
  //   );
  //   setFilteredEquipment(searched_sorted_items);
  // }, [search, LootCategory]);

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
                  isCreature={isCreature}
                  canBuy={false}
                  isGm={isGm}
                  advantage={advantage}
                  activeState={activeState}
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
        <Button onClick={() => setLootCategory("armor")}>Armor</Button>
        <Button onClick={() => setLootCategory("projectile")}>
          Projectile
        </Button>
        <Button onClick={() => setLootCategory("general goods")}>
          General Goods
        </Button>
        <Button onClick={() => setLootCategory("consumables")}>
          Consumables
        </Button>
        <Button onClick={() => setLootCategory("treasure")}>Treasure</Button>
      </FooterContainer>
    </>
  );
}

export default EquipmentBrowser;
