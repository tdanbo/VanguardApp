import * as Constants from "../Constants";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext, useState, useEffect } from "react";
import { useRoll } from "../functions/CombatFunctions";

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
  const { character, setCharacter } = useContext(CharacterContext);
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
    <div className="flex w-full flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        {value}
      </div>
      <div className="flex">
        {active === "" ? ( // if active is an empty string
          <div
            className="flex h-7 grow items-center justify-center rounded-b"
            style={{
              backgroundColor: Constants.PRIMARY_LIGHTER,
              border: `1px solid ${Constants.BORDER_LIGHT}`,
              margin: "2px 2px 2px 2px",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
            onMouseEnter={handleSkillMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleSkillRoll}
          >
            {type_name.toUpperCase()}
          </div>
        ) : (
          <>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-bl "
              src={`src/assets/icons/${active}.png`}
              style={{
                backgroundColor: Constants.PRIMARY_LIGHTER,
                borderLeft: `1px solid ${Constants.BORDER_LIGHT}`,
                borderBottom: `1px solid ${Constants.BORDER_LIGHT}`,
                borderTop: `1px solid ${Constants.BORDER_LIGHT}`,
                margin: "2px 0px 2px 2px",
                fontSize: "1.0rem",
                padding: "4px",
              }}
              onMouseEnter={handleActiveMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleActiveRoll}
            >
              {icon(active)}
            </button>
            <div
              className="flex h-7 grow items-center justify-center rounded-br pr-6"
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
          </>
        )}
      </div>
    </div>
  );
}

export default StatBox;
