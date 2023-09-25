import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { LargeCircleButton } from "./SelectorStyles";

interface CreateSessionsProps {
  setSelector: (selector: string) => void;
}

function SelectPortraitButtons({ setSelector }: CreateSessionsProps) {
  return (
    <div className="mb-5 mt-3 flex justify-center">
      {" "}
      {/* Adjust the margin-bottom if necessary */}
      <LargeCircleButton onClick={() => setSelector("createCharacter")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </LargeCircleButton>
    </div>
  );
}
export default SelectPortraitButtons;
