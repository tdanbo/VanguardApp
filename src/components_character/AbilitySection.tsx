import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { AbilityEntry, CharacterEntry, SessionEntry } from "../Types";
import AbilityEntryItem from "../components_browser/AbilityEntryItem";

import InventoryEntryEmpty from "./InventoryEntryEmpty";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;

  setEffectAbilities: React.Dispatch<
    React.SetStateAction<"effects" | "abilities">
  >;
}

function AbilitySection({
  character,
  session,
  websocket,
  isCreature,
  setEffectAbilities,
}: NavigationProps) {
  function sortAbilities(a: AbilityEntry, b: AbilityEntry): number {
    return (
      Constants.TYPE_FILTER.indexOf(a.static.category.toLowerCase()) -
      Constants.TYPE_FILTER.indexOf(b.static.category.toLowerCase())
    );
  }
  const sortedAbilities = [...character.abilities].sort(sortAbilities);

  return (
    <>
      <div
        className="row"
        style={{
          maxHeight: "10px",
          fontSize: "11px",
          fontWeight: "bold",
          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <span className="font--primary-1 button">Abilities</span>{" "}
        <div className="divider_horizontal" />
        <span
          className="font--primary-4 button"
          onClick={() => setEffectAbilities("effects")}
        >
          Effects
        </span>
      </div>
      {sortedAbilities.map((ability, index) => (
        <AbilityEntryItem
          session={session}
          key={ability.id || index} // Assuming `ability.id` is a stable identifier
          ability={ability}
          browser={false}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
          state="drop"
        />
      ))}
      {Array.from({ length: 20 }).map((_, index) => (
        <InventoryEntryEmpty key={index} />
      ))}
    </>
  );
}

export default AbilitySection;
