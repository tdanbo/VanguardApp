import "./App.css";
import "./index.css";

import AbilitySection from "./components/Sections/AbilitySection";

import DetailsSection from "./components/Sections/DetailsSection";
import InventorySection from "./components/Sections/InventorySection";
import EquipmentSection from "./components/Sections/EquipmentSection";
import ActiveSection from "./components/Sections/ActiveSection";
import ModifierSection from "./components/Sections/ModifierSection";

import CombatSection from "./components/Sections/CombatSection";
import DiceSection from "./components/Sections/DiceSection";

import * as Constants from "./Constants";

import CharacterProvider from "./contexts/CharacterContext";
import UserProvider from "./contexts/UserContext";
import SessionProvider from "./contexts/SessionContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";

import CorruptionBox from "./components/CorruptionBox";
import ToughnessBox from "./components/ToughnessBox/ToughnessBox";
import CorruptionControls from "./components/CorruptionControls/CorruptionControls";
import StatsControls from "./components/StatsControls/StatsControls";
import PortraitBox from "./components/PortraixBox/PortraitBox";

import {
  onAddToughness,
  onSubToughness,
  onAddPermCorruption,
  onSubPermCorruption,
} from "./functions/CharacterFunctions";

function App() {
  return (
    <UserProvider>
      <SessionProvider>
        <CharacterProvider>
          <WebSocketProvider>
            {/* <div className="flex" style={{ backgroundColor: Constants.DARK }}>
              <div className="flex h-screen w-1/3 flex-col"></div>
              <div className="flex h-screen w-1/3 flex-col">
                <div className="flex h-1/2 flex-col">
                  <div className="flex">
                    <PortraitBox />
                    <StatsSection />
                  </div>
                  <div className="flex flex-row">
                    <CorruptionControls />
                    <CorruptionBox
                      onAddFunction={onAddPermCorruption}
                      onSubFunction={onSubPermCorruption}
                    />

                    <ToughnessBox
                      onAddFunction={onAddToughness}
                      onSubFunction={onSubToughness}
                    />
                  </div>
                </div>
                <div className="h-1/2 flex-col">
                  <InventorySection />
                </div>
              </div>
              <div className="flex h-screen w-1/3 flex-col">
                <CombatSection />
                <DiceSection />
              </div>
            </div> */}
            <div className="row">
              <div className="column"></div>
              <div className="column">
                <div className="middle">
                  <div className="upper">
                    <div className="portrait">
                      <PortraitBox />
                    </div>
                    <div className="stats">
                      <StatsControls />
                    </div>
                  </div>
                  <div className="survivability">
                    <div className="corruption">
                      <CorruptionControls />
                      <ToughnessBox
                        onAddFunction={onAddToughness}
                        onSubFunction={onSubToughness}
                      />
                    </div>
                    <div className="toughness">
                      <ToughnessBox
                        onAddFunction={onAddToughness}
                        onSubFunction={onSubToughness}
                      />
                    </div>
                  </div>
                </div>
                <div className="middle"></div>
              </div>
              <div className="column"></div>
            </div>
          </WebSocketProvider>
        </CharacterProvider>
      </SessionProvider>
    </UserProvider>
  );
}

{
  /* <EquipmentSection />
<AbilitySection /> 
<ActiveSection />
<ModifierSection />
<DetailsSection 
<RestBox />
<EquipmentBrowser />
        <StatSettings />
/>*/
}

export default App;
