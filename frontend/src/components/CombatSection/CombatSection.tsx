import "bootstrap/dist/css/bootstrap.css";
import CombatLower from "./CombatLower";
import CombatMiddle from "./CombatMiddle";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

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
      <CombatMiddle combatLogList={combatLogList} />
      <CombatLower />
    </div>
  );
}

export default CombatSection;
