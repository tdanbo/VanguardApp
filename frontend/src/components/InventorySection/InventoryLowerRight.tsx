import ModifierBox from "../ModifierBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

function StatsLower() {
  return (
    <div className="flex w-1/2 grow flex-col pl-1">
      <TitleBox title={"MODIFIER"} />
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <ModifierBox type_name={"A"} type_value={0} />
      </div>
    </div>
  );
}

export default StatsLower;