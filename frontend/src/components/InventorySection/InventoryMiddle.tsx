import React from "react";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";
import OpenEquipmentBrowser from "../EquipmentBrowser/OpenEquipmentBrowser";
import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventoryMiddle({ selectedCharacter }: StatsSectionProps) {
  return (
    <>
      <div className="flex">
        <OpenEquipmentBrowser />
        <TitleBox title={"Inventory"} />
      </div>
      <div
        className="flex flex-grow flex-col-reverse overflow-auto"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      ></div>
      <TitleBox title={"Equipment"} />
      <div
        className="flex flex-col"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      ></div>
    </>
  );
}

export default InventoryMiddle;
