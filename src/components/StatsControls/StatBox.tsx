import * as Constants from "../../Constants";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext, useState, useEffect } from "react";
import { useRoll } from "../../functions/CombatFunctions";
import { swapActives } from "../../functions/CharacterFunctions";
import styled from "styled-components";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faBolt,
  faShield,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  type_name: string;
  type_value: number;
  swapSource: null | string;
  setSwapSource: (swapSource: null | string) => void;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${Constants.WIDGET_GAB};
  height: 35px;
  max-height: 35px;
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

const ModifierButton = styled.button`
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

function StatBox({ type_name, type_value, swapSource, setSwapSource }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [value, setValue] = useState<number>(type_value);
  const [modifier, setModifier] = useState<number>(0);

  useEffect(() => {
    setValue(type_value);
  }, [type_value]);

  let active = "";
  // let active_mod = 0;

  Object.entries(character.actives).forEach(([key, dict]) => {
    if (dict.stat === type_name.toLowerCase()) {
      active = key;
      // active_mod = dict.mod;
    }
  });

  const onRollDice = useRoll();

  const handleSkillRoll = () => {
    onRollDice({
      dice: "d20",
      count: 1,
      modifier: modifier,
      target: value,
      active: type_name,
      source: "Skill Test",
      add_mod: false,
    });
    setModifier(0);
  };

  const handleActiveClick = () => {
    if (swapSource) {
      const updatedCharacter = swapActives(character, swapSource, type_name);
      setCharacter(updatedCharacter);
      setSwapSource(null);
    } else {
      setSwapSource(type_name);
    }
  };

  const icon = (active: string) => {
    if (active === "sneaking") {
      return <FontAwesomeIcon icon={faEye} />;
    } else if (active === "casting") {
      return <FontAwesomeIcon icon={faBolt} />;
    } else if (active === "defense") {
      return <FontAwesomeIcon icon={faShield} />;
    } else if (active === "attack") {
      return <FontAwesomeIcon icon={faCrosshairs} />;
    }
  };

  const addModifier = () => {
    setModifier(modifier + 1);
  };

  const subModifier = () => {
    setModifier(modifier - 1);
  };

  return (
    <Container>
      {modifier !== 0 ? (
        <ModifierButton>
          {modifier > 0 ? `+${modifier}` : modifier}
        </ModifierButton>
      ) : (
        <ActiveButton className="active_button" onClick={handleActiveClick}>
          {icon(active)}
        </ActiveButton>
      )}
      <ValueName className="dice-icon-hover" onClick={handleSkillRoll}>
        {type_name}
      </ValueName>
      <ValueButton
        className="mouse-icon-hover"
        onClick={subModifier}
        onContextMenu={(e) => {
          e.preventDefault();
          addModifier();
        }}
      >
        {value + modifier}
      </ValueButton>
    </Container>
  );
}

export default StatBox;
