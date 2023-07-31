import * as Constants from "../Constants";
import axios from "axios";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { CharacterEntry } from "../Types";
import { useEffect } from "react";

interface CorruptionProps {
  corruptionState: number;
  selectedCharacter: CharacterEntry;
  setUpdater: React.Dispatch<React.SetStateAction<number>>;
  update: number;
  field: string;
}

function CorruptionBox({
  corruptionState,
  selectedCharacter,
  setUpdater,
  update,
  field,
}: CorruptionProps) {
  const UpdateCorruptionState = () => {
    let corruption_level = selectedCharacter.corruption[field];

    if (corruption_level === 0) {
      selectedCharacter.corruption[field] = 1;
    } else if (corruption_level === 1) {
      selectedCharacter.corruption[field] = 2;
    } else {
      selectedCharacter.corruption[field] = 0;
    }

    // Convert the dictionary to a list
    let corruptionKeysList: string[] = Object.keys(
      selectedCharacter.corruption,
    );
    let corruptionValuesList: number[] = Object.values(
      selectedCharacter.corruption,
    ) as number[];

    // Sort the list
    corruptionValuesList.sort((a: number, b: number) => b - a);

    corruptionKeysList.forEach((key, index) => {
      selectedCharacter.corruption[key] = corruptionValuesList[index];
    });

    setUpdater((prevUpdate) => prevUpdate + 1);
  };

  useEffect(() => {
    axios
      .put(
        `http://localhost:8000/api/characterlog/${selectedCharacter.details.name}`,
        selectedCharacter,
      )
      .then((res) => console.log(res));
  }, [update]);

  const BackgroundColor = () => {
    if (corruptionState === 1) {
      return Constants.BORDER_DARK;
    } else if (corruptionState === 2) {
      return Constants.DARK;
    } else {
      return Constants.PRIMARY; // This is the base color for the corruption box
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex-grow-1 fw-bold flex items-center justify-center rounded"
        style={{
          fontSize: "0.8rem",
          color: Constants.PRIMARY,
          backgroundColor: BackgroundColor(),
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
        }}
        onClick={UpdateCorruptionState}
      >
        <LocalFireDepartmentIcon />
      </div>
    </div>
  );
}

export default CorruptionBox;
