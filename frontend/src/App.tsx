import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import CombatSection from "./components/CombatSection";
import StatsSection from "./components/StatsSection";
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
      <div className="d-flex justify-content-space-around">
        <div className="w-100">
          <StatsSection />
        </div>
        <div style={{ width: "500px" }}>
          <CombatSection combatLogList={combatLogList} />
        </div>
      </div>
    </>
  );
}

export default App;
