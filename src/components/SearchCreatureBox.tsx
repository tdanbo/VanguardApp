import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import styled from "styled-components";
import { CharacterEntry } from "../Types";
import axios from "axios";
import { API } from "../Constants";
import { useContext } from "react";
import CreateCharacterComponent from "../components/SelectorPage/CreateCharacterComponent";
import BackgroundImage from "../assets/icons/background.jpeg";
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
  align-items: center;
  height: 50px;
`;

const Input = styled.input`
  flex-grow: 1;
  background-color: ${WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${WIDGET_BORDER};
  border-radius: ${BORDER_RADIUS};
  color: ${WIDGET_SECONDARY_FONT};
  font-weight: bold;
  text-align: center;
  height: 35px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 50px;
  max-width: 50px;
  height: 40px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${WIDGET_BORDER};
  background-color: ${WIDGET_BACKGROUND};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${WIDGET_SECONDARY_FONT};
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
  const [characterRace, setCharacterRace] = useState<string>("");
  const [characterName, setCharacterName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return isModalOpen === false ? (
    <Container hidden={browserState !== 4}>
      <Input
        className="flex-grow"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleOpen}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Container>
  ) : (
    <OverlayStyles>
      <CreateCharacterComponent
        setCharacterName={setCharacterName}
        setCharacterRace={setCharacterRace}
        characterName={characterName}
        characterRace={characterRace}
        closeModal={handleClose}
        source={""}
      />
    </OverlayStyles>
  );
};

export default SearchCreatureBox;
