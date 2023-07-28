import React, { useState, useEffect } from "react";
import * as Constants from "../Constants";
import axios from "axios";

interface CharacterDetails {
  name: string;
}

interface CharacterLog {
  details: CharacterDetails;
}

function DropdownCharacter() {
  const [characterLogList, setCharacterLog] = useState([] as CharacterLog[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/characterlog").then((response) => {
      setCharacterLog(response.data);
    });
  });

  console.log(characterLogList);

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="d-flex flex-grow-1">
      <select
        className="form-select p-0 rounded-0"
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
    </div>
  );
}

export default DropdownCharacter;
