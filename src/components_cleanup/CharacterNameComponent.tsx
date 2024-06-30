import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { GetDifficultyString } from "../functions/CharacterFunctions";

interface CharacterNameBoxProps {
  character: CharacterEntry;
}

function CharacterNameComponent({ character }: CharacterNameBoxProps) {
  return (
    <div className="row outline_color" style={{ padding: "0px 10px 0px 10px" }}>
      <div
        style={{
          fontSize: "10px",
          justifyContent: "left",
          fontWeight: "bold",
          marginTop: "10px",

          color: Constants.WIDGET_SECONDARY_FONT,
        }}
      >
        {GetDifficultyString(character).toUpperCase()}
      </div>
      <div
        className="row"
        style={{
          fontSize: "25px",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {character.name}
      </div>
      <div
        style={{
          fontSize: "10px",
          justifyContent: "right",
          fontWeight: "bold",
          marginTop: "10px",
          color: Constants.WIDGET_SECONDARY_FONT,
        }}
      >
        {character.details.race.toUpperCase()}
      </div>
    </div>
  );
}

export default CharacterNameComponent;
