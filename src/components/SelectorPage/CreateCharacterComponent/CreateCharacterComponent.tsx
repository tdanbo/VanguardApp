import * as Constants from "../../../Constants";
import CreateCharacterButtons from "./CreateCharacterButtons";
import { useState } from "react";
import { CharacterEntry } from "../../../Types";
import styled from "styled-components";
import RaceDropdownBox from "./RaceDropdownBox";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
} from "../SelectorStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faImagePortrait } from "@fortawesome/free-solid-svg-icons";

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

const PortraitContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex: 1;
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
  setCharacterLog,
  characterPortrait,
}: LoginProps) {
  const [characterName, setCharacterName] = useState("");

  const [selectedValue, setSelectedValue] = useState(0);

  const [name, setName] = useState("");

  const [accurate, setAccurate] = useState(0);
  const [cunning, setCunning] = useState(0);
  const [discreet, setDiscreet] = useState(0);
  const [persuasive, setPersuasive] = useState(0);
  const [quick, setQuick] = useState(0);
  const [resolute, setResolute] = useState(0);
  const [strong, setStrong] = useState(0);
  const [vigilant, setVigilant] = useState(0);

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
    console.log("Selected option:", selectedOption);
  };

  const handlePortraitSelect = () => {
    console.log("Portrait selected");
    setSelector("selectPortrait");
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
            <StatBox>
              <NameBox>{button.label}</NameBox>
              <ValueBox
                key={button.id}
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
      <CreateCharacterButtons
        setSelector={setSelector}
        character_name={characterName}
        portrait={characterPortrait}
        stats={stats}
        setCharacterLog={setCharacterLog}
      />
    </MainContainer>
  );
}

export default CreateCharacterComponent;
