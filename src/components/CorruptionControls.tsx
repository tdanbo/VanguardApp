import TitleBox from "./TitleBox";
import * as Constants from "./../Constants";
import CorruptionToken from "./CorruptionToken";
import CorruptionAdd from "./CorruptionAdd";
import CorruptionRemove from "./CorruptionRemove";

import { useState } from "react";

import { CharacterEntry } from "./../Types";

import React, { useContext } from "react";
import { CharacterContext } from "./../contexts/CharacterContext";

interface CorruptionEntry {
  corruption: number;
}

function CorruptionControls() {
  const { character, setCharacter } = useContext(CharacterContext);
  const [update, setUpdater] = useState(0);

  const temporary_corruption = character.corruption.temporary;
  const clean_corruption =
    character.corruption.threshold - temporary_corruption;

  console.log("Temporary corruption: ", temporary_corruption);
  console.log("Clean corruption: ", clean_corruption);

  return (
    <>
      <CorruptionRemove />
      <div className="flex flex-col p-2"></div>
      {[...Array(temporary_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={1} />
      ))}
      {[...Array(clean_corruption)].map((_, index) => (
        <CorruptionToken key={index} state={0} />
      ))}
      <div className="flex flex-col p-2"></div>
      <CorruptionAdd />
    </>
  );
}

export default CorruptionControls;
