import * as Constants from "../../Constants";

import InventoryUpper from "./InventoryUpper";
import InventoryMiddle from "./InventoryMiddle";
import InventoryLowerLeft from "./InventoryLowerLeft";
import InventoryLowerRight from "./InventoryLowerRight";

type CombatLog = {
  character: string;
  result: number;
  active: string;
  type: string;
  details: string;
};

type CombatLogProps = {
  combatLogList: CombatLog[];
};

function CombatSection({ combatLogList }: CombatLogProps) {
  return (
    <div
      className="d-flex flex-column vh-100 p-1"
      style={{ backgroundColor: Constants.DARK }}
    >
      <InventoryUpper />
      <InventoryMiddle />

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

export default CombatSection;
