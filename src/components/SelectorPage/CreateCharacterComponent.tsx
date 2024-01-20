import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../../Constants";
import {
  CharacterEntry,
  SessionEntry
} from "../../Types";
import { addNewCreature } from "../../functions/CharacterFunctions";
import { update_session } from "../../functions/SessionsFunctions";
import {
  UpperFirstLetter,
  toTitleCase,
} from "../../functions/UtilityFunctions";
import AddCreaturePortrait from "../AddCreaturePortrait";
import RaceDropdownBox from "./RaceDropdownBox";
import {
  ButtonContainer,
  CenterContainer,
  ControlButton,
  MainContainer,
  ModalContainer,
  Title,
} from "./SelectorStyles";

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
  margin-bottom: 20px;
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
  border: 1px solid ${Constants.WIDGET_BORDER};
  min-height: 35px;
  font-size: 16px;
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

  font-size: 16px;
  max-width: 180px;
`;

const ModifierBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 0 ${Constants.BORDER_RADIUS} ${Constants.BORDER_RADIUS} 0;
  font-size: 16px;
  max-width: 50px;
`;

interface LoginProps {
  characterName: string;
  characterRace: string;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  closeModal: () => void;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setAddAdjust: React.Dispatch<React.SetStateAction<number>>;
}

function CreateCharacterComponent({
  characterName,
  characterRace,
  setCharacterName,
  closeModal,
  source,
  session,
  websocket,
  isCreature,
  setAddAdjust,
}: LoginProps) {
  const creature_options = [
    "Abomination",
    "Ambrian",
    "Barbarian",
    "Bear",
    "Boar",
    "Cat",
    "Elf",
    "Goblin",
    "Ogre",
    "Reptile",
    "Spider",
    "Spirit",
    "Troll",
    "Undead",
  ];
  const [name, setName] = useState<string>(characterName);
  const [characterPortrait, setCharacterPortrait] =
    useState<string>(characterRace);
  useEffect(() => {
    console.log("CreateCharacterComponent rendered");

    return () => {
      console.log("CreateCharacterComponent will unmount");
    };
  }, []);
  const [isValidName, setIsValitName] = useState(false);

  const handleNameChange = (e: any) => {
    setName(toTitleCase(e.target.value));
    if (e.target.value !== "") {
      setIsValitName(true);
    } else {
      setIsValitName(false);
    }
  };

  useEffect(() => {
    if (characterName !== "") {
      setIsValitName(true);
    } else {
      setIsValitName(false);
    }
  }, [characterName]);

  const [stats, setStats] = useState<Stats[]>([
    { id: 8, label: "Accurate", value: 5 },
    { id: 1, label: "Cunning", value: 15 },
    { id: 2, label: "Discreet", value: 13 },
    { id: 3, label: "Persuasive", value: 11 },
    { id: 4, label: "Quick", value: 10 },
    { id: 5, label: "Resolute", value: 10 },
    { id: 6, label: "Strong", value: 9 },
    { id: 7, label: "Vigilant", value: 7 },
  ]);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [characterDifficulty, setCharacterDifficulty] =
    useState<string>("Ordinary");
  const [characterXp, setCharacterXp] = useState<number>(0);
  const [race, setRace] = useState<string>(characterRace);
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
    "Ambrian",
    "Barbarian",
    "Changeling",
    "Goblin",
    "Elf",
    "Abducted Human",
    "Dwarf",
    "Ogre",
    // "Troll",
    // "Undead",
    // "Beast",
  ];

  const difficulty_options = [
    "Weak",
    "Ordinary",
    "Challenging",
    "Strong",
    "Mighty",
    "Legendary",
  ];

  const handleDropdownChange = (selectedOption: string) => {
    if (source !== "characterSelect") {
      setCharacterPortrait(UpperFirstLetter(selectedOption));
    }
    setRace(UpperFirstLetter(selectedOption));
  };

  const difficulty: Record<string, number> = {
    Weak: 0,
    Ordinary: 50,
    Challenging: 150,
    Strong: 300,
    Mighty: 600,
    Legendary: 1200,
  };

  useEffect(() => {
    setCharacterXp(difficulty[characterDifficulty]);
  }, [characterDifficulty]);

  const handleDifficultyDropdownChange = (selectedDifficulty: string) => {
    setCharacterDifficulty(selectedDifficulty);
  };

  let creature_id = "";
  if (source === "characterSelect") {
    creature_id = session.id;
  } else {
    creature_id = uuidv4();
  }

  const NewCharacterEntry: CharacterEntry = {
    name: name,
    id: creature_id,
    portrait: characterPortrait,
    details: {
      race: race,
      movement: 0,
      xp_earned: characterXp,
      modifier: 0,
    },
    health: {
      damage: 0,
      corruption: 0,
      shield: 0,
    },
    stats: {
      cunning: { value: stats[1].value, mod: 0, active: "" },
      discreet: { value: stats[2].value, mod: 0, active: "sneaking" },
      persuasive: { value: stats[3].value, mod: 0, active: "" },
      quick: { value: stats[4].value, mod: 0, active: "defense" },
      resolute: { value: stats[5].value, mod: 0, active: "casting" },
      strong: { value: stats[6].value, mod: 0, active: "" },
      vigilant: { value: stats[7].value, mod: 0, active: "" },
      accurate: { value: stats[0].value, mod: 0, active: "attack" },
    },
    abilities: [],
    inventory: [],
    rations: { food: 0, water: 0 },
    money: 0,
    entry: "CharacterEntry",
  };

  const handlePostCharacter = async () => {
    if (source === "characterSelect") {
      session.characters.push(NewCharacterEntry);
      update_session(session, NewCharacterEntry, isCreature, websocket);
      setCharacterName(NewCharacterEntry.name);
    } else {
      await addNewCreature(NewCharacterEntry);
      setAddAdjust((prevCount) => prevCount + 1);
    }
    // setCharacter(NewCharacterEntry);
    closeModal();
  };

  const handleBack = () => {
    closeModal();
  };

  const ModiferScore: Record<number, string> = {
    15: "-5",
    13: "-3",
    11: "-1",
    10: "0",
    9: "+1",
    7: "+3",
    5: "+5",
  };

  const CharacterModiferScore: Record<number, string> = {
    15: "+5",
    13: "+3",
    11: "+1",
    10: "0",
    9: "-1",
    7: "-3",
    5: "-5",
  };

  return (
    <MainContainer>
      <Title>Create Character</Title>
      <ModalContainer>
        <CenterContainer>
          <Container>
            <AddCreaturePortrait
              characterPortrait={characterPortrait}
              setCharacterPortrait={setCharacterPortrait}
            />
          </Container>
          <Container>
            <InputtContainer>
              <NameInput
                placeholder={"Character Name"}
                onChange={handleNameChange}
                value={name}
              />
              <RaceDropdownBox
                onChange={handleDropdownChange}
                options={
                  source === "characterSelect" ? options : creature_options
                }
                value={race}
              />
              <RaceDropdownBox
                onChange={handleDifficultyDropdownChange}
                options={difficulty_options}
                value={characterDifficulty}
              />
            </InputtContainer>
          </Container>
          {stats.map((button) => (
            <StatBox key={button.id}>
              <NameBox>{button.label}</NameBox>
              <ValueBox
                className="button-hover"
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
              <ModifierBox
                className="button-hover"
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
                {source === "characterSelect"
                  ? CharacterModiferScore[button.value]
                  : ModiferScore[button.value]}
              </ModifierBox>
            </StatBox>
          ))}
        </CenterContainer>
      </ModalContainer>
      <ButtonContainer>
        <ControlButton onClick={() => handleBack()}>Back</ControlButton>
        <ControlButton disabled={!isValidName} onClick={handlePostCharacter}>
          Accept
        </ControlButton>
      </ButtonContainer>
    </MainContainer>
  );
}

export default CreateCharacterComponent;
