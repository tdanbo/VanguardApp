import * as Constants from "../Constants";
import { Roll } from "../functions/CombatFunctions";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
type Props = {
  type_name: string;
  type_value: number;
};

function DiceBox({ type_name, type_value }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);
  const modifier = 0;

  const onRollDice = () => {
    console.log("Rolling Dice");
    const RollResult = Roll({
      character,
      dice: type_name,
      count: type_value,
      modifier,
    });
    console.log(RollResult);
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        {type_value}
      </div>
      <div
        className="flex grow items-center justify-center rounded-b "
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
        onClick={() => onRollDice()}
      >
        {type_name.toUpperCase()}
      </div>
    </div>
  );
}

export default DiceBox;
