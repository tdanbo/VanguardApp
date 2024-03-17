import {
  mdiArrowCollapse,
  mdiArrowExpand,
  mdiChevronDoubleUp,
  mdiChevronDoubleDown,
} from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { ActiveStateType, AdvantageType } from "../Types";

interface InfoProps {
  $active: boolean;
}

const InfoBox = styled.div<InfoProps>`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => (props.$active ? "#dfdfdf" : "#333333")};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$active ? "#2f3332" : "#131716")};
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
      setActiveState("");
    } else {
      setActiveState(state);
    }
  };

  const HandleAdvantage = (state: AdvantageType) => {
    if (advantage === state) {
      setAdvantage("");
    } else {
      setAdvantage(state);
    }
  };

  return (
    <Container>
      <InfoBox
        title={"Enable Full Action"}
        onClick={() => HandleActive("full")}
        $active={activeState === "full"}
      >
        <Icon path={mdiChevronDoubleUp} size={0.75} />
      </InfoBox>
      <InfoBox
        title={"Enable Weak Action"}
        onClick={() => HandleActive("weak")}
        $active={activeState === "weak"}
      >
        <Icon path={mdiChevronDoubleDown} size={0.75} />
      </InfoBox>
      <div
        style={{
          minHeight: "2px",
          backgroundColor: Constants.BACKGROUND,
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "3px",
          marginRight: "3px",
        }}
      ></div>
      <InfoBox
        title={"Flanking"}
        onClick={() => HandleAdvantage("flanking")}
        $active={advantage === "flanking"}
      >
        <Icon path={mdiArrowCollapse} size={0.9} />
      </InfoBox>
      <InfoBox
        title={"Flanked"}
        onClick={() => HandleAdvantage("flanked")}
        $active={advantage === "flanked"}
      >
        <Icon path={mdiArrowExpand} size={0.9} />
      </InfoBox>
    </Container>
  );
}

export default ActiveStateComponent;
