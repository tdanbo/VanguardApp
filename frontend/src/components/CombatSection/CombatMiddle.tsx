import CombatEntry from "../CombatEntry";
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

function CombatMiddle({ combatLogList }: CombatLogProps) {
  return (
    <>
      <TitleBox title={"Combat"} />
      <div
        className="flex-grow-1 overflow-auto d-flex flex-column-reverse"
        style={{
          backgroundColor: Constants.DARK,
        }}
      >
        {[...combatLogList].reverse().map((item, index) => (
          <CombatEntry
            character={item.character}
            entryType={item.active}
            entryResult={item.result}
            index={index}
            key={index} // Don't forget to assign a key
          />
        ))}
      </div>
    </>
  );
}

export default CombatMiddle;
