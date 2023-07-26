import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import CombatEntry from "./components/CombatEntry";
import CombatEntryList from "./components/CombatEntryList";
import React, { useState, useEffect } from "react";
import axios from "axios";

type CombatLog = {
  character: string;
  result: number;
  active: string;
  type: string;
  details: string;
};

function App() {
  const [combatLogList, setCombatLog] = useState([] as CombatLog[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/combatlog").then((response) => {
      setCombatLog(response.data);
    });
  });

  return (
    <>
      <div>
        <CombatEntryList combatLogList={combatLogList} />
      </div>
    </>
  );
}

export default App;
