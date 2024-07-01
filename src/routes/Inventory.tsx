import React from "react";

import styled from "styled-components";
import * as Constants from "../Constants";
import InventorySection from "../components_character/InventorySection";
import { Socket } from "socket.io-client";
import { CharacterEntry, SessionEntry } from "../Types";
import { ActiveStateType, AdvantageType } from "../Types";
import DropControlComponent from "../components_browser/DropControlComponent";
import DropsBrowser from "../components_browser/DropsBrowser";
import { GetItemListPrice } from "../functions/UtilityFunctions";

import DetailStatComponent from "../components_cleanup/DetailStatComponent";
import RestComponent from "../components_character/RestComponent";
import ValueAdjustComponent from "../components_cleanup/ValueAdjustComponent";

const DividerHorizontal = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    ${Constants.WIDGET_SECONDARY_FONT_INACTIVE} 0%,
    transparent 100%
  );
  margin-top: 5px;
`;

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
      {session.loot.drops.length > 0 || isGm ? (
        <>
          <div className="header">
            <div className="row" style={{ width: "100%" }}>
              {!isGm ? (
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
              ) : (
                <DropControlComponent
                  session={session}
                  websocket={websocket}
                  isGm={isGm}
                />
              )}
            </div>
          </div>
          <div
            className="scroll_container"
            style={{ width: "100%", maxHeight: isGm ? "100%" : "335px" }}
          >
            <div className="row">
              <div
                className="row"
                style={{
                  width: "auto",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
                }}
              >
                Drops
              </div>
              <DividerHorizontal />
              {session.loot.drops.length > 0 && isGm ? (
                <div
                  className="row"
                  style={{
                    fontSize: "11px",
                    justifyContent: "right",
                  }}
                >
                  {GetItemListPrice(session.loot.drops)} Thaler
                </div>
              ) : null}
            </div>
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
          </div>
        </>
      ) : null}
      {!isGm ? (
        <div className="scroll_container" style={{ width: "100%" }}>
          <div
            className="row"
            style={{
              maxHeight: "10px",
              fontSize: "11px",
              fontWeight: "bold",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            Inventory <DividerHorizontal />
          </div>
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
      ) : null}
    </>
  );
}
