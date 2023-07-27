import React from "react";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import InventoryEntry from "../InventoryEntry";

const StatsMiddle: React.FC = () => {
  return (
    <>
      <TitleBox title={"Inventory"} />
      <div
        className="flex-grow-1 overflow-auto d-flex flex-column-reverse"
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
        className="d-flex flex-column"
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
};

export default StatsMiddle;
