import * as Constants from "../../Constants";

import InventoryUpper from "./InventoryUpper";
import InventoryMiddle from "./InventoryMiddle";
import InventoryLowerLeft from "./InventoryLowerLeft";
import InventoryLowerRight from "./InventoryLowerRight";

function InventorySection() {
  return (
    <div
      className="flex h-screen flex-col px-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper />
      <InventoryMiddle />
      <div className="flex">
        <InventoryLowerLeft />
        <InventoryLowerRight />
      </div>
    </div>
  );
}

export default InventorySection;
