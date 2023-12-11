import styled from "styled-components";

import AbilityFooter from "./AbilityFooter";
import EquipmentFooter from "./EquipmentFooter";
import CreatureFooter from "./CreatureFooter";

import axios from "axios";
import { API } from "../Constants";

import CreateCharacterComponent from "../components/SelectorPage/CreateCharacterComponent";
import BackgroundImage from "../assets/icons/background.jpeg";

import * as Constants from "../Constants";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShield,
  faBolt,
  faGhost,
  faUsers,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  AbilityEntry,
  CharacterEntry,
  CreatureEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";

import { useState } from "react";
import InventoryEntry from "../components/Entries/InventoryEntry";
import CreatureEntryItem from "../components/Entries/CreatureEntryItem";
import AbilityEntryItem from "../components/Entries/AbilityEntryItem";
import CharacterBox from "../components/Entries/CharacterBox";

const CombatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  gap: 20px;
  height: 100%;
  overflow: scroll;
  scrollbar-width: none !important;
  border-radius: ${Constants.BORDER_RADIUS};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 50px;
  margin-left: 20px;
  margin-top: 5px;
  gap: 20px;
`;

const FooterLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end; // Align children to the right
  min-height: 50px;
  margin-left: 20px;
  margin-bottom: 5px;
  gap: 20px;
`;

// const Container = styled.div`
//   display: ${(props) => (props.hidden ? "none" : "flex")};
//   flex-direction: col;
//   flex-grow: 1;
//   gap: 10px;
//   align-items: center;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: col;
  flex-grow: 1;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
  height: 35px;
`;

interface ButtonProps {
  $isactive: string;
}

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${(props) =>
    props.$isactive === "true"
      ? Constants.WIDGET_SECONDARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 16px;
  width: 50px;
  max-width: 50px;
  height: 40px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isactive === "true" ? 1 : 0.5)};
`;

const AddButton = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  max-height: 35px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.75), rgba(7, 9, 11, 0.75)),
    url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface BrowserSectionProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: WebSocket;
  setInventoryState: (state: number) => void;
  gmMode: boolean;
  encounter: CharacterEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  isGm: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  creaturesList: CharacterEntry[];
  setCreaturesList: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  isCreature: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

let creatureList: CharacterEntry[] = [];
export const exportCreatureList = creatureList;

