import CombatLower from "./CombatLower";
import CombatMiddle from "./CombatMiddle";
import * as Constants from "../../Constants";
import InventoryMiddle from "../InventorySection/InventoryMiddle";
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
      className="flex h-screen flex-col px-1" // missing from bootstrap vh-100
      style={{ backgroundColor: Constants.DARK }}
    >
      <CombatMiddle combatLogList={combatLogList} />
      <CombatLower />
    </div>
  );
}

export default CombatSection;
