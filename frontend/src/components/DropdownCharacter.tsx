import React, { useState, useEffect, useContext } from "react";
import * as Constants from "../Constants";
import axios from "axios";

import { CharacterContext } from "../contexts/CharacterContext";

import { getCharacterEntry } from "../functions/CharacterFunctions";
import { CharacterEntry } from "../Types";
interface CharacterDetails {
  name: string;
}

interface CharacterLog {
  details: CharacterDetails;
}

function DropdownCharacter() {
  const { character, setCharacter } = useContext(CharacterContext);
  const [characterLogList, setCharacterLog] = useState([] as CharacterLog[]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/characterlog").then((response) => {
      setCharacterLog(response.data);
    });
  }, []);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelectedValue(selectedName);

    try {
      const updatedCharacter: CharacterEntry = await getCharacterEntry(
        selectedName,
      );
      setCharacter(updatedCharacter);
    } catch (error) {
      console.error("Failed to get character details:", error);
    }

    console.log(character);
  };

  return (
    <select
      className="flex grow"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        color: Constants.RED,
        border: `1px solid ${Constants.BORDER}`,
      }}
      value={selectedValue || ""}
      onChange={handleSelect}
    >
      <option value="">Select an option</option>
      {characterLogList.map((characterEntry) => (
        <option
          key={characterEntry.details.name}
          value={characterEntry.details.name}
        >
          {characterEntry.details.name}
        </option>
      ))}
    </select>
  );
}

export default DropdownCharacter;
