import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext, useState, useEffect } from "react";
import { useRoll } from "../../functions/CombatFunctions";

import "./StatsControls.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeXmark,
  faBolt,
  faShieldHalved,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  const { character } = useContext(CharacterContext);
  const [value, setValue] = useState<number>(type_value);

  useEffect(() => {
    setValue(type_value);
  }, [type_value]);

  let active = "";
  let active_mod = 0;

  Object.entries(character.actives).forEach(([key, dict]) => {
    if (dict.stat === type_name) {
      active = key;
      active_mod = dict.mod;
    }
  });

  const handleSkillMouseEnter = () => {
    setValue(type_value + character.details.modifier);
  };

  const handleActiveMouseEnter = () => {
    setValue(type_value + active_mod + character.details.modifier);
  };

  const handleMouseLeave = () => {
    setValue(type_value);
  };

  const onRollDice = useRoll();

  const handleSkillRoll = () => {
    onRollDice({
      dice: "d20",
      count: 1,
      target: value,
      type: type_name,
      add_mod: false,
    });
  };

  const handleActiveRoll = () => {
    onRollDice({
      dice: "d20",
      count: 1,
      target: value,
      type: active,
      add_mod: false,
    });
  };

  const icon = (active: string) => {
    if (active === "sneaking") {
      return <FontAwesomeIcon icon={faVolumeXmark} />;
    } else if (active === "casting") {
      return <FontAwesomeIcon icon={faBolt} />;
    } else if (active === "defense") {
      return <FontAwesomeIcon icon={faShieldHalved} />;
    } else if (active === "attack") {
      return <FontAwesomeIcon icon={faCrosshairs} />;
    }
  };

  return (
    <div className="stats_div">
      <button
        className="active_button"
        onMouseEnter={handleActiveMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleActiveRoll}
      >
        {icon(active)}
      </button>
      <div
        className="flex grow items-center rounded-br"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 0px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
        onMouseEnter={handleSkillMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSkillRoll}
      >
        {type_name.toUpperCase()}
      </div>
      <div className="value_button">{value}</div>
    </div>
  );
}

export default StatBox;
