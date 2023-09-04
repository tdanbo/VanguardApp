import StatInputBox from "./StatInputBox";
import NameInputBox from "./NameInputBox";
import * as Constants from "../../Constants";

import { useState, useEffect } from "react";
import { CharacterEntry } from "../../Types";
import axios from "axios";

type Character = {
  title: string;
  description: string;
};

interface CharacterProps {
  open: boolean;
  onClose: () => void;
}

function AddCharacterForm({ open, onClose }: CharacterProps) {
  const [name, setName] = useState("");
  const [accurate, setAccurate] = useState(0);
  const [cunning, setCunning] = useState(0);
  const [discreet, setDiscreet] = useState(0);
  const [persuasive, setPersuasive] = useState(0);
  const [quick, setQuick] = useState(0);
  const [resolute, setResolute] = useState(0);
  const [strong, setStrong] = useState(0);
  const [vigilant, setVigilant] = useState(0);

  const character_json: CharacterEntry = {
    details: {
      movement: 0,
      name: name,
      xp_earned: 50,
      modifier: 0,
    },
    toughness: {
      max: { value: 0, mod: 0 },
      pain: { value: 0, mod: 0 },
      damage: { value: 0, mod: 0 },
    },
    stats: {
      accurate: { value: accurate, mod: 0 },
      cunning: { value: cunning, mod: 0 },
      discreet: { value: discreet, mod: 0 },
      persuasive: { value: persuasive, mod: 0 },
      quick: { value: quick, mod: 0 },
      resolute: { value: resolute, mod: 0 },
      strong: { value: strong, mod: 0 },
      vigilant: { value: vigilant, mod: 0 },
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
    equipment: [],
  };

  // Post a todo
  const addCharacterHandler = () => {
    axios
      .post("http://localhost:8000/api/characterlog", character_json)
      .then((res) => console.log(res));
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          zIndex: "1000",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: Constants.DARK,
          padding: "25px",
          zIndex: "1000",
          borderRadius: "10px",
        }}
      >
        <form className="d-grid gap-2">
          <NameInputBox setState={setName} />
          <StatInputBox stat="Cunning" setState={setCunning} />
          <StatInputBox stat="Discreet" setState={setDiscreet} />
          <StatInputBox stat="Persuasive" setState={setPersuasive} />
          <StatInputBox stat="Quick" setState={setQuick} />
          <StatInputBox stat="Resolute" setState={setResolute} />
          <StatInputBox stat="Strong" setState={setStrong} />
          <StatInputBox stat="Vigilant" setState={setVigilant} />
          <StatInputBox stat="Accurate" setState={setAccurate} />
          <button
            className="whitespace-no-wrap mt-3 inline-block select-none rounded border px-3 py-1 text-center align-middle font-normal leading-normal no-underline"
            onClick={addCharacterHandler}
            type="button"
            style={{
              color: Constants.FONT_LIGHT,
              backgroundColor: Constants.GREEN,
              border: `1px solid ${Constants.BORDER_DARK}`,
              fontWeight: "bold",
            }}
          >
            Create Character
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCharacterForm;
