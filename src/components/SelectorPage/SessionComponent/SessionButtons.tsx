import UserBox from "../UserBox";

interface LoginProps {
  setSelector: (selector: string) => void;
}

import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faCheck,
  faLink,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Styles from "./../SelectorStyles";

function SessionButtons({ setSelector }: LoginProps) {
  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}
      <div style={Styles.largeCircleButtonStyles}>
        <FontAwesomeIcon
          icon={faLink}
          style={{ color: Constants.FONT_LIGHT }}
        />
      </div>
      <div style={Styles.largeCircleButtonStyles}>
        {" "}
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: Constants.FONT_LIGHT }}
          onClick={() => setSelector("createSession")}
        />
      </div>
    </div>
  );
}
export default SessionButtons;
