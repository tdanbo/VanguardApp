import * as Constants from "../Constants";
import { useRoll } from "../functions/CombatFunctions";
import styled from "styled-components";

type Props = {
  type_name: number;
};

const DiceContainer = styled.button`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  height: 35px;
  max-width: 49px;
`;

function DiceBox({ type_name }: Props) {
  const onRollDice = useRoll();

  const RollDice = () => {
    onRollDice({
      dice: type_name,
      modifier: 0,
      count: 1,
      target: 0,
      source: "Dice",
      active: "Custom",
      add_mod: true,
    });
  };

  return (
    <DiceContainer className="button-hover" onClick={RollDice}>
      d{type_name}
    </DiceContainer>
  );
}

export default DiceBox;
