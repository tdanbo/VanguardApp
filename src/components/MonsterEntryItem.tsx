import * as Constants from "../Constants";
import { CreatureEntry } from "../Types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

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

// const LevelSelection = styled.div<LevelProps>`
//   margin: 1px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 3px;
//   background-color: ${(props) =>
//     props.$active ? EntryColor(props.type) : Constants.WIDGET_BACKGROUND_EMPTY};
//   border: 1px solid #3d3d3c;
//   color: ${Constants.WIDGET_PRIMARY_FONT};
//   font-size: 12px;
//   width: 40px;
//   height: 20px;
//   cursor: pointer;
// `;

interface AbilityEntryItemProps {
  creature: CreatureEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  encounter: CreatureEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CreatureEntry[]>>;
}

function MonsterEntryItem({
  creature,
  browser,
  encounter,
  setEncounter,
}: AbilityEntryItemProps) {
  const [_expanded, setExpanded] = useState<boolean>(false);

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
    console.log("Add Creature");
    const newEncounterCreature: CreatureEntry = {
      ...creature,
      name: suffixLetter(),
      damage: 0,
      id: uuidv4(), // This adds a new 'id' field to the creature object
    };
    setEncounter([...encounter, newEncounterCreature]);
  };

  const DeleteEncounterCreature = (_creature: CreatureEntry) => {
    console.log("Delete Creature");
  };

  return (
    <BaseContainer>
      <Container>
        <ExpandButten
          className={"button-hover"}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          {/* {expanded ? "-" : "+"} */}
        </ExpandButten>
        <NameContainer>
          <CreatureName>{creature.name}</CreatureName>
          <AbilityDetail>
            {creature.resistance} {creature.race}
          </AbilityDetail>
        </NameContainer>
        {browser ? (
          <AddButton className={"button-hover"} onClick={AddEncounterCreature}>
            +
          </AddButton>
        ) : (
          <AddButton
            className={"button-hover"}
            onClick={() => DeleteEncounterCreature(creature)}
          >
            x
          </AddButton>
        )}
      </Container>
    </BaseContainer>
  );
}

export default MonsterEntryItem;