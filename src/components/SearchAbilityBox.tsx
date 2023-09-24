import { useState, useEffect, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Constants from "../Constants";
import styled from "styled-components";
import { AbilityEntry } from "../Types";
import axios from "axios";

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

interface SearchBarProps {
  itemList: AbilityEntry[];
  setList: (list: AbilityEntry[]) => void;
  browserState: number;
}

const SearchAbilityBox: FC<SearchBarProps> = ({
  itemList,
  setList,
  browserState,
}) => {
  const [search, setSearch] = useState("");
  const [fullList, setFullList] = useState<AbilityEntry[]>(itemList);

  const filterAbilities = (query: string) => {
    if (query === "") {
      return fullList;
    }
    return fullList.filter((ability) =>
      ability.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  useEffect(() => {
    setList(filterAbilities(search));
  }, [search, fullList]);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/abilities");
        setFullList(response.data);
      } catch (error) {}
    };
    fetchAbilities();
  }, []);

  return (
    <Container hidden={browserState === 0 || browserState === 1}>
      <Input
        className="flex-grow"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Container>
  );
};

export default SearchAbilityBox;
