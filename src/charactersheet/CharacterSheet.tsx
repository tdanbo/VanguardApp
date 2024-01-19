import { useState } from "react";
import styled from "styled-components";
import { ActiveKey, CharacterEntry, SessionEntry } from "../Types";
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

import { faCrosshairs, faEye, faNotEqual, faShield, faSkull } from "@fortawesome/free-solid-svg-icons";
import CorruptionStatComponent from "../component/CorruptionStatComponent";
import HealthStatComponent from "../component/HealthStatComponent";
import PortraitComponent from "../component/PortraitComponent";
import StatComponent from "../component/StatComponent";
import { GetActives } from "../functions/ActivesFunction";
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

function GetActiveIcon(active: ActiveKey) {
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
}: CharacterSheetProps) {
  const character_actives = GetActives(character);
  const [swapSource, setSwapSource] = useState<null | string>(null);

  character.stats["resolute"].active
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
        <Column width={"50%"}>
          <Row width={"100%"}>
            <StatComponent
              stat_name={"cunning"}
              stat_value={character.stats.cunning.value}
              stat_color={Constants.TYPE_COLORS[character.stats["cunning"].active]}
              stat_icon={GetActiveIcon(character.stats["cunning"].active)}
            />
            <StatComponent
              stat_name={"discreet"}
              stat_value={character.stats.discreet.value}
              stat_color={Constants.TYPE_COLORS[character.stats["discreet"].active]}
              stat_icon={GetActiveIcon(character.stats["discreet"].active)}
            />
            <StatComponent
              stat_name={"persuasive"}
              stat_value={character.stats.persuasive.value}
              stat_color={Constants.TYPE_COLORS[character.stats["persuasive"].active]}
              stat_icon={GetActiveIcon(character.stats["persuasive"].active)}
            />
            <StatComponent
              stat_name={"quick"}
              stat_value={character.stats.quick.value}
              stat_color={Constants.TYPE_COLORS[character.stats["quick"].active]}
              stat_icon={GetActiveIcon(character.stats["quick"].active)}
            />
          </Row>
          <Row width={"100%"}>
            <StatComponent
              stat_name={"resolute"}
              stat_value={character.stats.resolute.value}
              stat_color={Constants.TYPE_COLORS[character.stats["resolute"].active]}
              stat_icon={GetActiveIcon(character.stats["resolute"].active)}
            />
            <StatComponent
              stat_name={"strong"}
              stat_value={character.stats.strong.value}
              stat_color={Constants.TYPE_COLORS[character.stats["strong"].active]}
              stat_icon={GetActiveIcon(character.stats["strong"].active)}
            />
            <StatComponent
              stat_name={"vigilant"}
              stat_value={character.stats.vigilant.value}
              stat_color={Constants.TYPE_COLORS[character.stats["vigilant"].active]}
              stat_icon={GetActiveIcon(character.stats["vigilant"].active)}
            />
            <StatComponent
              stat_name={"accurate"}
              stat_value={character.stats.accurate.value}
              stat_color={Constants.TYPE_COLORS[character.stats["accurate"].active]}
              stat_icon={GetActiveIcon(character.stats["accurate"].active)}
            />
          </Row>
        </Column>
      </Container>
      <Container height={"130px"}>
        <Row width={"50%"}>
          <StatComponent
            stat_name={"attack"}
            stat_value={character_actives.attack.value}
            stat_icon={faCrosshairs}
            stat_color={Constants.TYPE_COLORS["attack"]}
            active={true}
          />
          <StatComponent
            stat_name={"defense"}
            stat_value={character_actives.defense.value}
            stat_icon={faShield}
            stat_color={Constants.TYPE_COLORS["defense"]}
            active={true}
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
            stat_name={"casting"}
            stat_value={character_actives.casting.value}
            stat_icon={faSkull}
            stat_color={Constants.TYPE_COLORS["casting"]}
            active={true}

          />
          <StatComponent
            stat_name={"sneaking"}
            stat_value={character_actives.sneaking.value}
            stat_icon={faEye}
            stat_color={Constants.TYPE_COLORS["sneaking"]}
            active={true}
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
