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
      className="flex h-screen flex-col p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper selectedCharacter={selectedCharacter} />
      <InventoryMiddle selectedCharacter={selectedCharacter} />

      <div className="gx-2 flex  flex-wrap">
        <div className="relative max-w-full flex-1 flex-grow px-4">
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
