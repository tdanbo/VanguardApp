import { cloneDeep, uniqueId } from "lodash";
import { Socket } from "socket.io-client";
import { update_session } from "./SessionsFunctions";
import { CharacterEntry, SessionEntry, ItemEntry } from "../Types";

function filterItemsWithQuantity(items: ItemEntry[]): ItemEntry[] {
  return items.filter((item) => item.quantity > 0);
}

const decrementItemQuantity = (
  lootList: ItemEntry[],
  itemId: string,
  quantity: number,
) => {
  return lootList.map((lootItem) => {
    if (lootItem.id === itemId && lootItem.quantity > 0) {
      return {
        ...lootItem,
        quantity: Math.max(lootItem.quantity - quantity, 0), // Ensure quantity doesn't go below 0
      };
    }
    return lootItem;
  });
};

function CleanEmptyItems(
  character: CharacterEntry,
  item: ItemEntry,
  quantity: number,
  session: SessionEntry,
) {
  item.quantity -= quantity;

  //   session.loot.drops = decrementItemQuantity(
  //     session.loot.drops,
  //     item.id,
  //     quantity,
  //   );
  session.loot.alchemy = decrementItemQuantity(
    session.loot.alchemy,
    item.id,
    quantity,
  );
  session.loot.armory = decrementItemQuantity(
    session.loot.armory,
    item.id,
    quantity,
  );
  session.loot.general = decrementItemQuantity(
    session.loot.general,
    item.id,
    quantity,
  );
  session.loot.novelty = decrementItemQuantity(
    session.loot.novelty,
    item.id,
    quantity,
  );

  // Use the helper function to filter items with quantity greater than 0
  character.inventory = filterItemsWithQuantity(character.inventory);

  // Apply the same for session loot categories
  session.loot.drops = filterItemsWithQuantity(session.loot.drops);
  session.loot.alchemy = filterItemsWithQuantity(session.loot.alchemy);
  session.loot.armory = filterItemsWithQuantity(session.loot.armory);
  session.loot.general = filterItemsWithQuantity(session.loot.general);
  session.loot.novelty = filterItemsWithQuantity(session.loot.novelty);
}

function SearchItem(
  character: CharacterEntry,
  target: "character" | "drops",
  item: ItemEntry,
  session: SessionEntry,
): ItemEntry | undefined {
  let found_item = undefined;
  if (target === "character") {
    found_item = character.inventory.find(
      (inventory_item) =>
        inventory_item.name === item.name && item.static.bulk === true,
    );
  } else {
    found_item = session.loot.drops.find(
      (drop_item) => drop_item.name === item.name && item.static.bulk === true,
    );
  }

  return found_item;
}

export function TakeItem(
  item: ItemEntry,
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
  quantity: number,
) {
  if (item.name === "Thaler") {
    character.coins += quantity;
  } else if (item.name === "Ration") {
    character.rations += quantity;
  } else {
    const bulk_item_exist = SearchItem(character, "character", item, session);
    if (bulk_item_exist) {
      bulk_item_exist.quantity += quantity;
    } else {
      const new_item = cloneDeep(item);
      new_item.quantity = quantity;
      new_item.id = uniqueId();
      character.inventory.push(new_item);
    }
  }
  CleanEmptyItems(character, item, quantity, session);
  update_session(session, websocket, character, isCreature);
}

export function DropItem(
  item: ItemEntry,
  character: CharacterEntry,
  session: SessionEntry,
  websocket: Socket,
  isCreature: boolean,
  quantity: number,
  destroy: boolean,
) {
  const bulk_item_exist = SearchItem(character, "drops", item, session);

  if (bulk_item_exist) {
    console.log("Bulk item exists", bulk_item_exist, quantity);
    bulk_item_exist.quantity += quantity;
  } else {
    if (!destroy) {
      const new_item = cloneDeep(item);
      new_item.id = uniqueId();
      new_item.quantity = 1;
      session.loot.drops.push(new_item);
    }
  }
  CleanEmptyItems(character, item, quantity, session);
  update_session(session, websocket, character, isCreature);
}
