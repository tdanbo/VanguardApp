import * as Constants from "../../Constants";
import { useState, useEffect } from "react";
import { CharacterEntry, SessionEntry } from "../../Types";
import { UpperFirstLetter } from "../../functions/UtilityFunctions";
import styled from "styled-components";
import RaceDropdownBox from "./RaceDropdownBox";
import { update_session } from "../../functions/SessionsFunctions";
import { addNewCreature } from "../../functions/CharacterFunctions";
import { EmptyWeapon, EmptyArmor } from "../../Types";
import { toTitleCase } from "../../functions/UtilityFunctions";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  ControlButton,
  ButtonContainer,
} from "./SelectorStyles";
import { v4 as uuidv4 } from "uuid";
import AddCreaturePortrait from "../AddCreaturePortrait";

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
  websocket: WebSocket;
  isCreature: boolean;
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
    useState<string>("Weak");
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
    "Ogre",
    "Goblin",
    "Elf",
    "Abducted Human",
    "Dwarf",
    "Troll",
    "Undead",
    "Beast",
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
    setCharacterPortrait(UpperFirstLetter(selectedOption));
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

  let npc_state = true;
  if (source === "characterSelect") {
    npc_state = false;
  } else {
    npc_state = true;
  }

  const NewCharacterEntry: CharacterEntry = {
    name: name,
    id: creature_id,
    npc: npc_state,
    portrait: characterPortrait,
    details: {
      race: race,
      movement: 0,
      xp_earned: characterXp,
      modifier: 0,
    },
    damage: 0,
    stats: {
      cunning: { value: stats[1].value, mod: 0 },
      discreet: { value: stats[2].value, mod: 0 },
      persuasive: { value: stats[3].value, mod: 0 },
      quick: { value: stats[4].value, mod: 0 },
      resolute: { value: stats[5].value, mod: 0 },
      strong: { value: stats[6].value, mod: 0 },
      vigilant: { value: stats[7].value, mod: 0 },
      accurate: { value: stats[0].value, mod: 0 },
    },
    actives: {
      attack: {
        stat: "accurate",
        value: 0,
        dice1: 0,
        dice1_mod: 0,
        dice1_name: "damage",
        dice2: 0,
        dice2_mod: 0,
        dice2_name: "damage",
        attacks: 1,
      },
      defense: {
        stat: "quick",
        value: 0,
        dice: 0,
        dice_mod: 0,
        dice_name: "armor",
      },
      casting: { stat: "resolute", value: 0 },
      sneaking: { stat: "discreet", value: 0 },
    },
    corruption: {
      permanent: 0,
      temporary: 0,
    },
    abilities: [],
    inventory: [],
    equipment: {
      main: EmptyWeapon,
      off: EmptyWeapon,
      armor: EmptyArmor,
    },
    rations: { food: 0, water: 0 },
    money: 0,
    entourage: [],
    entry: "CharacterEntry",
  };

  const handlePostCharacter = async () => {
    if (source === "characterSelect") {
      session.characters.push(NewCharacterEntry);
      update_session(session, NewCharacterEntry, isCreature, websocket);
      setCharacterName(NewCharacterEntry.name);
    } else {
      await addNewCreature(NewCharacterEntry);
    }
    // setCharacter(NewCharacterEntry);
    closeModal();
  };

  const handleBack = () => {
    console.log("Back");
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
                {ModiferScore[button.value]}
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
