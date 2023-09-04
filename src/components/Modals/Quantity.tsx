import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext } from "react";
import { ItemEntry } from "../../Types";
import { onChangeQuantity } from "../../functions/CharacterFunctions";
import { CharacterContext } from "../../contexts/CharacterContext";

interface QuantityProps {
  item: ItemEntry;
}

function Quantity({ item }: QuantityProps) {
  const { character } = useContext(CharacterContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number>(0);

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
    border: `1px solid ${Constants.BORDER}`,
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
      <div
        className="m-1 flex items-center justify-start rounded p-2 text-xs font-bold"
        style={{
          backgroundColor: Constants.PRIMARY_HOVER,
          border: `1px solid ${Constants.RED}`,
          color: Constants.RED,
          height: "22px",
        }}
        onClick={handleOpen}
      >
        {item.quantity.count}x
      </div>
      {isModalOpen && (
        <div style={overlayStyles} onClick={handleClose}>
          <div style={modalStyles} onClick={stopPropagation}>
            <div className="flex-col">
              <input
                type="text"
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.PRIMARY,
                  border: `1px solid ${Constants.BORDER}`,
                }}
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex">
              <button
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.PRIMARY_LIGHTER,
                  border: `1px solid ${Constants.BORDER}`,
                }}
                onClick={handleMinusClick}
              >
                -
              </button>
              <button
                className="flex-grow rounded p-1 text-center text-xl font-bold"
                style={{
                  backgroundColor: Constants.PRIMARY_LIGHTER,
                  border: `1px solid ${Constants.BORDER}`,
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
