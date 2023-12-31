import styled from "styled-components";

import axios from "axios";
import { Socket } from "socket.io-client";
import { API } from "../Constants";
import BackgroundImage from "../assets/icons/background.jpeg";
import CreateCharacterComponent from "../components/SelectorPage/CreateCharacterComponent";
import AbilityFooter from "./AbilityFooter";
import CreatureFooter from "./CreatureFooter";
import EquipmentFooter from "./EquipmentFooter";
import { GeneralItem } from "../Types";
import InventoryEntryEmpty from "../components/InventoryEntryEmpty";
import {
  faBolt,
  faChevronDown,
  faChevronUp,
  faGhost,
  faPlus,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import * as Constants from "../Constants";
import {
  AbilityEntry,
  CharacterEntry,
  CreatureEntry,
  ItemEntry,
  SessionEntry,
} from "../Types";

import { useState } from "react";
import AbilityEntryItem from "../components/Entries/AbilityEntryItem";
import CreatureEntryItem from "../components/Entries/CreatureEntryItem";
import InventoryEntry from "../components/Entries/InventoryEntry";
import { toTitleCase } from "../functions/UtilityFunctions";

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
  justify-content: flex-end;
`;

interface DivProps {
  width: string;
}

const ExpandRow = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
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

const Input = styled.input`
  display: flex;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
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
  max-width: 40px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isactive === "true" ? 1 : 0.5)};
`;

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(7, 9, 11, 0.95), rgba(7, 9, 11, 0.95)),
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

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

interface BrowserSectionProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
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
  isConnected: boolean;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
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
  setCreaturesList,
  isCreature,
  setGmMode,
  categorySelect,
  setCategorySelect,
}: BrowserSectionProps) {
  const [entryList, setEntryList] = useState<
    (ItemEntry | AbilityEntry | CreatureEntry | CharacterEntry)[]
  >([]);
  const [addAdjust, setAddAdjust] = useState(0);
  const [deleteAdjust, setDeleteAdjust] = useState(0);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const generateRandomId = (length = 10) => {
    return Math.random()
      .toString(36)
      .substring(2, 2 + length);
  };

  const SearchItem = GeneralItem;
  SearchItem.name = toTitleCase(search);
  SearchItem.id = generateRandomId();

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const equipmentResponse = await axios.get(`${API}/api/equipment`);
        setEquipmentList(equipmentResponse.data);

        const abilitiesResponse = await axios.get(`${API}/api/abilities`);
        setAbilitiesList(abilitiesResponse.data);
      } catch (error) {
        console.error("Error fetching static data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaticData();
  }, []);

  useEffect(() => {
    const fetchCreatureData = async () => {
      try {
        const creaturesResponse = await axios.get(`${API}/api/creatures`);
        setCreaturesList(creaturesResponse.data);
        if (categorySelect === "creatures") {
          setEntryList(creaturesResponse.data);
        }
        console.log("Fetching creature data");
      } catch (error) {
        console.error("Error fetching creature data:", error);
      }
    };

    if (categorySelect === "creatures") {
      fetchCreatureData();
    }
  }, [categorySelect, deleteAdjust, addAdjust]);

  useEffect(() => {
    if (!isLoading) {
      switch (categorySelect) {
        case "equipment":
          setEntryList(equipmentList);
          break;
        case "abilities":
          setEntryList(abilitiesList);
          break;
        case "characters":
          setEntryList(session.characters);
          break;
        // ... rest of the code
      }
    }
  }, [categorySelect, session, isLoading]);

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

  const [HideBrowser, setHideBrowser] = useState<boolean>(false);

  return (
    <>
      <Container height={"40px"}>
        <ExpandRow width={"100%"}>
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
                  setAddAdjust={setAddAdjust}
                />
              </OverlayStyles>
            ) : (
              <Button $isactive={"false"} onClick={handleOpen}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )
          ) : (
            <Button
              $isactive={"false"}
              onClick={() => setHideBrowser(!HideBrowser)}
            >
              <FontAwesomeIcon
                icon={HideBrowser ? faChevronDown : faChevronUp}
              />
            </Button>
          )}
          {HideBrowser ? (
            <>
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
            </>
          ) : null}
        </ExpandRow>
      </Container>
      {HideBrowser ? (
        <>
          <DynamicContainer>
            <ScrollColumn width="100%">
              {sortedItemList.length === 0 ? (
                categorySelect === "equipment" ? (
                  <InventoryEntry
                    session={session}
                    character={character}
                    websocket={websocket}
                    key={"EmptyItem"}
                    browser={true}
                    index={1}
                    item={SearchItem}
                    equipped={""}
                    id={""}
                    setInventoryState={setInventoryState}
                    gmMode={gmMode}
                    isCreature={isCreature}
                  />
                ) : null
              ) : null}

              {sortedItemList &&
                sortedItemList.map((entry, index) => {
                  if (entry.entry === "ItemEntry") {
                    return (
                      <InventoryEntry
                        session={session}
                        character={character}
                        websocket={websocket}
                        key={`InventoryEntry${index}`}
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
                        setDeleteAdjust={setDeleteAdjust}
                      />
                    );
                  }
                  {
                    return null; // Add a default case if needed
                  }
                })}
              {Array.from({ length: 20 }).map((_, index) => {
                return <InventoryEntryEmpty key={index} />;
              })}
            </ScrollColumn>
          </DynamicContainer>
          <Container height={"30px"}>
            {categorySelect === "equipment" ? (
              <EquipmentFooter setTypeFilter={setFilterType} />
            ) : categorySelect === "abilities" ? (
              <AbilityFooter setTypeFilter={setFilterType} />
            ) : categorySelect == "creatures" ? (
              <CreatureFooter setTypeFilter={setFilterType} />
            ) : null}
          </Container>
        </>
      ) : null}
    </>
  );
}

export default BrowserSection;
