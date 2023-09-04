import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import CorruptionControls from "../CorruptionControls";

function CorruptionSection() {
  return (
    <>
      <TitleBox title={"Corruption"} />
      <div
        className="flex p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionControls />
      </div>
    </>
  );
}

export default CorruptionSection;
