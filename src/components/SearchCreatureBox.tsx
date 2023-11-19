import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import styled from "styled-components";
import { CharacterEntry, CreatureEntry } from "../Types";
import axios from "axios";
import { API } from "../Constants";
import { toTitleCase } from "../functions/UtilityFunctions";
import CreateCharacterComponent from "../components/SelectorPage/CreateCharacterComponent";
const {
  WIDGET_BACKGROUND_EMPTY,
  WIDGET_BORDER,
  BORDER_RADIUS,
  WIDGET_SECONDARY_FONT,
  WIDGET_BACKGROUND,
} = Constants;

const Container = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: row;
  flex-grow: 1;
  gap: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  background-color: ${WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${WIDGET_BORDER};
  border-radius: ${BORDER_RADIUS};
  color: ${WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 50px;
  max-width: 50px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${WIDGET_BORDER};
  background-color: ${WIDGET_BACKGROUND};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${WIDGET_SECONDARY_FONT};
`;

interface SearchItemBoxProps {
  creatureList: CharacterEntry[];
  setList: (list: CharacterEntry[]) => void;
  browserState: number;
}

const SearchCreatureBox: FC<SearchItemBoxProps> = ({
  creatureList,
  setList,
  browserState,
}) => {
  const [fullList, setFullList] = useState<CharacterEntry[]>(creatureList);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filterItems = (query: string) => {
    if (query === "") {
      return fullList;
    }
    return fullList.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API}/api/creaturesv2`);
        setFullList(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (filterItems(search).length === 0) {
      setList([] as CharacterEntry[]);
    } else {
      setList(filterItems(search));
    }
  }, [search, fullList]);

  if (loading) {
    return <p>Loading...</p>; // Or replace with a loading spinner
  }

  const createCreature = () => {
    console.log("Creating creature");
  };

  const [characterPortrait, setCharacterPortrait] = useState<string>("");
  const [characterRace, setCharacterRace] = useState<string>("");
  const [characterName, setCharacterName] = useState<string>("");
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container hidden={browserState !== 4}>
      <Input
        className="flex-grow"
        onChange={(e) => setSearch(e.target.value)}
      />
      {isModalOpen === false && creatureList.length > 0 ? (
        <Button>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      ) : (
        <Button onClick={handleOpen}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      )}
      <CreateCharacterComponent
        setCharacterLog={setCharacterLog}
        characterPortrait={characterPortrait}
        setCharacterName={setCharacterName}
        setCharacterRace={setCharacterRace}
        characterName={characterName}
        characterRace={characterRace}
        closeModal={handleClose}
        source={""}
      />
    </Container>
  );
};

export default SearchCreatureBox;
