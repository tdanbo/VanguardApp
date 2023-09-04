import * as Constants from "../Constants";
import { useRoll } from "../functions/CombatFunctions";
type Props = {
  type_name: string;
  type_value: number;
};

function DiceBox({ type_name }: Props) {
  const onRollDice = useRoll();

  const RollDice = () => {
    onRollDice({
      dice: type_name,
      count: 1,
      target: 0,
      type: "Dice",
      add_mod: true,
    });
  };

  return (
    <div
      className="flex w-full flex-col items-center justify-center rounded"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        border: `1px solid ${Constants.BORDER_LIGHT}`,
        margin: "2px 2px 2px 2px",
        fontSize: "0.8rem",
        fontWeight: "bold",
      }}
      onClick={RollDice}
    >
      {type_name.toUpperCase()}
    </div>
  );
}

export default DiceBox;
