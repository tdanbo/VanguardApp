import * as Constants from "../Constants";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBolt,
  faCrosshairs,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext, useEffect } from "react";
import { Active } from "../Types";
import { forEach } from "lodash";

type Props = {
  active: Active;
  active_name: string;
};

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 2px;
`;

const Value = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 2rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

const Modifier = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};

  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

type DiceProps = {
  color: string;
};

const Dice = styled.div<DiceProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  font-size: 1rem;
  font-weight: bold;
  color: ${(props) => props.color};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

function ActiveBox({ active_name, active }: Props) {
  console.log("RENDERING ActiveBox");
  const { character } = useContext(CharacterContext);

  const [modValue, setModvalue] = useState<number>(0);

  const computeActiveValue = () =>
    character.stats[active.stat].value + active.mod + modValue;
  const [value, setValue] = useState(computeActiveValue());

  const [dice, setDice] = useState<string>();

  const updateDiceForActiveName = (activeName: string) => {
    console.log("GETTING NEW DICE");
    switch (activeName) {
      case "sneaking":
        return "d20";
      case "casting":
        return "d4";
      case "defense":
        for (const invItem of character.inventory) {
          console.log("Checking inventory item:", invItem); // See each inventory item
          for (const equipItem of invItem.equip) {
            console.log("Checking equipment item:", equipItem); // See each equipment item
            if (equipItem.type === "AR" && equipItem.equipped) {
              console.log("Defense dice found:", invItem.roll.dice);
              return invItem.roll.dice;
            }
          }
        }
        break;
      case "attack":
        for (const invItem of character.inventory) {
          for (const equipItem of invItem.equip) {
            if (
              ["2H", "MH", "OH"].includes(equipItem.type) &&
              equipItem.equipped
            ) {
              console.log("Attack dice found:", invItem.roll.dice); // Debug log
              return invItem.roll.dice;
            }
          }
        }
        break;
    }
    console.log("No dice found for:", activeName); // Log if no dice value is found
    return "d4"; // Default return value when no dice is found
  };

  const handleAddValue = () => {
    const newValue = modValue + 1;
    setModvalue(newValue);
  };

  const handleSubValue = () => {
    const newValue = modValue - 1;
    setModvalue(newValue);
  };

  useEffect(() => {
    setDice(updateDiceForActiveName(active_name));
  }, [active_name, character]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [character, active]);

  useEffect(() => {
    setValue(computeActiveValue());
  }, [modValue]);

  // const icon = (active_name: string) => {
  //   if (active_name === "sneaking") {
  //     return <FontAwesomeIcon icon={faVolumeXmark} />;
  //   } else if (active_name === "casting") {
  //     return <FontAwesomeIcon icon={faBolt} />;
  //   } else if (active_name === "defense") {
  //     return <FontAwesomeIcon icon={faShieldHalved} />;
  //   } else if (active_name === "attack") {
  //     return <FontAwesomeIcon icon={faCrosshairs} />;
  //   }
  // };

  return (
    <Container>
      <Value>{value}</Value>
      <Row>
        <Modifier
          onClick={handleSubValue}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddValue();
          }}
        >
          {modValue}
        </Modifier>
        <Dice color={Constants.TYPE_COLORS[active_name]}>{dice}</Dice>
      </Row>
    </Container>
  );
}

export default ActiveBox;
