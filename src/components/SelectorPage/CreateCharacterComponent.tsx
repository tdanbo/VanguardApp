import * as Constants from "../../Constants";
import { useState, useContext } from "react";
import { useWebSocket } from "../../contexts/WebSocketContext";
import { CharacterEntry } from "../../Types";
import { SessionContext } from "../../contexts/SessionContext";

import styled from "styled-components";
import RaceDropdownBox from "./RaceDropdownBox";
import { addNewCharacter } from "../../functions/CharacterFunctions";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
  ControlButton,
} from "./SelectorStyles";

interface LoginProps {
  setSelector: (selector: string) => void;
  setCharacterLog: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  characterPortrait: string;
}

interface Stats {
  id: number;
  value: number;
  label: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 5px;
  height: 75px;
  margin-bottom: 20px;
`;

interface PortraitProps {
  src: string;
}

const PortraitSelect = styled.button<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_BORDER};
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-position: center 40%;
`;

const NameInput = styled.input`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  text-align: center;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  outline: none;
`;

const InputtContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  gap: 5px;
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-grow: 1;
`;

const NameBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0 0 ${Constants.BORDER_RADIUS};
  font-size: 16px;
`;

const ValueBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0 0 ${Constants.BORDER_RADIUS};
  font-size: 16px;
`;

function CreateCharacterComponent({
  setSelector,
  characterPortrait,
}: LoginProps) {
  const [characterName, setCharacterName] = useState("");

  const handleNameChange = (e: any) => {
    setCharacterName(e.target.value);
  };

  const [stats, setStats] = useState<Stats[]>([
    { id: 1, label: "Cunning", value: 15 },
    { id: 2, label: "Discreet", value: 13 },
    { id: 3, label: "Persuasive", value: 11 },
    { id: 4, label: "Quick", value: 10 },
    { id: 5, label: "Resolute", value: 10 },
    { id: 6, label: "Strong", value: 9 },
    { id: 7, label: "Vigilant", value: 7 },
    { id: 8, label: "Accurate", value: 5 },
  ]);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonClick = (id: number) => {
    if (!selectedButton) {
      setSelectedButton(id);
      return;
    }

    if (selectedButton === id) {
      setSelectedButton(null);
      return;
    }

    const firstButton = stats.find((btn) => btn.id === selectedButton);
    const secondButton = stats.find((btn) => btn.id === id);

    if (firstButton && secondButton) {
      const tempValue = firstButton.value;
      firstButton.value = secondButton.value;
      secondButton.value = tempValue;

      setStats([...stats]);
    }

    setSelectedButton(null);
  };

  const options = [
    "Select Race",
    "Ambrian",
    "Changeling",
    "Ogre",
    "Goblin",
    "Elf",
    "Abducted Human",
    "Dwarf",
    "Troll",
    "Undead",
  ];

  const handleDropdownChange = (selectedOption: string) => {
    console.log(selectedOption);
  };

  const handlePortraitSelect = () => {
    setSelector("selectPortrait");
  };
  const { session } = useContext(SessionContext);
  const { sendRequest } = useWebSocket();

  const NewCharacterEntry: CharacterEntry = {
    id: session.id,
    portrait: characterPortrait,
    details: {
      movement: 0,
      name: characterName,
      xp_earned: 50,
      modifier: 0,
    },
    toughness: {
      max: { value: 0, mod: 0 },
      pain: { value: 0, mod: 0 },
      damage: { value: 0, mod: 0 },
    },
    stats: {
      accurate: { value: stats[0].value, mod: 0 },
      cunning: { value: stats[1].value, mod: 0 },
      discreet: { value: stats[2].value, mod: 0 },
      persuasive: { value: stats[3].value, mod: 0 },
      quick: { value: stats[4].value, mod: 0 },
      resolute: { value: stats[5].value, mod: 0 },
      strong: { value: stats[6].value, mod: 0 },
      vigilant: { value: stats[7].value, mod: 0 },
    },
    actives: {
      attack: { stat: "accurate", mod: 0 },
      defense: { stat: "quick", mod: 0 },
      casting: { stat: "resolute", mod: 0 },
      sneaking: { stat: "discreet", mod: 0 },
    },
    corruption: {
      permanent: 0,
      temporary: 0,
      threshold: 0,
    },
    abilities: [],
    inventory: [],
    rations: { food: 0, water: 0 },
    money: 0,
  };

  const handlePostCharacter = async () => {
    setSelector("characterSelect");
    await addNewCharacter(NewCharacterEntry);
    sendRequest("characters"); // asking websocket to update session characters for all clients
  };

  return (
    <MainContainer>
      <Title>Create Character</Title>
      <ModalContainer>
        <Divider />
        <CenterContainer>
          <Container>
            <PortraitSelect
              onClick={handlePortraitSelect}
              src={characterPortrait}
            />
            <InputtContainer>
              <NameInput
                placeholder={"Character Name"}
                onChange={handleNameChange}
              />
              <RaceDropdownBox
                onChange={handleDropdownChange}
                options={options}
              />
            </InputtContainer>
          </Container>
          {stats.map((button) => (
            <StatBox key={button.id}>
              <NameBox>{button.label}</NameBox>
              <ValueBox
                onClick={() => handleButtonClick(button.id)}
                style={
                  selectedButton === button.id
                    ? {
                        backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
                        border: `1px solid ${Constants.WIDGET_BORDER}`,
                      }
                    : {
                        backgroundColor: Constants.WIDGET_BACKGROUND,
                        border: `1px solid ${Constants.WIDGET_BORDER}`,
                      }
                }
              >
                {button.value}
              </ValueBox>
            </StatBox>
          ))}
        </CenterContainer>
        <Divider />
      </ModalContainer>
      <ControlButton onClick={handlePostCharacter}>Back</ControlButton>
      <ControlButton onClick={handlePostCharacter}>Accept</ControlButton>
    </MainContainer>
  );
}

export default CreateCharacterComponent;
