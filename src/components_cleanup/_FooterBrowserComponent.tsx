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
import { cloneDeep } from "lodash";
import { GetGameData } from "../contexts/GameContent";

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

interface FooterBrowserComponent {
  session: SessionEntry;
  isGm: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;

  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
}

function FooterBrowserComponent({
  categorySelect,
  setCategorySelect,

  setCharacterId,
  setIsGm,
  isGm,
  session,
}: FooterBrowserComponent) {
  const { updateCreatureData } = GetGameData();

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

  // const HandleLeaveSession = () => {
  //   setSession(EmptySession);
  //   setCharacterName("");
  //   setIsJoined(false);
  // };

  const onGmSwitch = () => {
    setIsGm((prevMode) => !prevMode);
  };

  return (
    <div className="header">
      <div className="header_button" onClick={onGmSwitch}>
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
      </div>
      {categorySelect === "creatures" && isGm ? (
        <Button
          $isactive={"false"}
          onClick={handlePostCreature}
          className="button"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      ) : null}
      <div className="header_divider" />
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

      <div
        className="header_button"
        onClick={() => HandleCategoryChange("abilities")}
        title="Abilities"
      >
        <FontAwesomeIcon icon={faBolt} />
      </div>
      <div className="header_divider" />
      <div
        onClick={() => HandleCategoryChange("inventory")}
        title="Inventory"
        className="header_button"
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
      </div>
    </div>
  );
}

export default FooterBrowserComponent;
