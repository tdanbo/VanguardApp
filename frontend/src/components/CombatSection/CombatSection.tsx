import CombatLower from "./CombatLower";
import CombatMiddle from "./CombatMiddle";
import * as Constants from "../../Constants";
import InventoryMiddle from "../InventorySection/InventoryMiddle";
import CombatUpper from "./CombatUpper";

function CombatSection() {
  return (
    <div
      className="flex h-screen flex-col px-1" // missing from bootstrap vh-100
      style={{ backgroundColor: Constants.DARK }}
    >
      <CombatUpper />
      <CombatMiddle />
      <CombatLower />
    </div>
  );
}

export default CombatSection;
