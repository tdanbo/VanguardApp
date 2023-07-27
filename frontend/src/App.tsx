import "./App.css";

import CombatSection from "./components/CombatSection/CombatSection";
import StatsSection from "./components/StatsSection/StatsSection";
import InventorySection from "./components/InventorySection/InventorySection";
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
  const [combatLogList, setCombatLog] = useState([] as CombatLog[]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/combatlog").then((response) => {
      setCombatLog(response.data);
    });
  });

  return (
    <>
      <div className="d-flex justify-content-space-around">
        <div style={{ width: Constants.SECTION_WIDTH }}>
          <InventorySection combatLogList={combatLogList} />
        </div>
        <div className="w-100">
          <StatsSection />
        </div>
        <div style={{ width: Constants.SECTION_WIDTH }}>
          <CombatSection combatLogList={combatLogList} />
        </div>
      </div>
    </>
  );
}

export default App;
