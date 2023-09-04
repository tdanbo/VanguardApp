import StatBox from "../StatBox";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import StatSettings from "../Modals/StatSettings";

import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function StatSection() {
  const { character } = useContext(CharacterContext);
  return (
    <>
      <div className="flex">
        <StatSettings />
        <TitleBox title={"Stats"} />
      </div>
      <div
        className="flex flex-row p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <StatBox
          type_name={"cunning"}
          type_value={character.stats.cunning.value}
        />
        <StatBox
          type_name={"discreet"}
          type_value={character.stats.discreet.value}
        />
        <StatBox
          type_name={"persuasive"}
          type_value={character.stats.persuasive.value}
        />
        <StatBox type_name={"quick"} type_value={character.stats.quick.value} />
        <StatBox
          type_name={"resolute"}
          type_value={character.stats.resolute.value}
        />
        <StatBox
          type_name={"strong"}
          type_value={character.stats.strong.value}
        />
        <StatBox
          type_name={"vigilant"}
          type_value={character.stats.vigilant.value}
        />
        <StatBox
          type_name={"accurate"}
          type_value={character.stats.accurate.value}
        />
      </div>
    </>
  );
}

export default StatSection;
