import styled from "styled-components";
import {
  CharacterEntry,
  SessionEntry,
  SimpleActive,
  AttackActive,
  DefenseActive,
} from "../Types";
import AbilitySection from "../charactersheet/AbilitySection";
import CharacterNameBox from "../charactersheet/CharacterNameBox";
import InventorySection from "../charactersheet/InventorySection";
import ResourcesBox from "../charactersheet/ResourcesBox";
import RestBox from "../charactersheet/RestBox";
import { useState } from "react";
import XpBox from "../charactersheet/XpBox";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import EmptyNavigation from "../components/NavigationControl/EmptyNavigation";
import InventoryNavigation from "../components/NavigationControl/InventoryNavigation";

import * as Constants from "../Constants";

const DividerRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

const RowScroll = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
  overflow: scroll;
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
`;

interface DivProps {
  width: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  background-color: #252525;
  max-width: ${(props) => props.width};
`;

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  background-color: #252525;
  max-width: ${(props) => props.width};
  overflow: scroll;
  scrollbar-width: none !important;
`;

const DividerVertical = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
  height 100%;
  width: 1px;
`;

const DividerHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height 1px;
  width: 100%;
`;

import { Socket } from "socket.io-client";
import { UpdateActives } from "../functions/ActivesFunction";

import PortraitComponent from "../component/PortraitComponent";
import ActiveStatComponent from "../component/ActiveStatComponent";
import SimpleStatComponent from "../component/SimpleStatComponent";
import HealthStatComponent from "../component/HealthStatComponent";
import CorruptionStatComponent from "../component/CorruptionStatComponent";
import PrimaryStatComponent from "../component/PrimaryStatComponent";

import {
  GetMovementSpeed,
  GetPainThreshold,
} from "../functions/RulesFunctions";
type CharacterSheetProps = {
  websocket: Socket;
  session: SessionEntry;
  character: CharacterEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  inventoryState: number;
  setInventoryState: (value: number) => void;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  setIsJoinOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  isCreature: boolean;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
};

function CharacterSheet({
  websocket,
  session,
  character,
  browserState,
  setBrowserState,
  gmMode,
  inventoryState,
  setInventoryState,
  setGmMode,
  setSession,
  isGm,
  isCreature,
}: CharacterSheetProps) {
  const actives = UpdateActives(character);
  const painthreshold = GetPainThreshold(character);
  const movementspeed = GetMovementSpeed(character);
  const [swapSource, setSwapSource] = useState<null | string>(null);
  return (
    <>
      <Container height={"3%"}>
        <Row width={"50%"}>
          <CharacterNameBox character={character} />
        </Row>
        <Row width={"50%"}>
          <XpBox
            websocket={websocket}
            session={session}
            character={character}
            isCreature={isCreature}
          />
        </Row>
      </Container>
      <Container height={"20%"}>
        <Row width={"50%"}>
          <PortraitComponent character={character} />
        </Row>
        <Column width={"50%"}>
          <Row width={"100%"}>
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Cunning"}
              type_value={character.stats.cunning.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Discreet"}
              type_value={character.stats.discreet.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Persuasive"}
              type_value={character.stats.persuasive.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Quick"}
              type_value={character.stats.quick.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
          </Row>
          <Row width={"100%"}>
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Resolute"}
              type_value={character.stats.resolute.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Strong"}
              type_value={character.stats.strong.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Vigilant"}
              type_value={character.stats.vigilant.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
            <PrimaryStatComponent
              character={character}
              session={session}
              websocket={websocket}
              type_name={"Accurate"}
              type_value={character.stats.accurate.value}
              swapSource={swapSource}
              setSwapSource={setSwapSource}
              isCreature={isCreature}
            />
          </Row>
        </Column>
      </Container>
      <Container height={"10%"}>
        <Row width={"50%"}>
          <Row width={"50%"}>
            <ActiveStatComponent
              websocket={websocket}
              session={session}
              active_name={"attack"}
              active={actives["attack"] as AttackActive}
              character={character}
              isCreature={isCreature}
            />
            <ActiveStatComponent
              websocket={websocket}
              session={session}
              active_name={"defense"}
              active={actives["defense"] as DefenseActive}
              character={character}
              isCreature={isCreature}
            />
          </Row>
          <Row width={"50%"}>
            <HealthStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
            />
          </Row>
        </Row>
        <Row width={"50%"}>
          <Row width={"50%"}>
            <CorruptionStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
            />
          </Row>
          <Row width={"50%"}>
            <ActiveStatComponent
              websocket={websocket}
              session={session}
              active_name={"casting"}
              active={actives["casting"] as SimpleActive}
              character={character}
              isCreature={isCreature}
            />
          </Row>
        </Row>
      </Container>
      <Container height={"66%"}>
        <Column width={"50%"}>
          <InventorySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </Column>
        <Column width={"50%"}>
          <AbilitySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </Column>
      </Container>
      <Container height={"3%"}>
        <Row width={"100%"}>
          <ResourcesBox
            character={character}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
          />
        </Row>
      </Container>
    </>
    // <>
    //   <Row height={"50px"}>

    //   </Row>
    //   <CharacterNavigation
    //     browserState={browserState}
    //     setBrowserState={setBrowserState}
    //     gmMode={gmMode}
    //     setGmMode={setGmMode}
    //     setSession={setSession}
    //     isGm={isGm}
    //   />
    //   <ActiveStatComponent
    //     websocket={websocket}
    //     session={session}
    //     active_name={"sneaking"}
    //     active={actives["sneaking"] as SimpleActive}
    //     character={character}
    //     isCreature={isCreature}
    //   />
    //   <SimpleStatComponent
    //     value={painthreshold}
    //     stat="Threshold"
    //     title="PAIN"
    //   />
    //   <SimpleStatComponent
    //     value={movementspeed}
    //     stat="Movement"
    //     title="SQUARES"
    //   />
    //   <Row height="300px">
    //     <PortraitComponent character={character} />
    //     <div
    //       style={{ height: "100%", backgroundColor: "#FFFFFF", width: "1px" }}
    //     ></div>
    //     <Column>
    //       <Row height="150px">
    //
    //       </Row>
    //       <Row height="150px">

    //       </Row>
    //     </Column>
    //   </Row>
    //   <Row height="100x">
    //     <EmptyNavigation />
    //     <DividerRow>
    //     </DividerRow>
    //     <div
    //       style={{ height: "100%", backgroundColor: "#FFFFFF", width: "1px" }}
    //     ></div>
    //     <DividerRow>
    //       <CorruptionStatComponent
    //         websocket={websocket}
    //         session={session}
    //         character={character}
    //         isCreature={isCreature}
    //       />
    //       <ActiveStatComponent
    //         websocket={websocket}
    //         session={session}
    //         active_name={"casting"}
    //         active={actives["casting"] as SimpleActive}
    //         character={character}
    //         isCreature={isCreature}
    //       />
    //     </DividerRow>
    //   </Row>
    //   <div
    //     style={{ height: "1px", backgroundColor: "#FFFFFF", width: "100%" }}
    //   ></div>
    //   <RowScroll>
    //     <InventoryNavigation
    //       character={character}
    //       inventoryState={inventoryState}
    //       setInventoryState={setInventoryState}
    //       gmMode={gmMode}
    //       session={session}
    //       websocket={websocket}
    //       isCreature={isCreature}
    //     />
    //     <InventorySection
    //       session={session}
    //       character={character}
    //       websocket={websocket}
    //       isCreature={isCreature}
    //     />
    //     <div
    //       style={{ height: "100%", backgroundColor: "#FFFFFF", width: "1px" }}
    //     ></div>
    //     <AbilitySection
    //       session={session}
    //       character={character}
    //       websocket={websocket}
    //       isCreature={isCreature}
    //     />
    //   </RowScroll>
    //   <Row height={"50px"}>
    //     <RestBox
    //       character={character}
    //       session={session}
    //       websocket={websocket}
    //       isCreature={isCreature}
    //     />

    //   </Row>
    // </>
  );
}

export default CharacterSheet;
