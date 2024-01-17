import styled from "styled-components";
import {
  Dice4FillIcon,
  Dice6FillIcon,
  Dice8FillIcon,
  Dice10FillIcon,
  Dice12FillIcon,
  Dice20FillIcon,
} from "../Images";

import * as Constants from "../Constants";

type RollComponentProps = {
  dice: number;
};

type RollContainerProps = {
  dice_icon: string;
};

const RollContainer = styled.div<RollContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  min-width: 40px;
  max-height: 40px;
  max-width: 40px;
  font-weight: bold;
  font-size: 16px;
  color: ${Constants.BRIGHT_RED};
  text-align: center; /* Center text horizontally */
  line-height: 40px; /* Center text vertically */
  background-image: url(${(props) => props.dice_icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  text-shadow: 1px 1px 2px black;
  padding-right: 2px;
  padding-bottom: 2px;
`;

function RollComponent({ dice }: RollComponentProps) {
  let dice_icon = Dice20FillIcon;
  if (dice === 4) {
    dice_icon = Dice4FillIcon;
  } else if (dice === 6) {
    dice_icon = Dice6FillIcon;
  } else if (dice === 8) {
    dice_icon = Dice8FillIcon;
  } else if (dice === 10) {
    dice_icon = Dice10FillIcon;
  } else if (dice === 12) {
    dice_icon = Dice12FillIcon;
  } else if (dice === 20) {
    dice_icon = Dice20FillIcon;
  }

  return (
    <RollContainer dice_icon={dice_icon} title={`Roll d${dice}`}>
      {dice}
    </RollContainer>
  );
}

export default RollComponent;
