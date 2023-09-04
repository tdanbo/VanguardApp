import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import CorruptionBox from "../CorruptionToken";
import CorruptionAdd from "../CorruptionAdd";
import CorruptionRemove from "../CorruptionRemove";

import { useState } from "react";

import { CharacterEntry } from "../../Types";

import React, { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";
import CorruptionControls from "../CorruptionControls";

interface CorruptionEntry {
  corruption: number;
}

function CorruptionSection() {
  return (
    <>
      <TitleBox title={"Corruption"} />
      <div
        className="flex p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
          height: Constants.SECTION_HEIGHT,
          minHeight: Constants.SECTION_HEIGHT,
        }}
      >
        <CorruptionControls />
      </div>
    </>
  );
}

export default CorruptionSection;
