import styled from "styled-components";

import {
  faChevronRight,
  faCoins,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { random } from "lodash";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { API } from "../Constants";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";

import { useRef, useState } from "react";
import InventoryEntry from "../components/Entries/InventoryEntry";
import { update_session } from "../functions/SessionsFunctions";

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

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

const ClearButton = styled.button`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  max-width: 30px;
  margin-right: 20px;
`;

const CategoryButton = styled.button`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

type CategoryTypeProps = {
  $isfirst?: boolean;
};

const ValueSelector = styled.div<CategoryTypeProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: ${(props) => (props.$isfirst ? "1px" : "0px")} solid
    ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${(props) => (props.$isfirst ? "5px" : "0px")};
  border-bottom-left-radius: ${(props) => (props.$isfirst ? "5px" : "0px")};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  max-width: 30px;
  height: 100%px;
`;

const CategoryInput = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};

  border-radius: 0px 5px 5px 0px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 12px;
  justify-content: center;
  align-items: center;
  max-width: 30px;
  min-width: 30px;
`;

interface BrowserSectionProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  setInventoryState: (state: number) => void;
  gmMode: boolean;
  isGm: boolean;
  isCreature: boolean;
  search: string;
}

let creatureList: CharacterEntry[] = [];
export const exportCreatureList = creatureList;

interface CategoryButtonProps {
  category: string;
  items: ItemEntry[];
  session: SessionEntry;
  websocket: Socket;
}

const sortShoppingList = (a: ItemEntry, b: ItemEntry) => {
  const categoryComparison =
    Constants.CATEGORY_FILTER.indexOf(a.category) -
    Constants.CATEGORY_FILTER.indexOf(b.category);

  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  return 0;
};

function CategoryButtonComponent({
  category,
  items,
  session,
  websocket,
}: CategoryButtonProps) {
  const AddItemToDrops = () => {
    const sorted_items = [...items].sort(sortShoppingList);
    session.loot.drops = sorted_items;
    update_session(session, websocket);
  };

  return (
    <CategoryButton className={"button-hover"} onClick={() => AddItemToDrops()}>
      {category}
      {items.length > 0 ? ` (${items.length})` : ""}
    </CategoryButton>
  );
}

function DropsBrowser({
  character,
  session,
  websocket,
  setInventoryState,
  gmMode,
  isGm,
  isCreature,
  search,
}: BrowserSectionProps) {
  const [equipmentList, setEquipmentList] = useState<ItemEntry[]>([]);
  const [LootCategory, setLootCategory] = useState<LootCategoryType>("town");
  const scrollRef = useRef(null);
  type LootCategoryType = "treasure" | "town";

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
  }, [search, session]);

  const ClearLoot = () => {
    session.loot.drops = [];
    update_session(session, websocket);
  };

  const gatherEquipment = (rarity: number) => () => {
    const general = ["container", "tool", "projectile", "resource"];

    const armory = [
      // "natural armor",
      // "natural weapon",
      "short weapon",
      "one-hand weapon",
      "long weapon",
      "heavy weapon",
      "ranged weapon",
      "throwing weapon",
      "light armor",
      "medium armor",
      "heavy armor",
    ];

    const alchemy = ["elixir", "armor accessory", "weapon accessory"];
    const novelty = ["treasure"];

    const SetBulk = (item: ItemEntry) => {
      if (item.quantity.bulk) {
        if (item.category === "resource") {
          item.quantity.count = random(1, 8 * rarity);
        } else if (item.category === "projectile") {
          item.quantity.count = random(1, 4 * rarity);
        } else if (item.category === "elixir") {
          item.quantity.count = random(1, 2 * rarity);
        } else if (item.category === "tool") {
          item.quantity.count = random(1, 1 * rarity);
        }
      }
    };

    const DidItDropChest = (item: ItemEntry) => {
      let drop = false;
      let drop_chance = 0;
      const drop_roll = random(1, 100);
      if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
        drop_chance = 75;
      } else if (item.type === "normal") {
        drop_chance = 0.625 * rarity;
      } else if (item.type === "quality") {
        drop_chance = 0.418 * rarity;
      } else if (item.type === "lesser artifact") {
        drop_chance = 0.28 * rarity;
      } else if (item.type === "mystical") {
        drop_chance = 0.187 * rarity;
      } else if (item.type === "artifact") {
        drop_chance = 0.125 * rarity;
      } else {
        drop_chance = 0.625 * rarity;
      }

      SetBulk(item);

      if (drop_roll <= drop_chance) {
        drop = true;
      }
      return drop;
    };

    const DidItDrop = (item: ItemEntry) => {
      let drop = false;
      let drop_chance = 0;
      const drop_roll = random(1, 100);
      if (item.category === "resource") {
        drop_chance = 75;
      } else if (item.type === "normal") {
        drop_chance = 5 * rarity;
      } else if (item.type === "quality") {
        drop_chance = 2.36 * rarity;
      } else if (item.type === "lesser artifact") {
        drop_chance = 1.12 * rarity;
      } else if (item.type === "mystical") {
        drop_chance = 0.53 * rarity;
      } else if (item.type === "artifact") {
        drop_chance = 0.25 * rarity;
      } else {
        drop_chance = 5 * rarity;
      }

      SetBulk(item);

      if (drop_roll <= drop_chance) {
        drop = true;
      }
      return drop;
    };

    const generateRandomId = (length = 10) => {
      return Math.random()
        .toString(36)
        .substring(2, 2 + length);
    };

    const addItemId = (item: ItemEntry) => ({
      ...item,
      id: generateRandomId(),
    });

    if (LootCategory === "town") {
      session.loot.general = equipmentList
        .filter(
          (item) =>
            general.includes(item.category) && item.cost > 0 && DidItDrop(item),
        )
        .map(addItemId);

      session.loot.armory = equipmentList
        .filter(
          (item) =>
            armory.includes(item.category) && item.cost > 0 && DidItDrop(item),
        )
        .map(addItemId);

      session.loot.alchemy = equipmentList
        .filter(
          (item) =>
            alchemy.includes(item.category) && item.cost > 0 && DidItDrop(item),
        )
        .map(addItemId);

      session.loot.novelty = equipmentList
        .filter(
          (item) =>
            novelty.includes(item.category) && item.cost > 0 && DidItDrop(item),
        )
        .map(addItemId);
    } else {
      const chest_item_list = equipmentList
        .filter((item) => item.cost > 0 && DidItDropChest(item))
        .map(addItemId);
      session.loot.drops = [...chest_item_list].sort(sortShoppingList);
    }

    update_session(session, websocket);
  };

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {session.loot.drops.map((entry, index) => {
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
                  canBuy={LootCategory === "town" ? true : false}
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
        {isGm ? (
          <>
            <ClearButton className={"button-hover"} onClick={() => ClearLoot()}>
              <FontAwesomeIcon icon={faXmark} />
            </ClearButton>
            <CategoryButtonComponent
              category={"General"}
              session={session}
              websocket={websocket}
              items={session.loot.general}
            />
            <CategoryButtonComponent
              category={"Armory"}
              session={session}
              websocket={websocket}
              items={session.loot.armory}
            />
            <CategoryButtonComponent
              category={"Alchemy"}
              session={session}
              websocket={websocket}
              items={session.loot.alchemy}
            />
            <CategoryButtonComponent
              category={"Novelty"}
              session={session}
              websocket={websocket}
              items={session.loot.novelty}
            />
            <Row>
              <ValueSelector
                onClick={gatherEquipment(1)}
                $isfirst={true}
                className={"button-hover"}
              >
                1
              </ValueSelector>
              <ValueSelector
                onClick={gatherEquipment(2)}
                className={"button-hover"}
              >
                2
              </ValueSelector>
              <ValueSelector
                onClick={gatherEquipment(3)}
                className={"button-hover"}
              >
                3
              </ValueSelector>
              <ValueSelector
                onClick={gatherEquipment(4)}
                className={"button-hover"}
              >
                4
              </ValueSelector>
              <ValueSelector
                onClick={gatherEquipment(5)}
                className={"button-hover"}
              >
                5
              </ValueSelector>
              <CategoryInput
                className={"button-hover"}
                onClick={() => {
                  LootCategory === "town"
                    ? setLootCategory("treasure")
                    : setLootCategory("town");
                }}
              >
                <FontAwesomeIcon
                  icon={LootCategory === "town" ? faCoins : faChevronRight}
                  size={"lg"}
                  color={
                    LootCategory === "town"
                      ? "#f5c542"
                      : Constants.WIDGET_SECONDARY_FONT
                  }
                />
              </CategoryInput>
            </Row>
          </>
        ) : null}
      </FooterContainer>
    </>
  );
}

export default DropsBrowser;
