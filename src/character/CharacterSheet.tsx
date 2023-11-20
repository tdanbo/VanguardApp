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
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { CharacterEntry } from "../Types";
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
  margin-left: 90px;
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
};

function CharacterSheet({
  browserState,
  setBrowserState,
  gmMode,
  inventoryState,
  setInventoryState,
  setGmMode,
  setCreatureEdit,
}: CharacterSheetProps) {
  console.log("Current gmMode:");
  console.log(gmMode);

  const HandleLeaveEdit = () => {
    setCreatureEdit(false);
  };

  const [mainCharacter, setMainCharacter] = useState<CharacterEntry>();
  const { character, setCharacter } = useContext(CharacterContext);

  const selectMainChar = () => {
    if (!mainCharacter) return;
    setCharacter(mainCharacter);
  };

  useEffect(() => {
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
        />
        <ScrollContainer>
          <InventorySection inventoryState={inventoryState} />
          <AbilitySection inventoryState={inventoryState} />
        </ScrollContainer>
      </InventoryContainer>
      <FooterCenterContainer>
        {gmMode ? (
          <>
            <Button onClick={HandleLeaveEdit}>Leave Creature Edit</Button>
            <Button>Delete Creature</Button>
          </>
        ) : character.npc === false ? (
          <>
            <RestBox />
            <ResourcesBox />
          </>
        ) : (
          <>
            <Button title={"Back Main Character"} onClick={selectMainChar}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <Button title={"Kick Member"}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </>
        )}
      </FooterCenterContainer>
    </>
  );
}

export default CharacterSheet;
