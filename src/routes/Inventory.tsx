import { Socket } from "socket.io-client";
import InventorySection from "../components_character/InventorySection";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";

import DropsBrowser from "../components_browser/DropsBrowser";

import RestComponent from "../components_character/RestComponent";
import DetailStatComponent from "../components_cleanup/DetailStatComponent";
import ValueAdjustComponent from "../components_cleanup/ValueAdjustComponent";

type InventoryProps = {
  websocket: Socket;
  session: SessionEntry;
  character: CharacterEntry;
  isCreature: boolean;

  isGm: boolean;
  setInventoryState: (state: number) => void;

  centralDisplay: DisplayType;
};

export default function Inventory({
  websocket,
  session,
  character,
  isCreature,

  isGm,
  setInventoryState,
}: InventoryProps) {
  return (
    <>
      <div className="header">
        <div className="row" style={{ width: "100%" }}>
          <>
            <div className="row">
              <div className="row bg--background padding--medium border">
                <DetailStatComponent
                  title={"THALER"}
                  value={character.coins.toString()}
                />
                <ValueAdjustComponent
                  type={"coins"}
                  session={session}
                  character={character}
                  websocket={websocket}
                  isCreature={isCreature}
                />
              </div>
              <div className="row bg--background padding--medium border">
                <DetailStatComponent
                  title={"RATIONS"}
                  value={character.rations.toString()}
                />
                <ValueAdjustComponent
                  type={"rations"}
                  session={session}
                  character={character}
                  websocket={websocket}
                  isCreature={isCreature}
                />
              </div>
              <div
                className="row bg--background padding--medium border"
                style={{ width: "auto" }}
              >
                <RestComponent
                  session={session}
                  character={character}
                  websocket={websocket}
                  isCreature={isCreature}
                />
              </div>
            </div>
          </>
        </div>
      </div>
      {session.loot.drops.length > 0 && !isGm ? (
        <DropsBrowser
          isGm={isGm}
          session={session}
          character={character}
          websocket={websocket}
          setInventoryState={setInventoryState}
          isCreature={isCreature}
        />
      ) : null}

      <div className="scroll_container" style={{ width: "100%" }}>
        <InventorySection
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
        />
      </div>
    </>
  );
}
