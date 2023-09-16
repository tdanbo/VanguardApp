import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext, useState, useEffect } from "react";
import { useRoll } from "../../functions/CombatFunctions";

import styled from "styled-components";

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
    if (dict.stat === type_name.toLowerCase()) {
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

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: ${Constants.WIDGET_GAB};
  `;

  const ActiveButton = styled.button`
    display: flex;
    background-color: rgb(0, 255, 0);
    align-items: center;
    justify-content: center;
    color: ${Constants.WIDGET_SECONDARY_FONT};
    width: 50px;

    background-color: ${Constants.WIDGET_BACKGROUND};
    border: 1px solid ${Constants.WIDGET_BORDER};
    border-radius: ${Constants.BORDER_RADIUS};
  `;

  const ValueName = styled.button`
    display: flex;
    flex-grow: 1;
    background-color: rgb(0, 255, 0);
    align-items: center;
    justify-content: center;
    color: ${Constants.WIDGET_SECONDARY_FONT};
    width: 20px;
    color: ${Constants.WIDGET_SECONDARY_FONT};
    font-size: 14px;
    font-weight: bold;
    background-color: ${Constants.WIDGET_BACKGROUND};
    border: 1px solid ${Constants.WIDGET_BORDER};
    border-radius: ${Constants.BORDER_RADIUS};
  `;

  const ValueButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    color: ${Constants.WIDGET_PRIMARY_FONT};
    font-size: 1.25rem;
    font-weight: bold;
    background-color: ${Constants.WIDGET_BACKGROUND};
    border: 1px solid ${Constants.WIDGET_BORDER};
    border-radius: ${Constants.BORDER_RADIUS};
  `;

  return (
    <Container>
      <ActiveButton
        className="active_button"
        onMouseEnter={handleActiveMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleActiveRoll}
      >
        {icon(active)}
      </ActiveButton>
      <ValueName
        onMouseEnter={handleSkillMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSkillRoll}
      >
        {type_name}
      </ValueName>
      <ValueButton>{value}</ValueButton>
    </Container>
  );
}

export default StatBox;
