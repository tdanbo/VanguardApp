import * as Constants from "../Constants";
import { useState } from "react";

interface StatDropdownProps {
  Active: string;
}

function StatDropdown({ Active }: StatDropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setSelectedValue(selectedName);
  };

  return (
    <div className="m-0 flex p-1">
      <div
        className="bold items-right flex w-40 grow justify-center rounded-l font-bold"
        style={{
          backgroundColor: Constants.PRIMARY,
          color: Constants.RED,
          border: `1px solid ${Constants.BORDER}`,
        }}
      >
        {Active}
      </div>
      <select
        className="bold flex w-40 grow rounded-r text-center font-bold"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          color: Constants.RED,
          border: `1px solid ${Constants.BORDER}`,
        }}
        value={selectedValue || ""}
        onChange={handleSelect}
      >
        <option value="Cunning">Cunning</option>
        <option value="Discreet">Discreet</option>
        <option value="Persuasive">Persuasive</option>
        <option value="Quick">Quick</option>
        <option value="Resolute">Resolute</option>
        <option value="Strong">Strong</option>
        <option value="Vigilant">Vigilant</option>
        <option value="Accurate">Accurate</option>
      </select>
    </div>
  );
}

export default StatDropdown;
