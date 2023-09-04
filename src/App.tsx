import "./App.css";
import "./index.css";

import StatsSection from "./components/Sections/StatSection";

import CorruptionSection from "./components/Sections/CorruptionSection";
import AbilitySection from "./components/Sections/AbilitySection";

import DetailsSection from "./components/Sections/DetailsSection";
import InventorySection from "./components/Sections/InventorySection";
import EquipmentSection from "./components/Sections/EquipmentSection";
import ActiveSection from "./components/Sections/ActiveSection";
import ModifierSection from "./components/Sections/ModifierSection";

import ToughnessSection from "./components/Sections/ToughnessSection";
import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";

import * as Constants from "./Constants";

import CharacterProvider from "./contexts/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <div className="flex" style={{ backgroundColor: Constants.DARK }}>
        <div className="flex h-screen w-1/3 flex-col px-1">
          <DetailsSection />
          <InventorySection />
          <EquipmentSection />
          <div className="flex">
            <ActiveSection />
            <ModifierSection />
          </div>
        </div>
        <div className="flex h-screen w-full flex-col px-1">
          <CorruptionSection />
          <AbilitySection />
          <StatsSection />
        </div>
        <div className="flex h-screen w-1/3 flex-col px-1">
          <ToughnessSection />
          <CombatSection />
          <DiceSection />
        </div>
      </div>
    </CharacterProvider>
  );
}

export default App;
