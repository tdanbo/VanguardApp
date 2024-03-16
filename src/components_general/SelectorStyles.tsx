import * as Constants from "../Constants";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  min-width: 20%;
  flex-direction: column;
  justify-content: center;
  margin: 100px;
`;

export const Title = styled.div`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.BACKGROUND};
  height: 100px;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  h1 {
    font-size: 1rem;
    color: ${Constants.WIDGET_SECONDARY_FONT};
  }
`;

export const ModalContainer = styled.div`
  background-color: ${Constants.BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

  max-height: 800px;
  margin-bottom: 10px;
  overflow: auto;
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};

  scrollbar-width: none !important;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  margin: 20px;
  scrollbar-width: none !important;
`;

export const Divider = styled.div`
  margin-top: 5px;
  height: 0.5px;
  width: 100%;
  background-color: #2c2f33;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 5px;
  margin-top: 3px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const InputBox = styled.input`
  border-radius: 4px;
  padding: 2px;
  margin: 5px;
  max-height: 50px;
  text-align: center;
`;

export const LargeCircleButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  margin: 5px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

export const LargeCircleButtonDisabled = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  margin: 5px;
  color: ${Constants.WIDGET_BORDER};
`;

export const SmallCircleButton = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  cursor: pointer;
  margin: 5px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

export const ControlButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 25px;
  min-height: 50px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;
