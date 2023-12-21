import {
  faBolt,
  faCrosshairs,
  faEye,
  faShield,
  faDiceD6,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { ActiveKey, CharacterEntry, SessionEntry, StatName } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { update_session } from "../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

interface DiceProps {
  color: string;
}

const ActiveButton = styled.button<DiceProps>`
  display: flex;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
  padding-top: 5px;
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
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

const ValueName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: ${Constants.WIDGET_BACKGROUND};
  letter-spacing: 1px;
  width: 50%;
`;

const ValueButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  background-color: ${Constants.WIDGET_BACKGROUND};
  p {
    font-size: 10px;
    font-weight: bold;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
  width: 50%;
`;

const DiceIcon = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
  padding-top: 5px;
`;

const Plus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
`;

const Minus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 25%;
  min-width: 25%;
`;

type Props = {
  type_name: string;
  type_value: number;
  swapSource: null | string;
  setSwapSource: (swapSource: null | string) => void;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
};

function PrimaryStatComponent({
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
      <Row>
        <DiceIcon>
          {/* <FontAwesomeIcon
            icon={faDiceD6}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          /> */}
        </DiceIcon>
        <ValueButton
          className="mouse-icon-hover button-hover"
          onClick={subModifier}
          onContextMenu={(e) => {
            e.preventDefault();
            addModifier();
          }}
        >
          {value + modifier}
          <ValueName
            className="dice-icon-hover button-hover"
            onClick={handleSkillRoll}
          >
            {type_name}
          </ValueName>
        </ValueButton>

        <ActiveButton
          className="active_button button-hover"
          onClick={handleActiveClick}
          color={Constants.TYPE_COLORS[active]}
        >
          {icon(active)}
        </ActiveButton>
      </Row>
      <Row>
        <Minus>
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Minus>
        <ModifierButton className="button-hover">
          {modifier > 0 ? `+${modifier}` : modifier}
        </ModifierButton>
        <Plus>
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Plus>
      </Row>
    </Container>
  );
}

export default PrimaryStatComponent;
