import * as Constants from "../Constants";
import { CreatureEntry } from "../Types";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AddCreatureToRoster from "./AddCreatureToRoster";
import { SessionContext } from "../contexts/SessionContext";
import {
  postSelectedCharacter,
  deleteRosterCharacter,
  addNewCharacter,
} from "../functions/CharacterFunctions";
import { size } from "lodash";
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

type BrowserProps = {
  browserState: number;
};

const CreatureName = styled.div<BrowserProps>`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${(props) =>
    props.browserState === 4 ? Constants.BRIGHT_RED : Constants.BLUE};
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
  creature: CharacterEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  encounter: CharacterEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  gmMode: boolean;
  browserState: number;
  setRosterList: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
}

function CreatureEntryItem({
  creature,
  browser,
  encounter,
  setEncounter,
  setCreatureEdit,
  gmMode,
  browserState,
  setRosterList,
}: AbilityEntryItemProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const { session } = useContext(SessionContext);
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
    const newEncounterCreature: CharacterEntry = {
      ...creature,
      name: suffixLetter(),
      damage: 0,
      id: uuidv4(), // This adds a new 'id' field to the creature object
    };
    setEncounter([...encounter, newEncounterCreature]);
  };

  const DeleteEncounterCreature = (_creature: CharacterEntry) => {
    console.log("Delete Creature");
  };

  const editCreature = () => {
    setCharacter(creature);
    setCreatureEdit(true);
  };

  const AddMemberToRoster = () => {
    console.log("Add Member");
    const characterClone = { ...character };
    if (characterClone.id === session.id) {
      characterClone.entourage = [...characterClone.entourage, creature.id];
      deleteRosterCharacter(creature.name, creature.id);
      creature.npc = false;
      addNewCharacter(creature);
      postSelectedCharacter(characterClone);
      setCharacter(characterClone);
    } else {
      console.log("Not the main character");
    }
  };

  const RemoveMemberFromRoster = () => {
    const characterClone = { ...character };
    deleteRosterCharacter(creature.name, creature.id);
    setCharacter(characterClone);
  };

  return (
    <BaseContainer>
      <Container>
        <ExpandButten className={"button-hover"} onClick={() => editCreature()}>
          <FontAwesomeIcon icon={faUser} />
        </ExpandButten>
        <NameContainer>
          <CreatureName browserState={browserState}>
            {creature.name}
          </CreatureName>
          <AbilityDetail>{creature.name}</AbilityDetail>
        </NameContainer>
        {browser ? (
          gmMode ? (
            browserState === 4 ? (
              <>
                <AddCreatureToRoster
                  character_template={creature}
                  setRosterList={setRosterList}
                />
                <AddButton
                  className={"button-hover"}
                  onClick={AddEncounterCreature}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </AddButton>
              </>
            ) : (
              <AddButton
                className={"button-hover"}
                onClick={RemoveMemberFromRoster}
              >
                <FontAwesomeIcon icon={faMinus} />
              </AddButton>
            )
          ) : (
            <AddButton className={"button-hover"} onClick={AddMemberToRoster}>
              <FontAwesomeIcon icon={faPlus} />
            </AddButton>
          )
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

export default CreatureEntryItem;
