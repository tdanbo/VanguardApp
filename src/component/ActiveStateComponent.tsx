import { mdiBullseye, mdiShield, mdiStar, mdiSwordCross } from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { ActiveStateType } from "../Types";

interface InfoProps {
  active: boolean;
}

const InfoBox = styled.div<InfoProps>`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) =>
    props.active ? "#dfdfdf" : Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#252827" : "#7a7a7a")};
  border-radius: ${Constants.BORDER_RADIUS};
  width: 25px;
  height: 25px;
  margin: 2px;
  padding-bottom: 2px;
  cursor: pointer;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  center-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

function ActiveStateComponent() {
  const [activeState, setActiveState] = useState<ActiveStateType>("normal");
  const [advantage, setAdvantage] = useState<boolean>(false);

  const HandleActive = (state: ActiveStateType) => {
    if (activeState === state) {
      setActiveState("normal");
    } else {
      setActiveState(state);
    }
  };

  const HandleAdvantage = (state: boolean) => {
    if (advantage === state) {
      setAdvantage(false);
    } else {
      setAdvantage(state);
    }
  };

  return (
    <Container>
      <InfoBox
        title={"Full Offense"}
        onClick={() => HandleActive("full offense")}
        active={activeState === "full offense"}
      >
        <Icon path={mdiSwordCross} size={0.75} />
      </InfoBox>
      <InfoBox
        title={"Full Defense"}
        onClick={() => HandleActive("full defense")}
        active={activeState === "full defense"}
      >
        <Icon path={mdiShield} size={0.75} />
      </InfoBox>
      <InfoBox
        title={"Careful Aim"}
        onClick={() => HandleActive("careful aim")}
        active={activeState === "careful aim"}
      >
        <Icon path={mdiBullseye} size={0.75} />
      </InfoBox>
      <InfoBox
        title={"Advantage"}
        onClick={() => HandleAdvantage(true)}
        active={advantage === true}
      >
        <Icon path={mdiStar} size={0.75} />
      </InfoBox>
    </Container>
  );
}

export default ActiveStateComponent;
