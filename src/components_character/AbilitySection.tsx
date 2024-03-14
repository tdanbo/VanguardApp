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
import InventoryEntryEmpty from "./InventoryEntryEmpty";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: AdvantageType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  abilities: AbilityEntry[];
}

function sortAbilities(a: AbilityEntry, b: AbilityEntry): number {
  return (
    Constants.TYPE_FILTER.indexOf(a.type.toLowerCase()) -
    Constants.TYPE_FILTER.indexOf(b.type.toLowerCase())
  );
}

function AbilitySection({
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  abilities,
}: NavigationProps) {
  const sortedAbilities = [...character.abilities].sort(sortAbilities);

  return (
    <>
      {sortedAbilities.map((ability, index) => {
        return (
          <AbilityEntryItem
            session={session}
            key={index}
            ability={ability}
            browser={false}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
          />
        );
      })}
      {Array.from({ length: 20 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </>
  );
}

export default AbilitySection;
