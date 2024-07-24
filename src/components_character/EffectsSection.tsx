import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  EffectEntry,
  SessionEntry,
} from "../Types";
import AbilityEntryItem from "../components_browser/AbilityEntryItem";
import EffectEntryItem from "../components_browser/EffectEntryItem";
import InventoryEntryEmpty from "./InventoryEntryEmpty";
import EffectCompactEntryItem from "../components_browser/EffectCompactEntryItem";
import { useState } from "react";

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
  setEffectAbilities: React.Dispatch<
    React.SetStateAction<"effects" | "abilities">
  >;
}

function EffectsSection({
  character,
  session,
  websocket,
  isCreature,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCriticalState,
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
          activeState={activeState}
          advantage={advantage}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          setCriticalState={setCriticalState}
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
