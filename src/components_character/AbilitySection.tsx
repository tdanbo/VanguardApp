import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
  EffectEntry,
} from "../Types";
import AbilityEntryItem from "../components_browser/AbilityEntryItem";
import InventoryEntryEmpty from "./InventoryEntryEmpty";
import {
  UpdateStaticAbility,
  UpdateStaticEffects,
} from "../functions/UtilityFunctions";
import EffectEntryItem from "../components_browser/EffectEntryItem";

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
  effects: EffectEntry[];
}

function sortAbilities(a: AbilityEntry, b: AbilityEntry): number {
  return (
    Constants.TYPE_FILTER.indexOf(a.static.type.toLowerCase()) -
    Constants.TYPE_FILTER.indexOf(b.static.type.toLowerCase())
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
  effects,
}: NavigationProps) {
  const sortedAbilities = [...character.abilities].sort(sortAbilities);

  return (
    <>
      {character.effects.map((effect, index) => {
        UpdateStaticEffects(effect, effects);
        return (
          <EffectEntryItem
            session={session}
            key={index}
            ability={effect}
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
      {sortedAbilities.map((ability, index) => {
        UpdateStaticAbility(ability, abilities);
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
