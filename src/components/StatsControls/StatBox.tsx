import {
  faBolt,
  faCrosshairs,
  faEye,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import * as Constants from "../../Constants";
import { ActiveKey, CharacterEntry, SessionEntry, StatName } from "../../Types";
import { useRoll } from "../../functions/CombatFunctions";
import { update_session } from "../../functions/SessionsFunctions";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${Constants.WIDGET_GAB};
  min-height: 35px;
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

type Props = {
  type_name: string;
  type_value: number;
  swapSource: null | string;
  setSwapSource: (swapSource: null | string) => void;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: WebSocket;
  isCreature: boolean;
};

function StatBox({
  character,
  type_name,
  type_value,
  swapSource,
  setSwapSource,
  session,
  websocket,
  isCreature,
}: Props) {
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
      websocket,
      character,
      session,
      dice: 20,
      count: 1,
      modifier: modifier,
      target: value + modifier,
      active: type_name,
      source: "Skill Test",
      add_mod: false,
      isCreature,
    });
    setModifier(0);
  };

  const handleActiveClick = () => {
    if (swapSource) {
      const characterActives = character.actives;

      // Iterate over the keys (e.g., 'attack', 'defense', etc.)
      (Object.keys(characterActives) as ActiveKey[]).forEach((key) => {
        if (characterActives[key].stat === swapSource.toLowerCase()) {
          characterActives[key].stat = type_name.toLowerCase() as StatName;
        } else if (characterActives[key].stat === type_name.toLowerCase()) {
          characterActives[key].stat = swapSource.toLowerCase() as StatName;
        }
      });

      update_session(session, character, isCreature, websocket);
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
        <ModifierButton className="button-hover">
          {modifier > 0 ? `+${modifier}` : modifier}
        </ModifierButton>
      ) : (
        <ActiveButton
          className="active_button button-hover"
          onClick={handleActiveClick}
        >
          {icon(active)}
        </ActiveButton>
      )}
      <ValueName
        className="dice-icon-hover button-hover"
        onClick={handleSkillRoll}
      >
        {type_name}
      </ValueName>
      <ValueButton
        className="mouse-icon-hover button-hover"
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
