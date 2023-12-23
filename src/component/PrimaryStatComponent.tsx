import {
  faBolt,
  faCrosshairs,
  faEye,
  faShield,
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
  flex-basis: 0;
  flex-direction: column;
  gap: 2px;
  &:hover .second-row {
    display: flex; // Or visibility: visible; if you want to keep the space reserved
  }
`;

const Row = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};

  // Hiding the second row by default
  &:nth-child(2) {
    display: none; // Or visibility: hidden; if you want to keep the space reserved
  }
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
  text-shadow: 1px 1px 1px ${Constants.BACKGROUND};
  max-width: 30px;
`;

const Modifier = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 50%;
  letter-spacing: 5px;
`;

const ValueName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  letter-spacing: 1px;
  width: 50%;
`;

const ValueButton = styled.button`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  max-width: 30px;
`;

const Plus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 0px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
`;

const Minus = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 0px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 30px;
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
      return (
        <FontAwesomeIcon
          icon={faEye}
          style={{
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        />
      );
    } else if (active === "casting") {
      return (
        <FontAwesomeIcon
          icon={faBolt}
          style={{
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        />
      );
    } else if (active === "defense") {
      return (
        <FontAwesomeIcon
          icon={faShield}
          style={{
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        />
      );
    } else if (active === "attack") {
      return (
        <FontAwesomeIcon
          icon={faCrosshairs}
          style={{
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        />
      );
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
      <Row className="button-hover first-row">
        <DiceIcon onClick={handleSkillRoll}>
          {/* <FontAwesomeIcon
            icon={faDiceD6}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          /> */}
        </DiceIcon>
        <ValueButton onClick={handleSkillRoll}>
          {value + modifier}
          <ValueName className="dice-icon-hover">{type_name}</ValueName>
        </ValueButton>

        <ActiveButton
          className="active_button"
          onClick={handleActiveClick}
          color={Constants.TYPE_COLORS[active]}
        >
          {icon(active)}
        </ActiveButton>
      </Row>
      <Row className="button-hover second-row">
        <Minus>
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          />
        </Minus>
        <Modifier
          className="mouse-icon-hover"
          onClick={subModifier}
          onContextMenu={(e) => {
            e.preventDefault();
            addModifier();
          }}
        >
          {modifier > 0 ? `+${modifier}` : modifier}
        </Modifier>
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
