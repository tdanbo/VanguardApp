import UserBox from "../UserBox";
import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import CreateCharacterButtons from "./CreateCharacterButtons";
import { useState } from "react";
import StatInputBox from "./StatInputBox";
import { CharacterEntry } from "../../../Types";

interface LoginProps {
  setSelector: (selector: string) => void;
}

interface Stats {
  id: number;
  value: number;
  label: string;
}

function CreateCharacterComponent({ setSelector }: LoginProps) {
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

  console.log(accurate);

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

  return (
    <div
      className="flex w-1/5 flex-col justify-center"
      style={{ margin: "100px" }}
    >
      <div style={Styles.modalStyles}>
        <div
          className="flex justify-center p-10 text-4xl font-bold"
          style={{ color: Constants.FONT_LIGHT }}
        >
          Create Character
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
        <div
          className="flex flex-col justify-center space-y-2 overflow-auto"
          style={{ height: "400px" }}
        >
          <input
            placeholder="Character Name"
            className="mb-5 rounded-md p-2"
            onChange={handleNameChange}
          />
          {stats.map((button) => (
            <div className="flex w-full">
              <div
                className="flex h-8 w-1/2 grow items-center justify-center rounded-l-lg"
                id="basic-addon1"
                style={{
                  color: Constants.DARK,
                  backgroundColor: Constants.PRIMARY_LIGHTER,
                  border: `1px solid ${Constants.BORDER_LIGHT}`,
                  fontSize: "1.0rem",
                  fontWeight: "bold",
                }}
              >
                {button.label}
              </div>
              <button
                className="flex h-8  w-1/2 grow items-center justify-center rounded-r-lg"
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                style={
                  selectedButton === button.id
                    ? {
                        backgroundColor: "lightblue",
                        border: `1px solid ${Constants.BORDER_LIGHT}`,
                      }
                    : {
                        backgroundColor: Constants.PRIMARY_LIGHTER,
                        border: `1px solid ${Constants.BORDER_LIGHT}`,
                      }
                }
              >
                {button.value}
              </button>
            </div>
          ))}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
      </div>
      <CreateCharacterButtons
        setSelector={setSelector}
        character_name={characterName}
        stats={stats}
      />
    </div>
  );
}

export default CreateCharacterComponent;
