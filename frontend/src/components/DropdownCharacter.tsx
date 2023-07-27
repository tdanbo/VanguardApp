import React, { useState } from "react";
import * as Constants from "../Constants";
const DropdownCharacter: React.FC = () => {
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
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default DropdownCharacter;
