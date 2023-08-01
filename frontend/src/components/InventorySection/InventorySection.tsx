import * as Constants from "../../Constants";

import InventoryUpper from "./InventoryUpper";
import InventoryMiddle from "./InventoryMiddle";
import InventoryLowerLeft from "./InventoryLowerLeft";
import InventoryLowerRight from "./InventoryLowerRight";
import StatsLower from "../StatsSection/StatsLower";

import CombatLower from "../CombatSection/CombatLower";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventorySection({ selectedCharacter }: StatsSectionProps) {
  return (
    <div
      className="flex h-screen flex-col px-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper selectedCharacter={selectedCharacter} />
      <InventoryMiddle selectedCharacter={selectedCharacter} />
      <div className="flex">
        <InventoryLowerLeft />
        <InventoryLowerRight />
      </div>
    </div>
  );
}

export default InventorySection;
