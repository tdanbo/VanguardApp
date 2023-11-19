import * as Constants from "../Constants";
import styled from "styled-components";

import { useContext, useState, useEffect } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UpdateResources, GetBurnRate } from "../functions/CharacterFunctions";
import {
  faCircle,
  faDroplet,
  faCarrot,
  faCheck,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
  LargeCircleButton,
  LargeCircleButtonDisabled,
  ButtonContainer,
} from "./SelectorPage/SelectorStyles";

const OrangeColor = "rgba(205, 112, 57, 0.7)";
const BlueColor = "rgba(96, 128, 148, 0.7)";
const GoldColor = "rgba(189, 169, 57, 0.7)";
const SilverColor = "rgba(185, 185, 185, 0.7)";
const BronzeColor = "rgba(140, 110, 90, 0.7)";

const Container = styled.div`
  display: flex;
  flex-grow: 1;

  height: 35px;
  gap: 20px;
  justify-content: right;
`;

const CurrencyContainer = styled.button`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const IconFContainer = styled.div`
  display: flex;
  font-size: 25px;
  color: ${OrangeColor};
`;

const IconWContainer = styled.div`
  display: flex;

  font-size: 25px;
  color: ${BlueColor};
`;

const IconTContainer = styled.div`
  display: flex;

  font-size: 25px;
  color: ${GoldColor};
`;

const IconSContainer = styled.div`
  display: flex;

  font-size: 25px;
  color: ${SilverColor};
`;

const IconOContainer = styled.div`
  display: flex;

  font-size: 25px;
  color: ${BronzeColor};
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: stretch; /* Make children stretch to fill the height */
`;

interface ButtonProps {
  $activated: boolean;
}

const PlusButton = styled.button<ButtonProps>`
  flex: 1;
  width: 50px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  display: flex;
  align-items: center; /* Center child items */
  justify-content: center;
  font-size: 1.5rem;
  background-color: ${(props) =>
    props.$activated
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${(props) =>
    props.$activated
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_SECONDARY_FONT};
`;

interface IconButtonProps {
  color: string;
}

const IconButton = styled.div<IconButtonProps>`
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  display: flex;
  align-items: center; /* Center child items */
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => props.color};
  width: 50px;
  min-width: 50px;
`;

const ResultBox = styled.div`
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  display: flex;
  align-items: center; /* Center child items */
  justify-content: center;
  font-size: 1.5rem;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  width: 75px;
  min-width: 75px;
  margin-right: 20px;
`;

const ValueInput = styled.input`
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  text-align: center;
`;

const MinusButton = styled.button<ButtonProps>`
  flex: 1;
  width: 50px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  display: flex;
  align-items: center; /* Center child items */
  justify-content: center;
  font-size: 1.5rem;
  background-color: ${(props) =>
    props.$activated
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${(props) =>
    props.$activated
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_SECONDARY_FONT};
`;

const ResourceChangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-bottom: 20px;
`;

function ConvertCurrency(value: number, mode: string) {
  const thaler = Math.floor(value / 100);
  const remainingAfterThaler = value - thaler * 100;
  const shillings = Math.floor(remainingAfterThaler / 10);
  const remainingAfterShillings = remainingAfterThaler - shillings * 10;
  const orthegs = remainingAfterShillings;

  switch (mode) {
    case "thaler":
      return thaler;
    case "shillings":
      return shillings;
    case "orthegs":
      return orthegs;
    default:
      return value;
  }
}

interface ResourceChangerProps {
  value: number;
  mode: "thaler" | "shillings" | "orthegs" | "food" | "water";
  setValue: (value: number) => void;
  icon: any;
  color: string;
}

function ResourceChanger({
  value,
  mode,
  setValue,
  icon,
  color,
}: ResourceChangerProps) {
  const [clickState, setClickState] = useState<string>("add");
  const [plusState, setPlusState] = useState<boolean>(true);
  const [minusState, setMinusState] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(0);
  const [previousValue, setPreviousValue] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInputValue = event.target.value;
    if (/^\d*$/.test(rawInputValue)) {
      const newInputValue = parseInt(rawInputValue, 10) || 0; // Default to 0 if NaN
      setInputValue(newInputValue);
      if (clickState === "add") {
        calcValue(clickState, mode, newInputValue);
      } else if (clickState === "sub") {
        calcValue(clickState, mode, -newInputValue);
      }
    }
  };

  const calcValue = (operation: string, mode: string, input: number) => {
    let newValue = value;
    console.log(operation);

    let multiplier = 1;
    if (mode === "thaler") {
      multiplier = 100;
    } else if (mode === "shillings") {
      multiplier = 10;
    }

    let changeAmount = input * multiplier;

    newValue -= previousValue;
    newValue += changeAmount;

    setValue(newValue);
    setPreviousValue(changeAmount);
  };

  const changeClickState = (newClickState: string) => {
    if (clickState === newClickState) return;

    if (newClickState === "add" && clickState !== "add") {
      setValue(value + previousValue);

      setClickState("add");
      setPlusState(true);
      setMinusState(false);

      calcValue(newClickState, mode, inputValue);
    } else if (newClickState === "sub" && clickState !== "sub") {
      setValue(value - previousValue);
      setClickState("sub");
      setPlusState(false);
      setMinusState(true);

      calcValue(newClickState, mode, -inputValue);
    }
  };

  return (
    <InputContainer>
      <IconButton color={color}>
        <FontAwesomeIcon icon={icon} />
      </IconButton>
      <ResultBox>{ConvertCurrency(value, mode)}</ResultBox>
      <MinusButton
        className="button-hover"
        $activated={minusState}
        onClick={() => changeClickState("sub")}
      >
        -
      </MinusButton>
      <ValueInput value={inputValue} onChange={handleInputChange}></ValueInput>
      <PlusButton
        className="button-hover"
        $activated={plusState}
        onClick={() => changeClickState("add")}
      >
        +
      </PlusButton>
    </InputContainer>
  );
}

