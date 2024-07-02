import React from "react";

import InventorySection from "../components_character/InventorySection";
import { Socket } from "socket.io-client";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";
import { ActiveStateType, AdvantageType } from "../Types";

import DropsBrowser from "../components_browser/DropsBrowser";

import DetailStatComponent from "../components_cleanup/DetailStatComponent";
import RestComponent from "../components_character/RestComponent";
import ValueAdjustComponent from "../components_cleanup/ValueAdjustComponent";

type InventoryProps = {
  websocket: Socket;
  session: SessionEntry;
  character: CharacterEntry;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  isGm: boolean;
  setInventoryState: (state: number) => void;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  centralDisplay: DisplayType;
};

export default function Inventory({
  websocket,
  session,
  character,
  isCreature,
  advantage,
  activeState,
  setAdvantage,
  setActiveState,
  isGm,
  setInventoryState,
  criticalState,
  setCriticalState,
}: InventoryProps) {
  return (
    <>
      <div className="header">
        <div className="row" style={{ width: "100%" }}>
          <>
            <div className="row">
              <div
                className="row outline_color"
                style={{ padding: "1px", paddingLeft: "30px" }}
              >
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
              <div
                className="row outline_color"
                style={{ padding: "1px", paddingLeft: "30px" }}
              >
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
              <RestComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
              />
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
          advantage={advantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
        />
      ) : null}

      <div className="scroll_container" style={{ width: "100%" }}>
        <InventorySection
          session={session}
          character={character}
          websocket={websocket}
          isCreature={isCreature}
          activeState={activeState}
          advantage={advantage}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
        />
      </div>
    </>
  );
}
