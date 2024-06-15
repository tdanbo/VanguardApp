import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { GetDifficultyString } from "../functions/CharacterFunctions";

interface CharacterNameBoxProps {
  character: CharacterEntry;
}

function CharacterNameComponent({ character }: CharacterNameBoxProps) {
  return (
    <div>
      <div
        className="row"
        style={{
          fontSize: "30px",
          justifyContent: "left",
          fontWeight: "bold",
          marginTop: "-10px",
        }}
      >
        {character.name}
      </div>
      <div
        className="row"
        style={{
          fontSize: "15px",
          justifyContent: "right",
          fontWeight: "bold",
          marginTop: "-15px",
          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        {GetDifficultyString(character)} {character.details.race}
      </div>
    </div>
  );
}

export default CharacterNameComponent;
