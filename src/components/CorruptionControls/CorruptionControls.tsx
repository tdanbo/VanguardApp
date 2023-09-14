import CorruptionToken from "../CorruptionToken";
import "./CorruptionControls.css";

import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function CorruptionControls() {
  const { character } = useContext(CharacterContext);

  const temporary_corruption = character.corruption.temporary;
  const clean_corruption =
    character.corruption.threshold - temporary_corruption;

  console.log("Temporary corruption: ", temporary_corruption);
  console.log("Clean corruption: ", clean_corruption);

  return (
    <div className="corruption_container">
      {[...Array(temporary_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={1} />
      ))}
      {[...Array(clean_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={0} />
      ))}
    </div>
  );
}

export default CorruptionControls;
