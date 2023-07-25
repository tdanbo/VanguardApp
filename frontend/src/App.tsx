import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import CombatEntry from "./components/CombatEntry";

function App() {
  return (
    <>
      <div>
        <CombatEntry
          character="Leman Russ"
          entryType="attack"
          entryResult={19}
          index={2}
        />
      </div>
    </>
  );
}

export default App;
