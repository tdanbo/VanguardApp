import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { ActivesEntry, CharacterEntry } from "../Types";
import {
  GetBurnRate,
  GetMaxSlots,
  GetMovementSpeed,
  GetPainThreshold,
  GetUsedSlots,
} from "../functions/RulesFunctions";
import InfoComponent from "./InfoComponent";
import SmallStatComponent from "./SmallStatComponent";

import {
  faCarrot,
  faHeartCrack,
  faPersonRunning,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import ActiveStateComponent from "./ActiveStateComponent";
interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center 30%;
  border-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-end;
`;

// background-image: url("/dist/assets/portrait1.jpeg");

interface HealthBoxProps {
  character: CharacterEntry;
  actives: ActivesEntry;
}

function PortraitComponent({ character, actives }: HealthBoxProps) {
  const speed = GetMovementSpeed(character);
  const pain = GetPainThreshold(character);
  const capacity = GetMaxSlots(character) - GetUsedSlots(character);
  const burn = GetBurnRate(character);

  return (
    <Container src={CharacterPortraits[character.portrait]}>
      <Column>
        <SmallStatComponent
          value={speed.toString()}
          title={"speed"}
          icon={faPersonRunning}
        />
        <SmallStatComponent
          value={pain.toString()}
          title={"pain"}
          icon={faHeartCrack}
        />
        <SmallStatComponent
          value={capacity.toString()}
          title={"capacity"}
          icon={faWeightHanging}
        />
        <SmallStatComponent
          value={burn.toString()}
          title={"consumption"}
          icon={faCarrot}
        />
      </Column>
      <RightColumn>
        <InfoComponent character={character} actives={actives} />
        <ActiveStateComponent />
      </RightColumn>
    </Container>
  );
}

export default PortraitComponent;