function BrowserSection({
  character,
  session,
  websocket,
  setInventoryState,
  gmMode,
  encounter,
  setEncounter,
  setCharacterName,
  isGm,
  setIsCreature,
  creaturesList,
  setCreaturesList,
  isCreature,
  setGmMode,
}: BrowserSectionProps) {
  const [entryList, setEntryList] = useState<
    (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[]
  >([]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [categorySelect, setCategorySelect] = useState<string>();

  function filterItemsByType(
    entryList: (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[],
    type: string,
    search: string,
    filterType: string | null = "all",
  ): (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[] {
    return entryList
      .filter((entry) => {
        if (entry.entry === "ItemEntry" && type === "ItemEntry") {
          const nameMatch = entry.name
            .toLowerCase()
            .includes(search.toLowerCase());
          const typeMatch = entry.type
            .toLowerCase()
            .includes(search.toLowerCase());
          return nameMatch || typeMatch;
        } else if (entry.entry === "AbilityEntry" && type === "AbilityEntry") {
          const nameMatch = entry.name
            .toLowerCase()
            .includes(search.toLowerCase());
          const descriptionMatch = entry.description
            .toLowerCase()
            .includes(search.toLowerCase());
          const traditionMatch = entry.tradition
            .toLowerCase()
            .includes(search.toLowerCase());
          return nameMatch || descriptionMatch || traditionMatch;
        } else if (
          entry.entry === "CharacterEntry" &&
          type === "CharacterEntry"
        ) {
          const nameMatch = entry.name
            .toLowerCase()
            .includes(search.toLowerCase());
          const raceMatch = entry.details.race
            .toLowerCase()
            .includes(search.toLowerCase());
          return nameMatch || raceMatch;
        }
        // For other entry types or when type doesn't match, keep the entry
        return true;
      })
      .filter((entry) => {
        // Apply the filterType condition based on the entry type
        if (entry.entry === "ItemEntry" && filterType !== "all") {
          return entry.category === filterType;
        } else if (entry.entry === "AbilityEntry" && filterType !== "all") {
          return entry.type === filterType;
        } else if (entry.entry === "CharacterEntry" && filterType !== "all") {
          // You can handle CharacterEntry-specific conditions here if needed
          return true;
        }
        // For other entry types or when filterType doesn't match, keep the entry
        return true;
      });
  }

  function sortItems(
    a: ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry,
    b: ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry,
  ): number {
    if (a.entry === "ItemEntry" && b.entry === "ItemEntry") {
      const categoryComparison =
        Constants.CATEGORY_FILTER.indexOf(a.category) -
        Constants.CATEGORY_FILTER.indexOf(b.category);

      return categoryComparison;
    } else if (a.entry === "AbilityEntry" && b.entry === "AbilityEntry") {
      const categoryComparison =
        Constants.TYPE_FILTER.indexOf(a.type) -
        Constants.TYPE_FILTER.indexOf(b.type);
      return categoryComparison;
    } else if (a.entry === "CharacterEntry" && b.entry === "CharacterEntry") {
      const categoryComparison =
        Constants.RACE_FILTER.indexOf(a.details.race) -
        Constants.RACE_FILTER.indexOf(b.details.race);

      return categoryComparison;
    }
    // Return a default value in case none of the conditions match.
    return 0;
  }

  function filterAndSortItems(
    entryList: (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[],
    type: string,
    search: string,
  ): (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[] {
    const filteredItems = filterItemsByType(
      entryList,
      type,
      search,
      filterType,
    );
    return [...filteredItems].sort(sortItems);
  }

  let sortedItemList: (
    | ItemEntry
    | AbilityEntry
    | CreatureEntry
    | CharacterEntry
  )[] = [];

  if (categorySelect === "equipment") {
    sortedItemList = filterAndSortItems(
      entryList,
      "ItemEntry",
      search,
    ) as ItemEntry[];
  } else if (categorySelect === "abilities") {
    sortedItemList = filterAndSortItems(
      entryList,
      "AbilityEntry",
      search,
    ) as AbilityEntry[];
  } else if (
    categorySelect === "creatures" ||
    categorySelect === "characters"
  ) {
    sortedItemList = filterAndSortItems(
      entryList,
      "CharacterEntry",
      search,
    ) as CharacterEntry[];
  }

  const [equipmentList, setEquipmentList] = useState<ItemEntry[]>([]);
  const [abilitiesList, setAbilitiesList] = useState<AbilityEntry[]>([]);
  const [_charactersList, setCharactersList] = useState<CharacterEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await axios.get(`${API}/api/equipment`);
        setEquipmentList(equipmentResponse.data);

        const abilitiesResponse = await axios.get(`${API}/api/abilities`);
        setAbilitiesList(abilitiesResponse.data);

        const creaturesResponse = await axios.get(`${API}/api/creatures`);
        creatureList = creaturesResponse.data;
        setCreaturesList(creaturesResponse.data);
      } catch (error) {
        // Handle any errors that occur during data fetching
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    setCharactersList(session.characters);
  }, [session]);

  useEffect(() => {
    // Update entryList when categorySelect changes
    if (categorySelect === "equipment") {
      setEntryList(equipmentList);
    } else if (categorySelect === "abilities") {
      setEntryList(abilitiesList);
    } else if (categorySelect === "creatures") {
      setEntryList(creaturesList);
    } else if (categorySelect === "characters") {
      setEntryList(session.characters);
    }
  }, [session, categorySelect]);

  const HandleCategoryChange = (category: string) => {
    setCategorySelect(category);
    setFilterType("all");
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <HeaderContainer>
        <Container>
          {categorySelect === "creatures" ? (
            isModalOpen ? (
              <OverlayStyles>
                <CreateCharacterComponent
                  setCharacterName={setCharacterName}
                  characterName={""}
                  characterRace={"Ambrian"}
                  closeModal={handleClose}
                  session={session}
                  websocket={websocket}
                  source={""}
                  isCreature={false}
                />
              </OverlayStyles>
            ) : (
              <Button $isactive={"false"} onClick={handleOpen}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )
          ) : (
            <Button $isactive={"false"}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          )}
          <Input
            className="flex-grow"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            $isactive={(categorySelect === "abilities").toString()}
            onClick={() => HandleCategoryChange("abilities")}
          >
            <FontAwesomeIcon icon={faBolt} />
          </Button>
          <Button
            $isactive={(categorySelect === "equipment").toString()}
            onClick={() => HandleCategoryChange("equipment")}
          >
            <FontAwesomeIcon icon={faShield} />
          </Button>
          {isGm ? (
            <Button
              $isactive={(categorySelect === "creatures").toString()}
              onClick={() => HandleCategoryChange("creatures")}
            >
              <FontAwesomeIcon icon={faGhost} />
            </Button>
          ) : null}
          <Button
            $isactive={(categorySelect === "characters").toString()}
            onClick={() => HandleCategoryChange("characters")}
          >
            <FontAwesomeIcon icon={faUsers} />
          </Button>
        </Container>
      </HeaderContainer>
      <CombatContainer>
        <ItemContainer>
          {sortedItemList &&
            sortedItemList.map((entry, index) => {
              if (entry.entry === "ItemEntry") {
                return (
                  <InventoryEntry
                    session={session}
                    character={character}
                    websocket={websocket}
                    key={index}
                    browser={true}
                    index={index}
                    item={entry}
                    equipped={""}
                    id={""}
                    setInventoryState={setInventoryState}
                    gmMode={gmMode}
                    isCreature={isCreature}
                  />
                );
              } else if (entry.entry === "AbilityEntry") {
                return (
                  <AbilityEntryItem
                    key={index}
                    ability={entry}
                    browser={true}
                    setInventoryState={setInventoryState}
                    character={character}
                    session={session}
                    websocket={websocket}
                    isCreature={isCreature}
                  />
                );
              } else if (
                entry.entry === "CharacterEntry" &&
                categorySelect === "creatures"
              ) {
                return (
                  <CreatureEntryItem
                    key={index}
                    session={session}
                    character={character}
                    creature={entry}
                    browser={true}
                    encounter={encounter}
                    setEncounter={setEncounter}
                    gmMode={gmMode}
                    setCharacterName={setCharacterName}
                    setIsCreature={setIsCreature}
                    websocket={websocket}
                    setGmMode={setGmMode}
                  />
                );
              } else if (
                entry.entry === "CharacterEntry" &&
                categorySelect === "characters"
              ) {
                return (
                  <CharacterBox
                    key={index}
                    character={entry}
                    setCharacterName={setCharacterName}
                    session={session}
                    websocket={websocket}
                    setIsCreature={setIsCreature}
                    isCreature={isCreature}
                  />
                );
              }
              return null; // Add a default case if needed
            })}
          {categorySelect === "characters" &&
            (isModalOpen ? (
              <OverlayStyles>
                <CreateCharacterComponent
                  setCharacterName={setCharacterName}
                  characterName={""}
                  characterRace={"Ambrian"}
                  closeModal={handleClose}
                  session={session}
                  websocket={websocket}
                  source={"characterSelect"}
                  isCreature={isCreature}
                />
              </OverlayStyles>
            ) : (
              <AddButton onClick={handleOpen}>
                <FontAwesomeIcon icon={faPlus} />
              </AddButton>
            ))}
        </ItemContainer>
      </CombatContainer>
      <FooterLeftContainer>
        {categorySelect === "equipment" ? (
          <EquipmentFooter setTypeFilter={setFilterType} />
        ) : categorySelect === "abilities" ? (
          <AbilityFooter setTypeFilter={setFilterType} />
        ) : categorySelect == "creatures" ? (
          <CreatureFooter setTypeFilter={setFilterType} />
        ) : null}
      </FooterLeftContainer>
    </>
  );
}

export default BrowserSection;
