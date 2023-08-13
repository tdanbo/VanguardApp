import "./App.css";
import "./index.css";
import CombatSection from "./components/CombatSection/CombatSection";
import StatsSection from "./components/StatsSection/StatsSection";
import InventorySection from "./components/InventorySection/InventorySection";
import DropdownCharacter from "./components/DropdownCharacter";
import DeleteCharacter from "./components/DeleteCharacter";
import AddCharacter from "./components/AddCharacter";

import TitleBox from "./components/TitleBox";
import { CharacterEntry } from "./Types";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import * as Constants from "./Constants";

import CharacterProvider from "./contexts/CharacterContext";

import { CharacterContext } from "./contexts/CharacterContext";

function App() {
  const { character, setCharacter } = useContext(CharacterContext);
  console.log(character);

  return (
    <CharacterProvider>
      <div className="flex">
        <div className="w-1/2">
          <div
            className="flex px-1"
            style={{
              height: Constants.SECTION_TITLE_HEIGHT,
              backgroundColor: Constants.DARK,
            }}
          >
            <DeleteCharacter />
            <DropdownCharacter />
            <AddCharacter />
          </div>
          <InventorySection />
        </div>
        <div>
          <StatsSection />
        </div>
        {/* <div className="w-1/2">
          <CombatSection combatLogList={combatLogList} />
        </div> */}
      </div>
    </CharacterProvider>
  );
}

export default App;
