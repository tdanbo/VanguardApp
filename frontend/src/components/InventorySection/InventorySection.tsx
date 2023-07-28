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
      className="d-flex flex-column vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper selectedCharacter={selectedCharacter} />
      <InventoryMiddle selectedCharacter={selectedCharacter} />

      <div className="row gx-2">
        <div className="col">
          <InventoryLowerLeft />
        </div>
        <div className="col-3">
          <InventoryLowerRight />
        </div>
      </div>
    </div>
  );
}

export default InventorySection;
