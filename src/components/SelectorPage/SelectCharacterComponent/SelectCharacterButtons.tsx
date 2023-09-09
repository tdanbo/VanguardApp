import UserBox from "../UserBox";

interface LoginProps {
  setSelector: (selector: string) => void;
}

import * as Constants from "../../../Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faAngleLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Styles from "../SelectorStyles";

function SelectCharacterButtons({ setSelector }: LoginProps) {
  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}{" "}
      <div style={Styles.smallCircleButtonStyles}>
        {" "}
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ color: Constants.FONT_LIGHT }}
          onClick={() => setSelector("session")}
        />
      </div>
      <div style={Styles.largeCircleButtonStyles}>
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: Constants.FONT_LIGHT }}
          onClick={() => setSelector("createCharacter")}
        />
      </div>
      <div style={Styles.smallCircleButtonStyles}>
        {" "}
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: Constants.FONT_LIGHT }}
          onClick={() => setSelector("session")}
        />
      </div>
    </div>
  );
}
export default SelectCharacterButtons;
