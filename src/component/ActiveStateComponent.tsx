import {
  mdiBullseye,
  mdiShield,
  mdiSwordCross,
  mdiArrowUpThick,
  mdiArrowDownThick,
} from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { ActiveStateType, AdvantageType } from "../Types";

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

interface ActiveStateProps {
  activeState: ActiveStateType;
  setActiveState: (state: ActiveStateType) => void;
  advantage: AdvantageType;
  setAdvantage: (state: AdvantageType) => void;
}

function ActiveStateComponent({
  activeState,
  setActiveState,
  advantage,
  setAdvantage,
}: ActiveStateProps) {
  const HandleActive = (state: ActiveStateType) => {
    if (activeState === state) {
      setActiveState("normal");
    } else {
      setActiveState(state);
    }
  };

  const HandleAdvantage = (state: AdvantageType) => {
    if (advantage === state) {
      setAdvantage("normal");
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
        title={"Flanking"}
        onClick={() => HandleAdvantage("advantage")}
        active={advantage === "advantage"}
      >
        <Icon path={mdiArrowUpThick} size={0.9} />
      </InfoBox>
      <InfoBox
        title={"Flanked"}
        onClick={() => HandleAdvantage("disadvantage")}
        active={advantage === "disadvantage"}
      >
        <Icon path={mdiArrowDownThick} size={0.9} />
      </InfoBox>
    </Container>
  );
}

export default ActiveStateComponent;
