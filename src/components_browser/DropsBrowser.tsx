import styled from "styled-components";

import {
  faChevronRight,
  faCoins,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { random } from "lodash";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";
import InventoryEntryEmpty from "../components_character/InventoryEntryEmpty";

import { useRef } from "react";
import { update_session } from "../functions/SessionsFunctions";
import {
  IsArmor,
  IsConsumable,
  IsGeneralGood,
  IsTreasure,
  IsWeapon,
} from "../functions/UtilityFunctions";
import InventoryEntry from "./InventoryEntry";
import { GetGameData } from "../contexts/GameContent";

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
  scrollbar-width: none;
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
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

let creatureList: CharacterEntry[] = [];
export const exportCreatureList = creatureList;

interface CategoryButtonProps {
  category: string;
  items: ItemEntry[];
  session: SessionEntry;
  websocket: Socket;
}

function generateRandomId() {
  return Math.random()
    .toString(36)
    .substring(2, 2 + 10);
}

function CategoryButtonComponent({
  category,
  items,
  session,
  websocket,
}: CategoryButtonProps) {
  const sortShoppingList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.static.category) -
      Constants.CATEGORY_FILTER.indexOf(b.static.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

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
  isGm,
  isCreature,
  search,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
}: BrowserSectionProps) {
  const { equipment } = GetGameData();

  const scrollRef = useRef(null);

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
    const SetBulk = (item: ItemEntry) => {
      if (item.static.bulk) {
        if (item.static.category === "resource") {
          item.quantity = random(1, 8 * rarity);
        } else if (item.static.category === "projectile") {
          item.quantity = random(1, 4 * rarity);
        } else if (
          [
            "alchemy crafting material",
            "blacksmith crafting material",
            "ritual crafting material",
            "artifact crafting material",
            "siege expert crafting material",
            "poisoner crafting material",
          ].includes(item.static.category)
        ) {
          item.quantity = random(1, 2 * rarity);
        } else if (item.static.category === "poison") {
          item.quantity = random(1, 2 * rarity);
        } else if (item.static.category === "elixir") {
          item.quantity = random(1, 2 * rarity);
        } else if (item.static.category === "tool") {
          item.quantity = random(1, 1 * rarity);
        }
      }
    };

    const DidItDropChest = (item: ItemEntry) => {
      let drop = false;
      let drop_chance = 0;
      const drop_roll = random(1, 100);
      if (["Food", "Water"].includes(item.name)) {
        return false;
      }
      if (item.static.category === "resource") {
        drop_chance = 75;
      } else if (item.static.rarity === "normal") {
        drop_chance = 0.6 * rarity;
      } else if (item.static.rarity === "quality") {
        drop_chance = 0.5 * rarity;
      } else if (item.static.rarity === "mystical") {
        drop_chance = 0.4 * rarity;
      } else if (item.static.rarity === "artifact") {
        drop_chance = 0.3 * rarity;
      } else if (item.static.rarity === "unique") {
        drop_chance = 0.2 * rarity;
      } else {
        drop_chance = 0.6 * rarity;
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
      if (["Thaler", "Shilling", "Orteg"].includes(item.name)) {
        return false;
      }
      if (item.static.category === "resource") {
        drop_chance = 75;
      } else if (item.static.rarity === "normal") {
        drop_chance = 6 * rarity;
      } else if (item.static.rarity === "quality") {
        drop_chance = 5 * rarity;
      } else if (item.static.rarity === "mystical") {
        drop_chance = 4 * rarity;
      } else if (item.static.rarity === "artifact") {
        drop_chance = 3 * rarity;
      } else if (item.static.rarity === "unique") {
        drop_chance = 0; // 0.25 * rarity; uniques cant be bought
      } else {
        drop_chance = 5 * rarity;
      }

      SetBulk(item);

      if (drop_roll <= drop_chance) {
        drop = true;
      }
      return drop;
    };

    const addItemId = (item: ItemEntry) => ({
      ...item,
      id: generateRandomId(),
    });

    if (session.state === "buy") {
      session.loot.general = [];
      session.loot.armory = [];
      session.loot.alchemy = [];
      session.loot.novelty = [];

      equipment.map((item) => {
        if (IsGeneralGood(item) && item.static.cost > 0 && DidItDrop(item)) {
          session.loot.general.push(item);
        }
        if (
          (IsArmor(item) ||
            IsWeapon(item) ||
            item.static.category === "projectile") &&
          item.static.cost > 0 &&
          DidItDrop(item)
        ) {
          session.loot.armory.push(addItemId(item));
        }
        if (
          (IsConsumable(item) || item.static.category === "ritual scroll") &&
          item.static.cost > 0 &&
          DidItDrop(item)
        ) {
          session.loot.alchemy.push(addItemId(item));
        }
        if (IsTreasure(item) && item.static.cost > 0 && DidItDrop(item)) {
          session.loot.novelty.push(addItemId(item));
        }
      });
    } else {
      session.loot.drops = [];
      equipment.map((item) => {
        if (item.static.cost > 0 && DidItDropChest(item)) {
          session.loot.drops.push(item);
        }
      });
    }
    update_session(session, websocket);
  };

  const HandleCategoryChange = () => {
    if (session.state === "buy") {
      session.state = "take";
    } else {
      session.state = "buy";
    }
    update_session(session, websocket);
  };

  const sortShoppingList = (a: ItemEntry, b: ItemEntry) => {
    const categoryComparison =
      Constants.CATEGORY_FILTER.indexOf(a.static.category) -
      Constants.CATEGORY_FILTER.indexOf(b.static.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  return (
    <>
      <DynamicContainer>
        <ScrollColumn ref={scrollRef} width="100%">
          {session.loot.drops.sort(sortShoppingList).map((entry, index) => {
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
                canBuy={session.state === "buy" ? true : false}
                isGm={isGm}
                advantage={advantage}
                activeState={activeState}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
              />
            );
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
                  HandleCategoryChange();
                }}
              >
                <FontAwesomeIcon
                  icon={session.state === "buy" ? faCoins : faChevronRight}
                  size={"lg"}
                  color={
                    session.state === "buy"
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
