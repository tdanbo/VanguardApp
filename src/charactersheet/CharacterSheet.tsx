import styled from "styled-components";
import { AdvantageType, CharacterEntry, SessionEntry } from "../Types";
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
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.BACKGROUND};
  scrollbar-width: none;
`;

const DividerVertical = styled.div`
  height 100%;
  width: 1px;
  background: linear-gradient(to bottom, ${Constants.WIDGET_SECONDARY_FONT_INACTIVE} 0%, transparent 100%);
`;

const DividerHorizontal = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to left,
    ${Constants.WIDGET_SECONDARY_FONT_INACTIVE} 0%,
    transparent 100%
  );
`;

import { Socket } from "socket.io-client";

import {
  faCrosshairs,
  faEye,
  faNotEqual,
  faShield,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import CorruptionStatComponent from "../component/CorruptionStatComponent";
import HealthStatComponent from "../component/HealthStatComponent";
import PortraitComponent from "../component/PortraitComponent";
import StatComponent from "../component/StatComponent";
import { GetActives } from "../functions/ActivesFunction";
import EquipmentSection from "./EquipmentSection";
import { ActiveStateType } from "../Types";
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
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
};

function GetActiveIcon(active: string) {
  if (active == "attack") {
    return faCrosshairs;
  } else if (active == "defense") {
    return faShield;
  } else if (active == "casting") {
    return faSkull;
  } else if (active == "sneaking") {
    return faEye;
  } else {
    return faNotEqual;
  }
}

function CharacterSheet({
  websocket,
  session,
  character,
  isCreature,
  advantage,
  activeState,
  setAdvantage,
  setActiveState,
}: CharacterSheetProps) {
  const character_actives = GetActives(character);

  function FindActive(stat: string) {
    for (const [key, value] of Object.entries(character_actives)) {
      if (value.stat == stat) {
        return key;
      } else {
        continue;
      }
    }
    return "";
  }

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
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
          />
        </Row>
        <Column width={"100%"}>
          <Row width={"100%"}>
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"cunning"}
              stat_value={character.stats.cunning.value}
              stat_color={Constants.TYPE_COLORS[FindActive("cunning")]}
              stat_icon={GetActiveIcon(FindActive("cunning"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"discreet"}
              stat_value={character.stats.discreet.value}
              stat_color={Constants.TYPE_COLORS[FindActive("discreet")]}
              stat_icon={GetActiveIcon(FindActive("discreet"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"persuasive"}
              stat_value={character.stats.persuasive.value}
              stat_color={Constants.TYPE_COLORS[FindActive("persuasive")]}
              stat_icon={GetActiveIcon(FindActive("persuasive"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"quick"}
              stat_value={character.stats.quick.value}
              stat_color={Constants.TYPE_COLORS[FindActive("quick")]}
              stat_icon={GetActiveIcon(FindActive("quick"))}
              activeState={"normal"}
              advantage={advantage}
            />
          </Row>
          <Row width={"100%"}>
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"resolute"}
              stat_value={character.stats.resolute.value}
              stat_color={Constants.TYPE_COLORS[FindActive("resolute")]}
              stat_icon={GetActiveIcon(FindActive("resolute"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"strong"}
              stat_value={character.stats.strong.value}
              stat_color={Constants.TYPE_COLORS[FindActive("strong")]}
              stat_icon={GetActiveIcon(FindActive("strong"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"vigilant"}
              stat_value={character.stats.vigilant.value}
              stat_color={Constants.TYPE_COLORS[FindActive("vigilant")]}
              stat_icon={GetActiveIcon(FindActive("vigilant"))}
              activeState={"normal"}
              advantage={advantage}
            />
            <StatComponent
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"accurate"}
              stat_value={character.stats.accurate.value}
              stat_color={Constants.TYPE_COLORS[FindActive("accurate")]}
              stat_icon={GetActiveIcon(FindActive("accurate"))}
              activeState={"normal"}
              advantage={advantage}
            />
          </Row>
        </Column>
      </Container>
      <Container height={"130px"}>
        <Row width={"50%"}>
          <StatComponent
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            stat_name={"attack"}
            stat_value={character_actives.attack.value}
            stat_icon={faCrosshairs}
            stat_color={Constants.TYPE_COLORS["attack"]}
            active={true}
            activeState={activeState}
            advantage={advantage}
          />
          <StatComponent
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            stat_name={"defense"}
            stat_value={character_actives.defense.value}
            stat_icon={faShield}
            stat_color={Constants.TYPE_COLORS["defense"]}
            active={true}
            activeState={activeState}
            advantage={advantage}
          />
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
          <StatComponent
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            stat_name={"casting"}
            stat_value={character_actives.casting.value}
            stat_icon={faSkull}
            stat_color={Constants.TYPE_COLORS["casting"]}
            active={true}
            activeState={activeState}
            advantage={advantage}
          />
          <StatComponent
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            stat_name={"sneaking"}
            stat_value={character_actives.sneaking.value}
            stat_icon={faEye}
            stat_color={Constants.TYPE_COLORS["sneaking"]}
            active={true}
            activeState={activeState}
            advantage={advantage}
          />
        </Row>
      </Container>
      <DynamicContainer>
        <Column width="50%">
          <EquipmentSection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            activeState={activeState}
            advantage={advantage}
          />
          <DividerHorizontal />
          <ScrollColumn width="100%">
            <InventorySection
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              activeState={activeState}
              advantage={advantage}
            />
          </ScrollColumn>
        </Column>
        <DividerVertical />
        <ScrollColumn width="50%">
          <AbilitySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            activeState={activeState}
            advantage={advantage}
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
