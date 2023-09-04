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

import TitleBox from "./components/TitleBox";

import CharacterProvider from "./contexts/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      {/* <div className="flex h-screen" style={{ backgroundColor: Constants.RED }}>

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
      </div> */}
      {/* <div className="flex h-screen w-full bg-red-900">
        <div className="flex h-full flex-col">
          <div className="h-[300px]">
            <ToughnessSection />
          </div>
          <div className="flex flex-grow flex-col bg-slate-500">
            <TitleBox title={"Combat"} />
            <div className="flex-grow overflow-auto">
              <CombatSection />
            </div>
          </div>
          <div className="h-[300px]">
            <DiceSection />
          </div>
        </div>
      </div> */}

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

{
  /* <div className="flex w-1/3 flex-col">
<div className="bg-slate-800">
  <DetailsSection />
</div>
<div className="h-[80%] bg-slate-500">
  <InventorySection />
  <EquipmentSection />
</div>
<div className="flex bg-slate-800">
  <ActiveSection />
  <ModifierSection />
</div>
</div>
<div className="flex flex-col">
<div className="bg-slate-800">
  <CorruptionSection />
</div>
<div className="h-[80%] bg-slate-500">
  <AbilitySection />
</div>
<div className="bg-slate-800">
  <StatsSection />
</div>
</div> */
}
