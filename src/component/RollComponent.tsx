import styled from "styled-components";
import {
  Dice10FillIcon,
  Dice12FillIcon,
  Dice20FillIcon,
  Dice4FillIcon,
  Dice6FillIcon,
  Dice8FillIcon,
} from "../Images";

import * as Constants from "../Constants";

type RollComponentProps = {
  dice: number;
  dice_mod?: number;
  color?: string;
};

type RollContainerProps = {
  dice_icon: string;
  dice_size: string;
  color: string;
};

const RollContainer = styled.div<RollContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 35px;
  min-width: 35px;
  max-height: 35px;
  max-width: 35px;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.color};
  text-align: center; /* Center text horizontally */
  line-height: 35px; /* Center text vertically */
  background-image: url(${(props) => props.dice_icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: ${(props) => props.dice_size};
  text-shadow: 1px 1px 2px black;
  padding-right: 2px;
  padding-bottom: 2px;
`;

function RollComponent({ dice, dice_mod = 0, color = Constants.WIDGET_SECONDARY_FONT }: RollComponentProps) {
  let dice_icon = Dice20FillIcon;
  let dice_size = "60%";
  if (dice === 4) {
    dice_icon = Dice4FillIcon;
    dice_size = "65%";
  } else if (dice === 6) {
    dice_icon = Dice6FillIcon;
  } else if (dice === 8) {
    dice_icon = Dice8FillIcon;
    dice_size = "65%";
  } else if (dice === 10) {
    dice_icon = Dice10FillIcon;
    dice_size = "65%";
  } else if (dice === 12) {
    dice_icon = Dice12FillIcon;
  } else if (dice === 20) {
    dice_icon = Dice20FillIcon;
  } else if (dice === 100) {
    dice_icon = Dice20FillIcon;
  }

  return (
    <RollContainer dice_icon={dice_icon} dice_size = {dice_size} color = {color} title={`Roll d${dice}`}>
      d{dice}{dice_mod > 0 ? `+${dice_mod}` : null}
    </RollContainer>
  );
}

export default RollComponent;
