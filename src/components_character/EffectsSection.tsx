import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import { CharacterEntry, EffectEntry, SessionEntry } from "../Types";

import EffectEntryItem from "../components_browser/EffectEntryItem";
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

function EffectsSection({
  character,
  session,
  websocket,
  isCreature,
  setEffectAbilities,
}: NavigationProps) {
  function sortEffects(a: EffectEntry, b: EffectEntry): number {
    return (
      Constants.TYPE_FILTER.indexOf(a.static.category.toLowerCase()) -
      Constants.TYPE_FILTER.indexOf(b.static.category.toLowerCase())
    );
  }
  const sortedEffects = [...character.effects].sort(sortEffects);

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
        <span
          className="font--primary-4 button"
          onClick={() => setEffectAbilities("abilities")}
        >
          Abilities
        </span>{" "}
        <div className="divider_horizontal_right" />
        <span className="font--primary-1 button">Effects</span>
      </div>
      {sortedEffects.map((effect, index) => (
        <EffectEntryItem
          session={session}
          key={effect.id || index} // Assuming `effect.id` is a stable identifier
          effect={effect}
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

export default EffectsSection;
