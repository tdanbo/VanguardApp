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

interface ContainerProps {
  height: string;
}

interface DivProps {
  width: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

interface DivDropProps {
  width: string;
  $gm: boolean;
}

const ScrollDropsColumn = styled.div<DivDropProps>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.$gm ? "100%" : "335px")};
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
  background-color: ${Constants.BACKGROUND};
  scrollbar-width: none;
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
  background-color: ${Constants.BACKGROUND};
  scrollbar-width: none;
`;

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

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
          <ScrollDropsColumn width="100%" $gm={isGm}>
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
          </ScrollDropsColumn>
        </>
      ) : null}
      {!isGm ? (
        <ScrollColumn width="100%">
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
        </ScrollColumn>
      ) : null}
      <Container height={"30px"}>
        <Row width={"100%"}>
          {!isGm ? null : (
            <DropControlComponent
              session={session}
              websocket={websocket}
              isGm={isGm}
            />
          )}
        </Row>
      </Container>
    </>
  );
}
