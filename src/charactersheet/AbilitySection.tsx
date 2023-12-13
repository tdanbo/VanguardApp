import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import { AbilityEntry, CharacterEntry, SessionEntry } from "../Types";
import AbilityEntryItem from "../components/Entries/AbilityEntryItem";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";
const Container = styled.div<{ hidden: boolean }>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

interface NavigationProps {
  inventoryState: number;
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function sortAbilities(a: AbilityEntry, b: AbilityEntry): number {
  return (
    Constants.TYPE_FILTER.indexOf(a.type.toLowerCase()) -
    Constants.TYPE_FILTER.indexOf(b.type.toLowerCase())
  );
}

function AbilitySection({
  inventoryState,
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  const sortedAbilities = [...character.abilities].sort(sortAbilities);

  return (
    <Container hidden={inventoryState === 0 || inventoryState === 1}>
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
          />
        );
      })}
      {Array.from({ length: 15 }).map((_, index) => {
        return <InventoryEntryEmpty key={index} />;
      })}
    </Container>
  );
}

export default AbilitySection;
