import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry } from "../Types";
import SmallStatComponent from "./SmallStatComponent";

import {
  GetMovementSpeed,
  GetPainThreshold,
  GetBurnRate,
  GetMaxSlots,
  GetUsedSlots,
} from "../functions/RulesFunctions";

import {
  faCarrot,
  faHeartCrack,
  faPersonRunning,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center 30%;
  border-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

// background-image: url("/dist/assets/portrait1.jpeg");

interface HealthBoxProps {
  character: CharacterEntry;
}

function PortraitComponent({ character }: HealthBoxProps) {
  const speed = GetMovementSpeed(character);
  const pain = GetPainThreshold(character);
  const capacity = GetMaxSlots(character) - GetUsedSlots(character);
  const burn = GetBurnRate(character);

  return (
    <Container src={CharacterPortraits[character.portrait]}>
      <SmallStatComponent
        value={speed}
        title={"speed"}
        icon={faPersonRunning}
      />
      <SmallStatComponent value={pain} title={"pain"} icon={faHeartCrack} />
      <SmallStatComponent
        value={capacity}
        title={"capacity"}
        icon={faWeightHanging}
      />
      <SmallStatComponent value={burn} title={"consumption"} icon={faCarrot} />
    </Container>
  );
}

export default PortraitComponent;
