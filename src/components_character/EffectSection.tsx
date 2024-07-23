import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import AbilityEntryItem from "../components_browser/AbilityEntryItem";
import EffectEntryItem from "../components_browser/EffectEntryItem";
import InventoryEntryEmpty from "./InventoryEntryEmpty";
import EffectCompactEntryItem from "../components_browser/EffectCompactEntryItem";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

function EffectSection({
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCriticalState,
}: NavigationProps) {
  return (
    <>
      {character.effects.map((effect, index) => {
        return (
          <EffectCompactEntryItem
            session={session}
            key={index}
            effect={effect}
            browser={false}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            setCriticalState={setCriticalState}
            state="drop"
          />
        );
      })}
    </>
  );
}

export default EffectSection;
