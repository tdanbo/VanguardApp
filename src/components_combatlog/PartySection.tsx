import { Socket } from "socket.io-client";
import styled from "styled-components";
import { DisplayType, SessionEntry } from "../Types";
import * as Constants from "../Constants";

import CharacterPartyComponent from "../components_cleanup/CharacterPartyComponent";
type DivProps = {
  width: string;
};
interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

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
