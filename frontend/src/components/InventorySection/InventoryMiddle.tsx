import React from "react";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventoryMiddle({ selectedCharacter }: StatsSectionProps) {
  return (
    <>
      <TitleBox title={"Inventory"} />
      <div
        className="flex-grow-1 overflow-auto flex flex-col-reverse"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        <InventoryEntry index={1} />
        <InventoryEntry index={2} />
        <InventoryEntry index={3} />
        <InventoryEntry index={4} />
        <InventoryEntry index={5} />
        <InventoryEntry index={6} />
        <InventoryEntry index={1} />
        <InventoryEntry index={2} />
        <InventoryEntry index={3} />
        <InventoryEntry index={4} />
        <InventoryEntry index={5} />
        <InventoryEntry index={6} />
        <InventoryEntry index={1} />
        <InventoryEntry index={2} />
        <InventoryEntry index={3} />
        <InventoryEntry index={4} />
        <InventoryEntry index={5} />
        <InventoryEntry index={6} />
      </div>
      <TitleBox title={"Equipment"} />
      <div
        className="flex flex-col"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        <InventoryEntry index={1} />
        <InventoryEntry index={2} />
        <InventoryEntry index={3} />
        <InventoryEntry index={4} />
      </div>
    </>
  );
}

export default InventoryMiddle;
