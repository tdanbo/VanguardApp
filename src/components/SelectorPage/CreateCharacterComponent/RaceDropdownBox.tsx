import React, { useState, FC } from "react";
import * as Constants from "../../../Constants";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

interface DropdownProps {
  options: string[];
  label?: string;
  onChange: (selectedOption: string) => void;
}

const SelectStyled = styled.select`
  width: 100%; // Makes select element occupy full width of its parent container
  height: 100%; // Makes select element occupy full height of its parent container
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 16px;
  cursor: pointer; // Change the cursor to indicate the select is clickable

  &:focus {
    outline: none; // Remove focus outline
  }
`;

const RaceDropdownBox: FC<DropdownProps> = ({ options, label, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  return (
    <Container>
      {label && <label>{label}</label>}
      <SelectStyled value={selectedOption} onChange={handleDropdownChange}>
        {options.map((option, index) => (
          <option
            style={{
              textAlign: "center",
              color: "grey",
              backgroundColor: "rgb(30, 30, 30)",
            }}
            key={index}
            value={option}
          >
            {option}
          </option>
        ))}
      </SelectStyled>
    </Container>
  );
};

export default RaceDropdownBox;
