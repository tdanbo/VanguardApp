import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import { UpperFirstLetter, toTitleCase } from "../functions/UtilityFunctions";
import AddCreaturePortrait from "../components_general/AddCreaturePortrait";
import RaceDropdownBox from "../components_general/RaceDropdownBox";
import BackgroundImage from "../assets/icons/background.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  ButtonContainer,
  CenterContainer,
  ControlButton,
  MainContainer,
  ModalContainer,
  Title,
} from "../components_general/SelectorStyles";

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

const XpInput = styled.input`
  display: flex;
  flex-direction: row;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  text-align: center;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  outline: none;
  border: 1px solid ${Constants.WIDGET_BORDER};
  min-height: 35px;
  font-size: 16px;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputtContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  gap: 5px;
`;

const InputtRowContainer = styled.div`
  display: flex;
  flex-direction: row;
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

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
    url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${Constants.BORDER_RADIUS};
  width: 25px;
  height: 25px;
  margin: 2px;
  padding-bottom: 2px;
`;

interface EditCharacterProps {
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  character: CharacterEntry;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
}

function EditCharacterComponent({
  session,
  websocket,
  isCreature,
  character,
  setCharacterId,
}: EditCharacterProps) {
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
  const [name, setName] = useState<string>("");
  const [characterPortrait, setCharacterPortrait] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      console.log("CreateCharacterComponent will unmount");
    };
  }, []);

  const handleNameChange = (e: any) => {
    setName(toTitleCase(e.target.value));
  };

  const handleXpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const xpValue = Number(e.target.value);
    if (!isNaN(xpValue)) {
      setCharacterXp(xpValue);
    } else {
      setCharacterXp(characterXp);
    }
  };

  const [stats, setStats] = useState<Stats[]>([
    { id: 8, label: "Accurate", value: 0 },
    { id: 1, label: "Cunning", value: 0 },
    { id: 2, label: "Discreet", value: 0 },
    { id: 3, label: "Persuasive", value: 0 },
    { id: 4, label: "Quick", value: 0 },
    { id: 5, label: "Resolute", value: 0 },
    { id: 6, label: "Strong", value: 0 },
    { id: 7, label: "Vigilant", value: 0 },
  ]);

  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [characterDifficulty, setCharacterDifficulty] =
    useState<string>("Ordinary");
  const [characterXp, setCharacterXp] = useState<number>(0);
  const [race, setRace] = useState<string>("");
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
    if (isCreature) {
      setCharacterPortrait(UpperFirstLetter(selectedOption));
    }
    setRace(UpperFirstLetter(selectedOption));
  };

  const handleDifficultyDropdownChange = (selectedOption: string) => {
    if (selectedOption === "Weak") {
      setCharacterXp(0);
    } else if (selectedOption === "Ordinary") {
      setCharacterXp(50);
    } else if (selectedOption === "Challenging") {
      setCharacterXp(150);
    } else if (selectedOption === "Strong") {
      setCharacterXp(300);
    } else if (selectedOption === "Mighty") {
      setCharacterXp(600);
    } else if (selectedOption === "Legendary") {
      setCharacterXp(1200);
    }
  };

  useEffect(() => {
    if (characterXp < 50) {
      setCharacterDifficulty("Weak");
    } else if (characterXp < 150) {
      setCharacterDifficulty("Ordinary");
    } else if (characterXp < 300) {
      setCharacterDifficulty("Challenging");
    } else if (characterXp <= 600) {
      setCharacterDifficulty("Strong");
    } else if (characterXp <= 1200) {
      setCharacterDifficulty("Mighty");
    } else {
      setCharacterDifficulty("Legendary");
    }
  }, [characterXp]);

  const handlePostCharacter = async () => {
    console.log(isCreature);
    character.name = name;
    character.details.race = race;
    character.portrait = characterPortrait;
    character.details.xp_earned = characterXp;

    character.stats.accurate.value = stats[0].value;
    character.stats.cunning.value = stats[1].value;
    character.stats.discreet.value = stats[2].value;
    character.stats.persuasive.value = stats[3].value;
    character.stats.quick.value = stats[4].value;
    character.stats.resolute.value = stats[5].value;
    character.stats.strong.value = stats[6].value;
    character.stats.vigilant.value = stats[7].value;

    console.log(character);
    console.log(session);

    update_session(session, websocket, character, isCreature);
    setCharacterId(character.id);
    handleBack();
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

  const handleOpen = () => {
    console.log("Opening Modal");
    console.log(character);
    setName(character.name);
    setCharacterPortrait(character.portrait);
    setRace(character.details.race);
    setCharacterXp(character.details.xp_earned);
    setStats([
      { id: 8, label: "Accurate", value: character.stats.accurate.value },
      { id: 1, label: "Cunning", value: character.stats.cunning.value },
      { id: 2, label: "Discreet", value: character.stats.discreet.value },
      { id: 3, label: "Persuasive", value: character.stats.persuasive.value },
      { id: 4, label: "Quick", value: character.stats.quick.value },
      { id: 5, label: "Resolute", value: character.stats.resolute.value },
      { id: 6, label: "Strong", value: character.stats.strong.value },
      { id: 7, label: "Vigilant", value: character.stats.vigilant.value },
    ]);
    setIsModalOpen(true);
  };

  const handleBack = () => {
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <>
      <OverlayStyles>
        <MainContainer>
          <Title>Edit Character</Title>
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
                    placeholder={character.name}
                    onChange={handleNameChange}
                    value={name}
                  />
                  <RaceDropdownBox
                    onChange={handleDropdownChange}
                    options={!isCreature ? options : creature_options}
                    value={race}
                  />
                  <InputtRowContainer>
                    <XpInput
                      type="number"
                      value={characterXp}
                      onChange={handleXpChange}
                    />
                    <RaceDropdownBox
                      onChange={handleDifficultyDropdownChange}
                      options={difficulty_options}
                      value={characterDifficulty}
                    />
                  </InputtRowContainer>
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
                  {isCreature ? (
                    <ModifierBox
                      className="button-hover"
                      onClick={() => handleButtonClick(button.id)}
                      style={
                        selectedButton === button.id
                          ? {
                              backgroundColor:
                                Constants.WIDGET_BACKGROUND_EMPTY,
                              border: `1px solid ${Constants.WIDGET_BORDER}`,
                            }
                          : {
                              backgroundColor: Constants.WIDGET_BACKGROUND,
                              border: `1px solid ${Constants.WIDGET_BORDER}`,
                            }
                      }
                    >
                      {!isCreature
                        ? CharacterModiferScore[button.value]
                        : ModiferScore[button.value]}
                    </ModifierBox>
                  ) : null}
                </StatBox>
              ))}
            </CenterContainer>
          </ModalContainer>
          <ButtonContainer>
            <ControlButton onClick={() => handleBack()}>Back</ControlButton>
            <ControlButton onClick={handlePostCharacter}>Accept</ControlButton>
          </ButtonContainer>
        </MainContainer>
      </OverlayStyles>
    </>
  ) : (
    <InfoBox onClick={handleOpen} title={"Edit Character"}>
      <FontAwesomeIcon icon={faPen} />
    </InfoBox>
  );
}
export default EditCharacterComponent;
