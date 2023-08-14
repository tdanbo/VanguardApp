import ModifierBox from "../ModifierBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

function StatsLower() {
  return (
    <div className="grow flex-row pr-1">
      <TitleBox title={"ACTIVE"} />
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <ModifierBox type_name={"A"} type_value={0} />
        <ModifierBox type_name={"A"} type_value={0} />
        <ModifierBox type_name={"A"} type_value={0} />
        <ModifierBox type_name={"A"} type_value={0} />
        <ModifierBox type_name={"A"} type_value={0} />
      </div>
    </div>
  );
}

export default StatsLower;
