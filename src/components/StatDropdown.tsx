import * as Constants from "../Constants";
import { useState } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";

import { onUpdateActive } from "../functions/CharacterFunctions";
import { ActiveKey } from "../Types";

interface StatDropdownProps {
  active: ActiveKey;
}

function StatDropdown({ active }: StatDropdownProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    character.actives[active],
  );

  // Get all the current active values from the character
  const activeValues = Object.values(character.actives);

  // Define all possible options
  const allOptions = [
    "cunning",
    "discreet",
    "persuasive",
    "quick",
    "resolute",
    "strong",
    "vigilant",
    "accurate",
  ];

  // Filter out the options that are already in character.actives values
  const availableOptions = allOptions.filter(
    (option) =>
      option === character.actives[active as keyof typeof character.actives] ||
      !activeValues.some((active) => active.stat === option),
  );

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stat = event.target.value;
    setSelectedValue(stat);
    const updatedcharacter = onUpdateActive({ active, stat, character });
    setCharacter(updatedcharacter);
  };

  function toTitleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div className="m-0 flex p-1">
      <div
        className="bold items-right flex w-40 grow justify-center rounded-l font-bold"
        style={{
          backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
          color: Constants.RED,
          border: `1px solid ${Constants.WIDGET_BORDER}`,
        }}
      >
        {toTitleCase(active)}
      </div>
      <select
        className="bold flex w-40 grow rounded-r text-center font-bold"
        style={{
          backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
          color: Constants.RED,
          border: `1px solid ${Constants.WIDGET_BORDER}`,
        }}
        value={selectedValue || ""}
        onChange={handleSelect}
      >
        {availableOptions.map((option) => (
          <option key={option} value={option}>
            {toTitleCase(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StatDropdown;
