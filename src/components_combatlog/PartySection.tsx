import { Socket } from "socket.io-client";
import { DisplayType, SessionEntry } from "../Types";

import CharacterPartyComponent from "../components_cleanup/CharacterPartyComponent";

interface PartySectionProps {
  session: SessionEntry;
  websocket: Socket;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function PartySection({
  session,
  websocket,
  setCharacterId,
  setIsCreature,
  setIsGm,
  isGm,
  setDisplay,
}: PartySectionProps) {
  return (
    <div className="column" style={{ width: "100%", maxHeight: "260px" }}>
      {session.characters.map((entry, index) => {
        return (
          <CharacterPartyComponent
            key={index}
            character={entry}
            session={session}
            websocket={websocket}
            setIsCreature={setIsCreature}
            isCreature={false}
            setCharacterId={setCharacterId}
            setIsGm={setIsGm}
            isGm={isGm}
            setDisplay={setDisplay}
          />
        );
      })}
    </div>
  );
}

export default PartySection;
