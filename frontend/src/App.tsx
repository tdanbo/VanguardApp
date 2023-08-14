import "./App.css";
import "./index.css";
import CombatSection from "./components/CombatSection/CombatSection";
import StatsSection from "./components/StatsSection/StatsSection";
import InventorySection from "./components/InventorySection/InventorySection";
import DropdownCharacter from "./components/DropdownCharacter";
import DeleteCharacter from "./components/DeleteCharacter";
import AddCharacter from "./components/AddCharacter";

import * as Constants from "./Constants";

import CharacterProvider from "./contexts/CharacterContext";

function App() {
  return (
    <CharacterProvider>
      <div className="flex">
        <div className="w-1/3">
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
        <div className="w-full">
          <StatsSection />
        </div>
        <div className="w-1/3">
          <CombatSection />
        </div>
      </div>
    </CharacterProvider>
  );
}

export default App;
