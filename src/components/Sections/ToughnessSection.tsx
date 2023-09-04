import ToughnessBox from "../ToughnessBox";
import CorruptionBox from "../CorruptionBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import RestBox from "../RestBox";

import {
  onAddToughness,
  onSubToughness,
  onAddPermCorruption,
  onSubPermCorruption,
} from "../../functions/CharacterFunctions";

function ToughnessSection() {
  return (
    <>
      <div className="flex">
        <RestBox />
        <TitleBox title={"Toughness"} />
      </div>
      <div
        className="flex grow flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionBox
          onAddFunction={onAddPermCorruption}
          onSubFunction={onSubPermCorruption}
        />
        <ToughnessBox
          onAddFunction={onAddToughness}
          onSubFunction={onSubToughness}
        />
      </div>
    </>
  );
}

export default ToughnessSection;
