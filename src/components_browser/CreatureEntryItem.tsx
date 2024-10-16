import { faPlus, faSkull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";
import AddCreatureToRoster from "./AddCreatureToRoster";
import { delete_creature } from "../functions/CharacterFunctions";
const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 50px;
  min-height: 50px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
  min-height: 35px;
  max-height: 35px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  margin-left: 5px;
  cursor: pointer;
`;

const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const ExpandButten = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-bottom: 5px;
  font-size: 12px;
`;

type CreatureNameColor = {
  color: string;
};

const CreatureName = styled.div<CreatureNameColor>`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${(props) => props.color};
  font-size: 15px;
  font-weight: bold;
`;

const AbilityDetail = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
`;

import { Socket } from "socket.io-client";
import { update_session } from "../functions/SessionsFunctions";
import { cloneDeep } from "lodash";
import { GetGameData } from "../contexts/GameContent";
interface AbilityEntryItemProps {
  session: SessionEntry;
  character: CharacterEntry;
  creature: CharacterEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  websocket: Socket;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  isGm: boolean;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  setCentralDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function CreatureEntryItem({
  session,
  character,
  creature,
  setIsCreature,
  websocket,
  setCharacterId,
  setDisplay,
  setCentralDisplay,
}: AbilityEntryItemProps) {
  const { updateCreatureData } = GetGameData();
  const suffixLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < alphabet.length; i++) {
      const candidateName = creature.name + " " + alphabet[i];
      const exists = session.encounter.some(
        (enc) => enc.name === candidateName,
      );
      if (!exists) {
        // If candidateName is unique, return it
        return candidateName;
      }
    }

    return creature.name + "Z"; // Fallback, should ideally handle this better
  };

  const AddEncounterCreature = async () => {
    const new_encounter_creature = cloneDeep(creature);
    new_encounter_creature.name = suffixLetter();
    new_encounter_creature.health.damage = 0;
    new_encounter_creature.creature = true;
    session.encounter.push(new_encounter_creature);
    update_session(session, websocket);
    setCentralDisplay("gamemaster");
  };

  const selectCreature = () => {
    setIsCreature(true);
    setDisplay("inventory");
    setCharacterId(creature.id);
  };

  const HandleDeleteCreature = async () => {
    await delete_creature(creature.id);
    await updateCreatureData();
  };

  const [resistance, setResistance] = useState<string>("Weak");

  useEffect(() => {
    if (creature.details.xp_earned < 50) {
      setResistance("Weak");
    } else if (creature.details.xp_earned < 150) {
      setResistance("Ordinary");
    } else if (creature.details.xp_earned < 300) {
      setResistance("Challenging");
    } else if (creature.details.xp_earned <= 600) {
      setResistance("Strong");
    } else if (creature.details.xp_earned <= 1200) {
      setResistance("Mighty");
    } else {
      setResistance("Legendary");
    }
  }, [creature.details.xp_earned]);

  const color = Constants.TYPE_COLORS[creature.details.race];

  return (
    <BaseContainer>
      <Container>
        <ExpandButten className={"button-hover"} onClick={HandleDeleteCreature}>
          <FontAwesomeIcon
            icon={faSkull}
            color={Constants.WIDGET_BACKGROUND}
            title={"Delete Creature"}
          />
        </ExpandButten>
        <NameContainer onClick={() => selectCreature()}>
          <CreatureName color={color}>{creature.name}</CreatureName>
          <AbilityDetail>
            {resistance} {creature.details.race}
          </AbilityDetail>
        </NameContainer>
        <AddCreatureToRoster
          character_template={creature}
          character={character}
          session={session}
          websocket={websocket}
        />
        <AddButton className={"button-hover"} onClick={AddEncounterCreature}>
          <FontAwesomeIcon icon={faPlus} />
        </AddButton>
      </Container>
    </BaseContainer>
  );
}

export default CreatureEntryItem;
