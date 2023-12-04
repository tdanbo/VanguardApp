import * as Constants from "../Constants";
import { RosterEntry } from "../Types";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AddCreatureToRoster from "./AddCreatureToRoster";
import { SessionContext } from "../contexts/SessionContext";
import { useEffect } from "react";
import {
  postSelectedCharacter,
  deleteRosterCharacter,
  addNewCharacter,
} from "../functions/CharacterFunctions";
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
  browserstate: number;
};

const CreatureName = styled.div<BrowserProps>`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${(props) =>
    props.browserstate === 4 ? Constants.BRIGHT_RED : Constants.BLUE};
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
  creature: CharacterEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  encounter: CharacterEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  gmMode: boolean;
  browserState: number;
}

function CreatureEntryItem({
  creature,
  browser,
  encounter,
  setEncounter,
  setCreatureEdit,
  gmMode,
  browserState,
}: AbilityEntryItemProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const { session } = useContext(SessionContext);
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
    console.log("Add Creature");
    const newEncounterCreature: CharacterEntry = {
      ...creature,
      name: suffixLetter(),
      damage: 0,
      id: uuidv4(),
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

  const AddMemberToRoster = () => {
    console.log("Add Member");
    const characterClone = { ...character };
    if (characterClone.id === session.id) {
      const new_roster_entry: RosterEntry = {
        name: creature.name,
        id: session.id,
        resistance: resistance,
      };
      characterClone.entourage = [
        ...characterClone.entourage,
        new_roster_entry,
      ];
      deleteRosterCharacter(creature.name, creature.id);
      creature.id = session.id;
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
          <CreatureName browserstate={browserState}>
            {creature.name}
          </CreatureName>
          <AbilityDetail>
            {resistance} {creature.details.race}
          </AbilityDetail>
        </NameContainer>
        {browser ? (
          gmMode ? (
            browserState === 4 ? (
              <>
                <AddCreatureToRoster character_template={creature} />
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
