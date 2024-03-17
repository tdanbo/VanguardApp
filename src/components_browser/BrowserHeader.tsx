import styled from "styled-components";
import { CharacterEntry, NewCharacterEntry } from "../Types";
import { v4 as uuidv4 } from "uuid";
import { FindCharacter, addNewCreature } from "../functions/CharacterFunctions";

import {
  faBolt,
  faChevronDown,
  faChevronUp,
  faGhost,
  faPlus,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";

import { LootIcon } from "../Images";

import { Socket } from "socket.io-client";
import { SessionEntry } from "../Types";

import { useState } from "react";
import { cloneDeep } from "lodash";

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

const LootButton = styled.button<ButtonProps>`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${(props) =>
    props.$isactive === "true" ? "white" : Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  font-size: 16px;
  max-width: 40px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.$isactive === "true" ? 1 : 0.5)};
  background-image: url(${LootIcon});
  background-size: 25px;
  background-position: top 4px center;
  background-repeat: no-repeat;
  font-weight: bold;
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

interface BrowserHeaderProps {
  session: SessionEntry;
  websocket: Socket;
  isGm: boolean;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  HideBrowser: boolean;
  setHideBrowser: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<number>>;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterEntry>>;
}

function BrowserHeader({
  session,
  isGm,
  categorySelect,
  setCategorySelect,
  setSearch,
  HideBrowser,
  setHideBrowser,
  setRefetch,
  setCharacter,
}: BrowserHeaderProps) {
  const [_filterType, setFilterType] = useState("all");
  const [tempSearch, setTempSearch] = useState("");
  const handlePostCreature = async () => {
    const NewCreature = cloneDeep(NewCharacterEntry);
    NewCreature.id = uuidv4();
    NewCreature.name = "Creature Character";
    await addNewCreature(NewCreature);
    setRefetch((prev) => prev + 1);
    setCharacter(FindCharacter(NewCreature.id, session, true));
  };

  const HandleCategoryChange = (category: string) => {
    setCategorySelect(category);
    setFilterType("all");
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  // Handle changes to the input field
  const handleChange = (e: any) => {
    setTempSearch(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSetSearch(tempSearch);
    }
  };

  return (
    <Container height={"40px"}>
      <ExpandRow width={"100%"}>
        {categorySelect === "creatures" ? (
          <Button $isactive={"false"} onClick={handlePostCreature}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        ) : (
          <Button
            $isactive={"false"}
            onClick={() => setHideBrowser(!HideBrowser)}
          >
            <FontAwesomeIcon icon={HideBrowser ? faChevronDown : faChevronUp} />
          </Button>
        )}
        {HideBrowser ? (
          <>
            <Input
              className="flex-grow"
              value={tempSearch} // Use the temporary search state as the input value
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              title="Hit Enter to search"
            />
            {session.loot.drops.length > 0 || isGm ? (
              <LootButton
                $isactive={(categorySelect === "drops").toString()}
                onClick={() => HandleCategoryChange("drops")}
              >
                {session.loot.drops.length}
              </LootButton>
            ) : null}
            <Button
              $isactive={(categorySelect === "abilities").toString()}
              onClick={() => HandleCategoryChange("abilities")}
            >
              <FontAwesomeIcon icon={faBolt} />
            </Button>

            {isGm ? (
              <>
                <Button
                  $isactive={(categorySelect === "equipment").toString()}
                  onClick={() => HandleCategoryChange("equipment")}
                >
                  <FontAwesomeIcon icon={faShield} />
                </Button>
                <Button
                  $isactive={(categorySelect === "creatures").toString()}
                  onClick={() => HandleCategoryChange("creatures")}
                >
                  <FontAwesomeIcon icon={faGhost} />
                </Button>
              </>
            ) : null}
          </>
        ) : null}
      </ExpandRow>
    </Container>
  );
}

export default BrowserHeader;
