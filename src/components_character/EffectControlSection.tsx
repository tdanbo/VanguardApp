import { Socket } from "socket.io-client";

import { CharacterEntry, SessionEntry } from "../Types";

import EffectCompactEntryItem from "../components_browser/EffectCompactEntryItem";

interface NavigationProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function EffectSection({
  character,
  session,
  websocket,
  isCreature,
}: NavigationProps) {
  return (
    <>
      <div className="row bg--background padding--small gap--small border ">
        {character.effects.map((effect, index) =>
          effect.static.type === "positive" ? (
            <EffectCompactEntryItem
              session={session}
              key={index}
              effect={effect}
              browser={false}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              state="drop"
            />
          ) : null,
        )}
      </div>
      <div className="row bg--background padding--small gap--small border ">
        {character.effects.map((effect, index) =>
          effect.static.type === "negative" ? (
            <EffectCompactEntryItem
              session={session}
              key={index}
              effect={effect}
              browser={false}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              state="drop"
            />
          ) : null,
        )}
      </div>
    </>
  );
}

export default EffectSection;
