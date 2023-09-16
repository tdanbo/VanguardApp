import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext } from "react";
import { ItemEntry } from "../../Types";
import { onChangeQuantity } from "../../functions/CharacterFunctions";
import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";

interface QuantityProps {
  item: ItemEntry;
}

interface RollBoxProps {
  color: string;
}

const QuantityBox = styled.div<RollBoxProps>`
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
`;

function Quantity({ item }: QuantityProps) {
  const { character } = useContext(CharacterContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);

  const COLOR = Constants.TYPE_COLORS[item.category] || "defaultColor";

  const handleOpen = () => {
    console.log("Opening Modal");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    console.log("Closing Modal");
    setIsModalOpen(false);
  };

  const modalStyles: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: Constants.DARK,
    padding: "20px",
    zIndex: 1000,
    border: `1px solid ${Constants.WIDGET_BORDER}`,
  };

  const overlayStyles: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(Number(value));
    }
  };

  const handlePlusClick = () => {
    const newQuantity = item.quantity.count + inputValue;
    setInputValue(0);
    handleClose();
    onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
  };

  const handleMinusClick = () => {
    const newQuantity = item.quantity.count - inputValue;
    setInputValue(0);
    handleClose();
    onChangeQuantity({
      id: item.id,
      count: newQuantity,
      character,
    });
  };

  return (
    <div>
      <QuantityBox color={COLOR} onClick={handleOpen}>
        {item.quantity.count}x
      </QuantityBox>
      {isModalOpen && (
        <div style={overlayStyles} onClick={handleClose}>
          <div style={modalStyles} onClick={stopPropagation}>
            <div className="flex-col">
              <input
                type="text"
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.WIDGET_BACKGROUND,
                  border: `1px solid ${Constants.WIDGET_BORDER}`,
                }}
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex">
              <button
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.WIDGET_BACKGROUND,
                  border: `1px solid ${Constants.WIDGET_BORDER}`,
                }}
                onClick={handleMinusClick}
              >
                -
              </button>
              <button
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.WIDGET_BACKGROUND,
                  border: `1px solid ${Constants.WIDGET_BORDER}`,
                }}
                onClick={handlePlusClick}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quantity;
