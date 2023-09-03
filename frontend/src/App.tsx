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
      <div className="flex h-screen" style={{ backgroundColor: Constants.RED }}>
        <div className="w-1/3 flex-col">
          <DetailsSection />
          <InventorySection />
          <EquipmentSection />
          <ActiveSection />
          <ModifierSection />
        </div>

        <div className="flex-col">
          <CorruptionSection />
          <AbilitySection />
          <StatsSection />
        </div>
        <div className="w-1/3 flex-col">
          <ToughnessSection />
          <CombatSection />
          <DiceSection />
        </div>
      </div>
    </CharacterProvider>
  );
}

export default App;
