import { useState } from "react";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";
import AbilitySection from "../charactersheet/AbilitySection";
import CharacterNameBox from "../charactersheet/CharacterNameBox";
import InventorySection from "../charactersheet/InventorySection";
import ResourcesBox from "../charactersheet/ResourcesBox";
import XpBox from "../charactersheet/XpBox";

import * as Constants from "../Constants";

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

interface DivProps {
  width: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

const DividerVertical = styled.div`
  height 100%;
  width: 1px;
  background: linear-gradient(to bottom, ${Constants.WIDGET_SECONDARY_FONT_INACTIVE} 0%, transparent 100%);
`;

import { Socket } from "socket.io-client";

import ActiveStatComponent from "../component/ActiveStatComponent";
import CorruptionStatComponent from "../component/CorruptionStatComponent";
import HealthStatComponent from "../component/HealthStatComponent";
import PortraitComponent from "../component/PortraitComponent";
import PrimaryStatComponent from "../component/PrimaryStatComponent";
import { GetActives, ApplyRules } from "../functions/ActivesFunction";
import { cloneDeep } from "lodash";
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
  isCreature,
}: CharacterSheetProps) {
  const character_actives = GetActives(character);

  const [swapSource, setSwapSource] = useState<null | string>(null);
  return (
    <>
      <Container height={"40px"}>
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
      <Container height={"260px"}>
        <Row width={"50%"}>
          <PortraitComponent
            character={character}
            actives={character_actives}
          />
        </Row>
        <Column width={"100%"}>
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
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
              actives={character_actives}
            />
          </Row>
        </Column>
      </Container>
      <Container height={"60px"} className="show-div">
        <Row width={"50%"}>
          <HealthStatComponent
            websocket={websocket}
            session={session}
            character={character}
            isCreature={isCreature}
            browser={false}
          />
        </Row>
        <Row width={"50%"}>
          <CorruptionStatComponent
            websocket={websocket}
            session={session}
            character={character}
            isCreature={isCreature}
            browser={false}
          />
        </Row>
      </Container>
      <Container height={"130px"}>
        <Row width={"25%"}>
          <ActiveStatComponent
            websocket={websocket}
            session={session}
            active_name={"attack"}
            active_value={character_actives.attack.value}
            character={character}
            isCreature={isCreature}
          />
        </Row>
        <Row width={"25%"}>
          <ActiveStatComponent
            websocket={websocket}
            session={session}
            active_name={"defense"}
            active_value={character_actives.defense.value}
            character={character}
            isCreature={isCreature}
          />
        </Row>
        <Row width={"25%"} className="hide-div">
          <HealthStatComponent
            websocket={websocket}
            session={session}
            character={character}
            isCreature={isCreature}
            browser={false}
          />
        </Row>
        <Row width={"25%"} className="hide-div">
          <CorruptionStatComponent
            websocket={websocket}
            session={session}
            character={character}
            isCreature={isCreature}
            browser={false}
          />
        </Row>
        <Row width={"25%"}>
          <ActiveStatComponent
            websocket={websocket}
            session={session}
            active_name={"casting"}
            active_value={character_actives.casting.value}
            character={character}
            isCreature={isCreature}
          />
        </Row>
        <Row width={"25%"}>
          <ActiveStatComponent
            websocket={websocket}
            session={session}
            active_name={"sneaking"}
            active_value={character_actives.sneaking.value}
            character={character}
            isCreature={isCreature}
          />
        </Row>
      </Container>
      <DynamicContainer>
        <ScrollColumn width="50%">
          <InventorySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </ScrollColumn>
        <DividerVertical />
        <ScrollColumn width="50%">
          <AbilitySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
          />
        </ScrollColumn>
      </DynamicContainer>
      <Container height={"30px"}>
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
  );
}

export default CharacterSheet;
