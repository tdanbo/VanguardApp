import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import styled from "styled-components";
import { ItemEntry } from "../Types";
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

interface SearchItemBoxProps {
  itemList: ItemEntry[];
  setList: (list: ItemEntry[]) => void;
  browserState: number;
}

const SearchItemBox: FC<SearchItemBoxProps> = ({
  itemList,
  setList,
  browserState,
}) => {
  const [fullList, setFullList] = useState<ItemEntry[]>(itemList);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const generalItem: ItemEntry[] = [
    {
      roll: {
        roll: false,
        dice: 0,
        type: "",
        mod: 0,
      },
      quality: [],
      equip: "",
      quantity: {
        count: 0,
        bulk: false,
      },
      type: "General Good",
      cost: 0,
      name: toTitleCase(search),
      category: "general_good",
      id: "",
      description: "",
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
        const response = await axios.get(`${API}/api/equipment`);
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
      setList(generalItem as ItemEntry[]);
    } else {
      setList(filterItems(search));
    }
  }, [search, fullList]);

  if (loading) {
    return <p>Loading...</p>; // Or replace with a loading spinner
  }

  return (
    <Container hidden={browserState !== 1}>
      <Input
        className="flex-grow"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button>
        {itemList.length > 0 ? (
          <FontAwesomeIcon icon={faSearch} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </Button>
    </Container>
  );
};

export default SearchItemBox;
