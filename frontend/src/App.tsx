import "./App.css";

import CombatSection from "./components/CombatSection/CombatSection";
import StatsSection from "./components/StatsSection/StatsSection";
import InventorySection from "./components/InventorySection/InventorySection";
import DropdownCharacter from "./components/DropdownCharacter";
import DeleteCharacter from "./components/DeleteCharacter";
import AddCharacter from "./components/AddCharacter";

import { CharacterEntry } from "./Types";

import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Constants from "./Constants";

import "bootstrap/dist/js/bootstrap";

type CombatLog = {
  character: string;
  result: number;
  active: string;
  type: string;
  details: string;
};

function App() {
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterEntry | null>(null);

  function getSelectedCharacter(selectedName: string) {
    axios
      .get(`http://localhost:8000/api/characterlog/${selectedName}`)
      .then((response) => {
        console.log(response.data);
        setSelectedCharacter(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching character data: ${error}`);
      });
  }

  useEffect(() => {
    getSelectedCharacter("Default");
  }, []);

  const [combatLogList, setCombatLog] = useState([] as CombatLog[]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/combatlog").then((response) => {
  //     setCombatLog(response.data);
  //   });
  // }); // This will check all the time);

  useEffect(() => {
    axios.get("http://localhost:8000/api/combatlog").then((response) => {
      setCombatLog(response.data);
    });
  }, []); // add an empty array here);

  return (
    <>
      <div className="d-flex justify-content-space-around">
        <div style={{ width: Constants.SECTION_WIDTH }}>
          <div
            className="d-flex"
            style={{ height: Constants.SECTION_TITLE_HEIGHT }}
          >
            <DeleteCharacter />
            <DropdownCharacter getSelectedCharacter={getSelectedCharacter} />
            <AddCharacter />
          </div>

          {selectedCharacter ? (
            <InventorySection selectedCharacter={selectedCharacter} />
          ) : (
            <div>Loading...</div> // or whatever you want to show when selectedCharacter is null
          )}
        </div>
        <div className="w-100">
          {selectedCharacter ? (
            <StatsSection selectedCharacter={selectedCharacter} />
          ) : (
            <div>Loading...</div> // or whatever you want to show when selectedCharacter is null
          )}
        </div>
        <div style={{ width: Constants.SECTION_WIDTH }}>
          <CombatSection combatLogList={combatLogList} />
        </div>
      </div>
    </>
  );
}

export default App;
