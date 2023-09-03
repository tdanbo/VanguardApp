import * as Constants from "../Constants";
import axios from "axios";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { CharacterEntry } from "../Types";
import { useEffect } from "react";

interface CorruptionProps {
  state: number;
}

function CorruptionToken({ state }: CorruptionProps) {
  const BackgroundColor = () => {
    if (state === 1) {
      return Constants.BORDER_DARK;
    } else if (state === 2) {
      return Constants.DARK;
    } else {
      return Constants.PRIMARY; // This is the base color for the corruption box
    }
  };

  return (
    <div
      className="fw-bold flex w-full grow items-center justify-center rounded"
      style={{
        fontSize: "0.8rem",
        color: Constants.PRIMARY,
        backgroundColor: BackgroundColor(),
        border: `1px solid ${Constants.BORDER_LIGHT}`,
        margin: "2px 2px 2px 2px",
      }}
    >
      <LocalFireDepartmentIcon />
    </div>
  );
}

export default CorruptionToken;
