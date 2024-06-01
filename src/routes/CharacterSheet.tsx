import styled from "styled-components";
import { AdvantageType, CharacterEntry, SessionEntry } from "../Types";
import AbilitySection from "../components_character/AbilitySection";
import CharacterNameBox from "../components_character/CharacterNameBox";
import ResourcesBox from "../components_character/ResourcesBox";
import XpBox from "../components_character/XpBox";
import StatComponent2 from "../components_character/StatComponent2";
import { FindActiveModFromStat } from "../functions/CharacterFunctions";
import "../layout.css";

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
  background-color: ${Constants.BACKGROUND};
  scrollbar-width: none;
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

import { Socket } from "socket.io-client";

import {
  faCrosshairs,
  faEye,
  faShield,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import CorruptionStatComponent from "../components_character/CorruptionStatComponent";
import HealthStatComponent from "../components_character/HealthStatComponent";
import PortraitComponent from "../components_character/PortraitComponent";
import { GetActives } from "../functions/ActivesFunction";
import UpdateAbilityStats from "../functions/rules/UpdateAbilityStats";
import EquipmentSection from "../components_character/EquipmentSection";
import RestComponent from "../components_character/RestComponent";
import { ActiveStateType } from "../Types";
type CharacterSheetProps = {
  websocket: Socket;
  session: SessionEntry;
  character: CharacterEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  inventoryState: number;
  setInventoryState: (value: number) => void;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isGm: boolean;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  modifierLock: boolean;
  setModifierLock: React.Dispatch<React.SetStateAction<boolean>>;
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
    return null;
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
  setCharacterId,
  criticalState,
  setCriticalState,
  modifierLock,
  setModifierLock,
}: CharacterSheetProps) {
  UpdateAbilityStats(character);
  const character_actives = GetActives(character);

  function FindActive(stat: string) {
    for (const [key, value] of Object.entries(character_actives)) {
      if (value.stat == stat) {
        return { active: key, mod: value.mod };
      } else {
        continue;
      }
    }
    return { active: "", mod: 0 };
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "2",
        backgroundColor: Constants.BACKGROUND,
        height: "100%",
        gap: "25px",
        boxSizing: "border-box",
        padding: "25px 50px 25px 50px",
      }}
    >
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
            modifierLock={modifierLock}
            setModifierLock={setModifierLock}
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
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setCharacterId={setCharacterId}
            criticalState={criticalState}
            setCriticalState={setCriticalState}
          />
        </Row>
        <Row width={"100%"}>
          <Column width={"50%"}>
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"vigilant"}
              stat_value={
                character.stats.vigilant.value +
                character.stats.vigilant.mod +
                FindActiveModFromStat("vigilant", character_actives)
              }
              stat_icon={GetActiveIcon(FindActive("vigilant").active)}
              stat_color={Constants.TYPE_COLORS[FindActive("vigilant").active]}
              active={true}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"strong"}
              stat_value={
                character.stats.strong.value +
                character.stats.strong.mod +
                FindActiveModFromStat("strong", character_actives)
              }
              stat_icon={GetActiveIcon(FindActive("strong").active)}
              stat_color={Constants.TYPE_COLORS[FindActive("strong").active]}
              active={true}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />

            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"resolute"}
              stat_value={
                character.stats.resolute.value +
                character.stats.resolute.mod +
                FindActiveModFromStat("resolute", character_actives)
              }
              stat_icon={GetActiveIcon(FindActive("resolute").active)}
              stat_color={Constants.TYPE_COLORS[FindActive("resolute").active]}
              active={true}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"accurate"}
              stat_value={
                character.stats.accurate.value +
                character.stats.accurate.mod +
                FindActiveModFromStat("accurate", character_actives)
              }
              stat_icon={GetActiveIcon(FindActive("accurate").active)}
              stat_color={Constants.TYPE_COLORS[FindActive("accurate").active]}
              active={true}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
          </Column>
          <Column width={"50%"}>
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"persuasive"}
              stat_value={
                character.stats.persuasive.value +
                character.stats.persuasive.mod +
                FindActiveModFromStat("persuasive", character_actives)
              }
              stat_color={
                Constants.TYPE_COLORS[FindActive("persuasive").active]
              }
              stat_icon={GetActiveIcon(FindActive("persuasive").active)}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"cunning"}
              stat_value={
                character.stats.cunning.value +
                character.stats.cunning.mod +
                FindActiveModFromStat("cunning", character_actives)
              }
              stat_color={Constants.TYPE_COLORS[FindActive("cunning").active]}
              stat_icon={GetActiveIcon(FindActive("cunning").active)}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"discreet"}
              stat_value={
                character.stats.discreet.value +
                character.stats.discreet.mod +
                FindActiveModFromStat("discreet", character_actives)
              }
              stat_color={Constants.TYPE_COLORS[FindActive("discreet").active]}
              stat_icon={GetActiveIcon(FindActive("discreet").active)}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />

            <StatComponent2
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              stat_name={"quick"}
              stat_value={
                character.stats.quick.value +
                character.stats.quick.mod +
                FindActiveModFromStat("quick", character_actives)
              }
              stat_icon={GetActiveIcon(FindActive("quick").active)}
              stat_color={Constants.TYPE_COLORS[FindActive("quick").active]}
              active={true}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              modifierLock={modifierLock}
            />
          </Column>
        </Row>
      </Container>
      <Container height={"50px"}>
        <Row width={"50%"}>
          {
            <HealthStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              browser={false}
            />
          }
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
      <DynamicContainer>
        <ScrollColumn width="50%">
          <div
            className="row"
            style={{
              maxHeight: "10px",
              fontSize: "11px",
              fontWeight: "bold",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            Equipment <DividerHorizontal />
          </div>
          <EquipmentSection
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
        <ScrollColumn width="50%">
          <div
            className="row"
            style={{
              maxHeight: "10px",
              fontSize: "11px",
              fontWeight: "bold",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            Abilities <DividerHorizontal />
          </div>
          <AbilitySection
            session={session}
            character={character}
            websocket={websocket}
            isCreature={isCreature}
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            setCriticalState={setCriticalState}
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
          <RestComponent
            character={character}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
          />
        </Row>
      </Container>
    </div>
  );
}

export default CharacterSheet;
