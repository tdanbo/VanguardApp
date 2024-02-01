import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import AbilityEntryItem from "../components/Entries/AbilityEntryItem";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  activeState: ActiveStateType;
  advantage: boolean;
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
