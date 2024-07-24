import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, GeneralItem, ItemEntry, SessionEntry } from "../Types";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";
import {
  IsArmor,
  IsConsumable,
  IsGeneralGood,
  IsTreasure,
  IsWeapon,
  toTitleCase,
} from "../functions/UtilityFunctions";
import InventoryEntry from "./InventoryEntry";

import { GetGameData } from "../contexts/GameContent";

interface EquipmentBrowserProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  isCreature: boolean;
  search: string;
  isGm: boolean;
}

function EquipmentBrowser({
  character,
  session,
  websocket,
  isCreature,
  search,
  isGm,
}: EquipmentBrowserProps) {
  const { equipment } = GetGameData();

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
  const [LootCategory, _setLootCategory] = useState<LootCategoryType>("all");

  const sortList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.RARITY_FILTER.indexOf(b.static.rarity) -
      Constants.RARITY_FILTER.indexOf(a.static.rarity);
    if (categoryComparison !== 0) {
      return categoryComparison;
    }
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
          (item) => item.static.category === "projectile",
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
        (
          item.name.toLowerCase() +
          " " +
          item.static.category.toLowerCase()
        ).includes(search.toLowerCase()),
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
    <div className="scroll_container" ref={scrollRef} style={{ width: "100%" }}>
      {filteredEquipment.map((entry, index) => {
        return (
          <InventoryEntry
            session={session}
            character={character}
            websocket={websocket}
            key={`InventoryEntry${index}`}
            browser={true}
            item={entry}
            isCreature={isCreature}
            isGm={isGm}
            state={"give"}
          />
        );
      })}
      {Array.from({ length: 30 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </div>
  );
}

export default EquipmentBrowser;
