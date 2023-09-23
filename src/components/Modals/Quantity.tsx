import * as Constants from "../../Constants";
import { useContext } from "react";
import { ItemEntry } from "../../Types";
import { onChangeQuantity } from "../../functions/CharacterFunctions";
import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";
import "../../App.css";
interface QuantityProps {
  item: ItemEntry;
}

interface RollBoxProps {
  color: string;
}

const QuantityBox = styled.button<RollBoxProps>`
  display: flex;
  flex-grow: 1;
  color: ${(props) => props.color};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  margin-left: 2px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  width: 40px;
  height: 20px;
`;

function Quantity({ item }: QuantityProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const handlePlusClick = () => {
    const newQuantity = item.quantity.count + 1;
    const updatedCharacter = onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
    setCharacter(updatedCharacter);
  };

  const handleMinusClick = () => {
    const newQuantity = item.quantity.count - 1;
    const updatedCharacter = onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
    setCharacter(updatedCharacter);
  };

  return (
    <div>
      <QuantityBox
        color={COLOR}
        onClick={handleMinusClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handlePlusClick();
        }}
        className="mouse-icon-hover"
      >
        {item.quantity.count}x
      </QuantityBox>
    </div>
  );
}

export default Quantity;
