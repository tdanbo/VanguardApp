import StatBox from "./StatBox";

import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

import "./StatsControls.css";

function StatsControls() {
  const { character } = useContext(CharacterContext);
  return (
    <div className="stats_container">
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
      <StatBox type_name={"strong"} type_value={character.stats.strong.value} />
      <StatBox
        type_name={"vigilant"}
        type_value={character.stats.vigilant.value}
      />
      <StatBox
        type_name={"accurate"}
        type_value={character.stats.accurate.value}
      />
    </div>
  );
}

export default StatsControls;
