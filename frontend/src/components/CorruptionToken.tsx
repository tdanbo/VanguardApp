import * as Constants from "../Constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";

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
      return Constants.PRIMARY_MEDIUM; // This is the base color for the corruption box
    }
  };

  return (
    <div
      className="fw-bold flex w-full grow items-center justify-center rounded"
      style={{
        fontSize: "1.5rem",
        color: Constants.PRIMARY,
        backgroundColor: BackgroundColor(),
        border: `1px solid ${Constants.BORDER_LIGHT}`,
        margin: "2px 2px 2px 2px",
      }}
    >
      <FontAwesomeIcon icon={faSkull} />
    </div>
  );
}

export default CorruptionToken;
