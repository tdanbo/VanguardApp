import StatInputBox from "./StatInputBox";
import NameInputBox from "./NameInputBox";
import * as Constants from "../../Constants";

import { useState, useEffect } from "react";

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
  const [accurate, setAccurate] = useState("");
  const [cunning, setCunning] = useState("");
  const [discreet, setDiscreet] = useState("");
  const [persuasive, setPersuasive] = useState("");
  const [quick, setQuick] = useState("");
  const [resolute, setResolute] = useState("");
  const [strong, setStrong] = useState("");
  const [vigilant, setVigilant] = useState("");

  const character_json = {
    details: {
      movement: 0,
      name: name,
      unspent: 50,
      xp: 0,
    },
    toughness: {
      max: 0,
      pain: 0,
      damage: 0,
    },
    stats: {
      accurate: accurate,
      cunning: cunning,
      discreet: discreet,
      persuasive: persuasive,
      quick: quick,
      resolute: resolute,
      strong: strong,
      vigilant: vigilant,
    },
    corruption: {},
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
