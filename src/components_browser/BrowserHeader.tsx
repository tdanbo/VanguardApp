import styled from "styled-components";
import { NewCharacterEntry } from "../Types";
import { v4 as uuidv4 } from "uuid";
import { addNewCreature } from "../functions/CharacterFunctions";
import Icon from "@mdi/react";
import { mdiSack } from "@mdi/js";
import {
  faBolt,
  faGhost,
  faHatWizard,
  faPlus,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";
import { SessionEntry } from "../Types";
import { useState } from "react";
import { cloneDeep } from "lodash";
import { GetGameData } from "../contexts/GameContent";
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

const Navigator = styled.button`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  width: 40px;
  max-width: 40px;
  height: 40px;
`;

interface BrowserHeaderProps {
  session: SessionEntry;
  isGm: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
}

function BrowserHeader({
  categorySelect,
  setCategorySelect,
  setSearch,
  setCharacterId,
  setIsGm,
  isGm,
  session,
}: BrowserHeaderProps) {
  const { updateCreatureData } = GetGameData();
  const [tempSearch, setTempSearch] = useState("");
  const handlePostCreature = async () => {
    const NewCreature = cloneDeep(NewCharacterEntry);
    NewCreature.id = uuidv4();
    NewCreature.name = "Creature Character";
    await addNewCreature(NewCreature);
    await updateCreatureData();
    // setRefetch((prev) => prev + 1);
    setCharacterId(NewCreature.id);
  };

  const HandleCategoryChange = (category: string) => {
    setCategorySelect(category);
  };

  const handleSetSearch = (value: string) => {
    setSearch(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSetSearch(tempSearch);
    }
  };

  // const HandleLeaveSession = () => {
  //   setSession(EmptySession);
  //   setCharacterName("");
  //   setIsJoined(false);
  // };

  const onGmSwitch = () => {
    setIsGm((prevMode) => !prevMode);
  };

  return (
    <Container height={"40px"}>
      <ExpandRow width={"100%"}>
        <Navigator onClick={onGmSwitch} className="button">
          {isGm ? (
            <FontAwesomeIcon
              icon={faHatWizard}
              color={Constants.WIDGET_SECONDARY_FONT}
              title={"Player Mode"}
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              color={Constants.WIDGET_SECONDARY_FONT}
              title={"Game Master Mode"}
            />
          )}
        </Navigator>
        {categorySelect === "creatures" && isGm ? (
          <Button
            $isactive={"false"}
            onClick={handlePostCreature}
            className="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        ) : null}
        <div style={{ flexGrow: "1" }}>
          {categorySelect !== "inventory" ? (
            <input
              className="row opaque_color font"
              value={tempSearch} // Use the temporary search state as the input value
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              title="Hit Enter to search"
              placeholder="Search"
              style={{ textAlign: "center" }}
            />
          ) : null}
        </div>

        {isGm ? (
          <>
            <Button
              $isactive={(categorySelect === "equipment").toString()}
              onClick={() => HandleCategoryChange("equipment")}
              title="Equipment"
              className="button"
            >
              <FontAwesomeIcon icon={faShield} />
            </Button>
            <Button
              $isactive={(categorySelect === "creatures").toString()}
              onClick={() => HandleCategoryChange("creatures")}
              title="Creatures"
              className="button"
            >
              <FontAwesomeIcon icon={faGhost} />
            </Button>
          </>
        ) : null}
        <Button
          $isactive={(categorySelect === "abilities").toString()}
          onClick={() => HandleCategoryChange("abilities")}
          title="Abilities"
        >
          <FontAwesomeIcon icon={faBolt} />
        </Button>
        <Button
          $isactive={(categorySelect === "inventory").toString()}
          onClick={() => HandleCategoryChange("inventory")}
          title="Inventory"
          className="button"
        >
          {isGm && session.loot.drops.length > 0 ? (
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: Constants.BRIGHT_YELLOW,
              }}
            >
              {session.loot.drops.length}
            </span>
          ) : null}
          <Icon path={mdiSack} size={0.8} />
        </Button>
      </ExpandRow>
    </Container>
  );
}

export default BrowserHeader;
