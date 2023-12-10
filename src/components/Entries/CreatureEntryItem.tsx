import * as Constants from "../../Constants";
import { SessionEntry } from "../../Types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { CharacterEntry } from "../../Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddCreatureToRoster from "../AddCreatureToRoster";
import { useEffect } from "react";
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

const CreatureName = styled.div`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${Constants.BRIGHT_RED};
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

interface AbilityEntryItemProps {
  session: SessionEntry;
  character: CharacterEntry;
  creature: CharacterEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  encounter: CharacterEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  gmMode: boolean;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  websocket: WebSocket;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatureEntryItem({
  session,
  character,
  creature,
  encounter,
  setEncounter,
  setCharacterName,
  setIsCreature,
  websocket,
  setGmMode,
}: AbilityEntryItemProps) {
  const [_expanded] = useState<boolean>(false);

  const suffixLetter = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < alphabet.length; i++) {
      const candidateName = creature.name + " " + alphabet[i];
      const exists = encounter.some((enc) => enc.name === candidateName);
      if (!exists) {
        // If candidateName is unique, return it
        return candidateName;
      }
    }

    return creature.name + "Z"; // Fallback, should ideally handle this better
  };

  const AddEncounterCreature = () => {
    const newEncounterCreature: CharacterEntry = {
      ...creature,
      name: suffixLetter(),
      damage: 0,
      id: uuidv4(),
    };
    setEncounter([...encounter, newEncounterCreature]);
    setGmMode(true);
  };

  const selectCreature = () => {
    console.log("Select Creature");
    setIsCreature(true);
    setCharacterName(creature.name);
  };

  const [resistance, setResistance] = useState<string>("Weak");

  useEffect(() => {
    if (creature.details.xp_earned === 0) {
      setResistance("Weak");
    } else if (creature.details.xp_earned <= 50) {
      setResistance("Ordinary");
    } else if (creature.details.xp_earned <= 150) {
      setResistance("Challenging");
    } else if (creature.details.xp_earned <= 300) {
      setResistance("Strong");
    } else if (creature.details.xp_earned <= 600) {
      setResistance("Mighty");
    } else {
      setResistance("Legendary");
    }
  }, []);

  return (
    <BaseContainer>
      <Container>
        <ExpandButten
          className={"button-hover"}
          onClick={() => selectCreature()}
        >
          <FontAwesomeIcon icon={faUser} />
        </ExpandButten>
        <NameContainer>
          <CreatureName>{creature.name}</CreatureName>
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
