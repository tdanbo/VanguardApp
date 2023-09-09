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

function CharacterLabel() {
  const { character, setCharacter } = useContext(CharacterContext);

  return (
    <div
      className="flex grow items-center justify-center pr-8"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        color: Constants.RED,
        border: `1px solid ${Constants.BORDER}`,
      }}
    >
      {character.details.name}
    </div>
  );
}

export default CharacterLabel;