function ResourcesBox() {
  const { character, setCharacter } = useContext(CharacterContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const [food, setFood] = useState<number>(0);
  const [water, setWater] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);

  useEffect(() => {
    if (character) {
      setFood(character.rations.food);
      setWater(character.rations.water);
      setMoney(character.money);
    }
  }, [isModalOpen]);

  const thaler = ConvertCurrency(character.money, "thaler");
  const shillings = ConvertCurrency(character.money, "shillings");
  const orthegs = ConvertCurrency(character.money, "orthegs");

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const UpdatedCharacter = UpdateResources(character, food, water, money);
    setCharacter(UpdatedCharacter);
    setIsModalOpen(false);
  };
  return (
    <>
      <Container onClick={handleOpen}>
        <CurrencyContainer className="button-hover">
          <IconFContainer>
            <FontAwesomeIcon icon={faCarrot} />
          </IconFContainer>
          <TextContainer>{character.rations.food}</TextContainer>
        </CurrencyContainer>
        <CurrencyContainer className="button-hover">
          <IconWContainer>
            <FontAwesomeIcon icon={faDroplet} />
          </IconWContainer>
          <TextContainer>{character.rations.water}</TextContainer>
        </CurrencyContainer>
        <CurrencyContainer className="button-hover">
          <IconTContainer>
            <FontAwesomeIcon icon={faCircle} />
          </IconTContainer>
          <TextContainer>{thaler}</TextContainer>
        </CurrencyContainer>
        <CurrencyContainer className="button-hover">
          <IconSContainer>
            <FontAwesomeIcon icon={faCircle} />
          </IconSContainer>
          <TextContainer>{shillings}</TextContainer>
        </CurrencyContainer>
        <CurrencyContainer className="button-hover">
          <IconOContainer>
            <FontAwesomeIcon icon={faCircle} />
          </IconOContainer>
          <TextContainer>{orthegs}</TextContainer>
        </CurrencyContainer>
      </Container>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
            <Title>Resources</Title>
            <ModalContainer>
              <CenterContainer>
                <ResourceChangeContainer>
                  <ResourceChanger
                    mode="thaler"
                    value={money}
                    setValue={setMoney}
                    icon={faCircle}
                    color={GoldColor}
                  />
                  <ResourceChanger
                    mode="shillings"
                    value={money}
                    setValue={setMoney}
                    icon={faCircle}
                    color={SilverColor}
                  />
                  <ResourceChanger
                    mode="orthegs"
                    value={money}
                    setValue={setMoney}
                    icon={faCircle}
                    color={BronzeColor}
                  />
                </ResourceChangeContainer>
                <ResourceChangeContainer>
                  <ResourceChanger
                    mode="food"
                    value={food}
                    setValue={setFood}
                    icon={faCarrot}
                    color={OrangeColor}
                  />
                  <ResourceChanger
                    mode="water"
                    value={water}
                    setValue={setWater}
                    icon={faDroplet}
                    color={BlueColor}
                  />
                </ResourceChangeContainer>
              </CenterContainer>
              <Divider />
            </ModalContainer>
            <ButtonContainer>
              <LargeCircleButton onClick={handleClose}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LargeCircleButton>
              {money < 0 || water < 0 || food < 0 ? (
                <LargeCircleButtonDisabled>
                  <FontAwesomeIcon icon={faCheck} />
                </LargeCircleButtonDisabled>
              ) : (
                <LargeCircleButton onClick={handleSubmit}>
                  <FontAwesomeIcon icon={faCheck} />
                </LargeCircleButton>
              )}
              {/* <SmallCircleButton onClick={handleReset}>
                <FontAwesomeIcon icon={faArrowRotateLeft} />
              </SmallCircleButton> */}
            </ButtonContainer>
          </MainContainer>
        </Overlay>
      )}
    </>
  );
}
export default ResourcesBox;
