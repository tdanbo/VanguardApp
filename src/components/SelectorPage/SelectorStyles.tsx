import { CSSProperties } from "react";
import * as Constants from "../../Constants";

const circleButtonStyles: CSSProperties = {
  width: "50px",
  height: "50px",
  borderRadius: "50%", // Makes it a circle
  backgroundColor: Constants.BUTTON,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "10px",
  border: `1px solid ${Constants.NEW_BORDER}`,
  cursor: "pointer",
};

export const smallCircleButtonStyles: CSSProperties = {
  ...circleButtonStyles,
  width: "35px",
  height: "35px",
  margin: "5px",
};

export const largeCircleButtonStyles: CSSProperties = {
  ...circleButtonStyles,
  width: "50px",
  height: "50px",
  margin: "5px",
  fontSize: "1.5rem",
};

export const modalStyles: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.1)), linear-gradient(${Constants.WIDGET_BG}, ${Constants.WIDGET_BG})`,
  backgroundColor: Constants.WIDGET_BG,
  padding: "20px",
  zIndex: 1000,
  border: `1px solid ${Constants.NEW_BORDER}`,
  flex: 1,
};
