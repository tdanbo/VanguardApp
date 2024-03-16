import styled from "styled-components";
import BackgroundImage from "../assets/icons/background.jpeg";
import { NewCharacterEntry } from "../Types";
import { v4 as uuidv4 } from "uuid";
import { update_session } from "../functions/SessionsFunctions";

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

interface BrowserHeaderProps {
  session: SessionEntry;
  websocket: Socket;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  isGm: boolean;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  HideBrowser: boolean;
  setHideBrowser: React.Dispatch<React.SetStateAction<boolean>>;
}

function BrowserHeader({
  session,
  websocket,
  setCharacterName,
  isGm,
  categorySelect,
  setCategorySelect,
  setSearch,
  HideBrowser,
  setHideBrowser,
}: BrowserHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [_addAdjust, setAddAdjust] = useState(0);

  const [_filterType, setFilterType] = useState("all");

  const handlePostCreature = async () => {
    NewCharacterEntry.id = uuidv4();
    NewCharacterEntry.name = "Creature Character";
    update_session(session, websocket, NewCharacterEntry, true);
    setCharacterName(NewCharacterEntry.id);
  };

  const HandleCategoryChange = (category: string) => {
    setCategorySelect(category);
    setFilterType("all");
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
              onChange={(e) => setSearch(e.target.value)}
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
