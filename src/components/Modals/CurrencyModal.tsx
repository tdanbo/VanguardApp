import * as Constants from "../../Constants";
import { useState, CSSProperties, useContext } from "react";
import { ItemEntry } from "../../Types";
import { onChangeQuantity } from "../../functions/CharacterFunctions";
import { CharacterContext } from "../../contexts/CharacterContext";
import styled from "styled-components";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
} from "../SelectorPage/SelectorStyles";

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
  height: 20px;
`;

function CurrencyModal({ item }: QuantityProps) {
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

  const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  `;

  const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${Constants.DARK};
    padding: 20px;
    z-index: 1000;
    border: 1px solid ${Constants.WIDGET_BORDER};
  `;

  const StyledInput = styled.input`
    flex-grow: 1;
    border-radius: ${Constants.BORDER_RADIUS};
    padding: 10px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${Constants.WIDGET_BACKGROUND};
    border: 1px solid ${Constants.WIDGET_BORDER};
  `;

  const StyledButton = styled.button`
    flex-grow: 1;
    border-radius: ${Constants.BORDER_RADIUS};
    padding: 10px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: ${Constants.WIDGET_BACKGROUND};
    border: 1px solid ${Constants.WIDGET_BORDER};
  `;

  return (
    <div>
      <QuantityBox color={COLOR} onClick={handleOpen}>
        {item.quantity.count}x
      </QuantityBox>
      {isModalOpen && (
        <MainContainer>
          <Title>Sessions</Title>
          <ModalContainer>
            <Divider />
            <CenterContainer></CenterContainer>
            <Divider />
          </ModalContainer>
        </MainContainer>
      )}
    </div>
  );
}
export default CurrencyModal;
