import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import styled from "styled-components";
import { CreatureEntry } from "../Types";
import axios from "axios";
import { API } from "../Constants";
import { toTitleCase } from "../functions/UtilityFunctions";

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
  creatureList: CreatureEntry[];
  setList: (list: CreatureEntry[]) => void;
  browserState: number;
}

const SearchItemBox: FC<SearchItemBoxProps> = ({
  creatureList,
  setList,
  browserState,
}) => {
  const [fullList, setFullList] = useState<CreatureEntry[]>(creatureList);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const generalCreature: CreatureEntry[] = [
    {
      name: toTitleCase(search),
      race: "Human",
      resistance: "Weak",
      stats: {
        cunning: 0,
        discreet: 0,
        persuasive: 0,
        quick: 0,
        resolute: 0,
        strong: 0,
        vigilant: 0,
        accurate: 0,
      },
      armor: {},
      damage: {},
      abilities: {},
      loot: "",
    },
  ];

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
        const response = await axios.get(`${API}/api/creatures`);
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
      setList(generalCreature as CreatureEntry[]);
    } else {
      setList(filterItems(search));
    }
  }, [search, fullList]);

  if (loading) {
    return <p>Loading...</p>; // Or replace with a loading spinner
  }

  return (
    <Container hidden={browserState !== 3}>
      <Input
        className="flex-grow"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button>
        {creatureList.length > 0 ? (
          <FontAwesomeIcon icon={faSearch} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </Button>
    </Container>
  );
};

export default SearchItemBox;
