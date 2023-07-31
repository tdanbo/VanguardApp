import * as Constants from "../../Constants";

import InventoryUpper from "./InventoryUpper";
import InventoryMiddle from "./InventoryMiddle";
import InventoryLowerLeft from "./InventoryLowerLeft";
import InventoryLowerRight from "./InventoryLowerRight";

import { CharacterEntry } from "../../Types";

interface StatsSectionProps {
  selectedCharacter: CharacterEntry;
}

function InventorySection({ selectedCharacter }: StatsSectionProps) {
  return (
    <div
      className="flex flex-col h-screen p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper selectedCharacter={selectedCharacter} />
      <InventoryMiddle selectedCharacter={selectedCharacter} />

      <div className="flex flex-wrap  gx-2">
        <div className="relative flex-grow max-w-full flex-1 px-4">
          <InventoryLowerLeft />
        </div>
        <div className="w-1/4">
          <InventoryLowerRight />
        </div>
      </div>
    </div>
  );
}

export default InventorySection;
