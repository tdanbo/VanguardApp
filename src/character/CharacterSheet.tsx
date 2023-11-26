import InventorySection from "../components/Sections/InventorySection";
import HealthBox from "../components/HealthBox";
import StatsControls from "../components/StatsControls/StatsControls";
import InventoryNavigation from "../components/NavigationControl/InventoryNavigation";
import ActiveControls from "../components/ActiveControls";
import EmptyNavigation from "../components/NavigationControl/EmptyNavigation";
import ResourcesBox from "../components/ResourcesBox";
import AbilitySection from "../components/Sections/AbilitySection";
import SecondaryStatsControls from "../components/StatsControls/SecondaryStatsControls";
import RestBox from "../components/RestBox";
import CharacterNavigation from "../components/NavigationControl/CharacterNavigation";
import styled from "styled-components";
import XpBox from "../components/XpBox";
import CharacterNameBox from "../components/CharacterNameBox";
import * as Constants from "../Constants";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { CharacterEntry } from "../Types";
import { deleteSessionCharacter } from "../functions/SessionsFunctions";
import { deleteCreature } from "../functions/CharacterFunctions";
import {
  postSelectedCharacter,
  addNewRoster,
} from "../functions/CharacterFunctions";
const StatsContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`;

const HealthContainer = styled.div`
  display: flex;
  margin: 20px;
  gap: 20px;
`;

const InventoryContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin: 20px;
  gap: 20px;

  overflow: scroll;
  scrollbar-width: none !important;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: scroll;
  scrollbar-width: none !important;
`;

const FooterCenterContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 90px;
  margin-top: 5px;
  gap: 20px;
  height: 50px;
`;

const Button = styled.button`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  justify-content: center;
  align-items: center;
  font-size: 15px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  height: 35px;
`;

type CharacterSheetProps = {
  browserState: number;
  setBrowserState: (value: number) => void;
  gmMode: boolean;
  inventoryState: number;
  setInventoryState: (value: number) => void;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
  mainCharacter: CharacterEntry | undefined;
  setMainCharacter: React.Dispatch<
    React.SetStateAction<CharacterEntry | undefined>
  >;
};

function CharacterSheet({
  browserState,
  setBrowserState,
  gmMode,
  inventoryState,
  setInventoryState,
  setCreatureEdit,
  mainCharacter,
  setMainCharacter,
}: CharacterSheetProps) {
  console.log("Current gmMode:");
  console.log(gmMode);

  const HandleDeleteMember = () => {
    console.log("Delete Member");
    // Making sure we don't delete the main character
    if (!mainCharacter) return;
    if (character.name !== mainCharacter.name)
      deleteSessionCharacter(character.name, character.id);
    addNewRoster(character);
    DeleteMemberFromEntourage();
  };

  const HandleDeleteCreature = () => {
    console.log("Delete Creature");
    if (!mainCharacter) return;
    if (!gmMode) return;
    deleteCreature(character.name);
    setCharacter(mainCharacter);
    setCreatureEdit(false);
  };

  const DeleteMemberFromEntourage = () => {
    if (!mainCharacter) return;
    mainCharacter.entourage = mainCharacter.entourage.filter(
      (rostermember) => rostermember.name !== character.name,
    );
    postSelectedCharacter(mainCharacter);
    setCharacter(mainCharacter);
  };

  const { character, setCharacter } = useContext(CharacterContext);

  useEffect(() => {
    if (!character) return;
    if (character.npc === false) {
      setMainCharacter(character);
    }
  }, [character]);

  return (
    <>
      <HeaderContainer>
        <CharacterNameBox />
        <XpBox />
      </HeaderContainer>
      <StatsContainer key="container">
        <CharacterNavigation
          browserState={browserState}
          setBrowserState={setBrowserState}
          gmMode={gmMode}
        />
        <HealthBox />
        <StatsControls />
      </StatsContainer>
      <HealthContainer>
        <EmptyNavigation />
        <ActiveControls />
        <SecondaryStatsControls />
      </HealthContainer>
      <InventoryContainer>
        <InventoryNavigation
          inventoryState={inventoryState}
          setInventoryState={setInventoryState}
          mainCharacter={mainCharacter}
          setCreatureEdit={setCreatureEdit}
          gmMode={gmMode}
        />
        <ScrollContainer>
          <InventorySection inventoryState={inventoryState} />
          <AbilitySection inventoryState={inventoryState} />
        </ScrollContainer>
      </InventoryContainer>
      <FooterCenterContainer>
        {gmMode ? (
          <>
            <EmptyNavigation />
            <Button title={"Delete Creature"} onClick={HandleDeleteCreature}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </>
        ) : character.npc === false ? (
          <>
            <RestBox />
            <ResourcesBox />
          </>
        ) : (
          <>
            <EmptyNavigation />
            <Button title={"Kick Member"} onClick={HandleDeleteMember}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </>
        )}
      </FooterCenterContainer>
    </>
  );
}

export default CharacterSheet;
