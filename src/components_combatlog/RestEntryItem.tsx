import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CombatEntry, SessionEntry } from "../Types";
import Icon from "@mdi/react";
import { mdiSilverwareForkKnife, mdiSleep } from "@mdi/js";
interface RestEntryItemProps {
  combatEntry: CombatEntry;
  index: number;
  session: SessionEntry;
}

interface ColorTypeProps {
  $rgb: string;
  $issuccess: boolean;
}

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: 75px;
  min-height: 75px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 30%;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
  justify-content: center;
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
`;

const RollContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

function RestEntryItem({ combatEntry }: RestEntryItemProps) {
  return (
    <Container src={CharacterPortraits[combatEntry.character.portrait]}>
      <ColorBlock
        $rgb={
          combatEntry.roll_type === "eating"
            ? Constants.COLOR_5
            : Constants.COLOR_3
        }
        $issuccess={combatEntry.roll_entry.success}
      ></ColorBlock>
      <RollContainer>
        <Icon
          path={
            combatEntry.roll_type === "eating"
              ? mdiSilverwareForkKnife
              : mdiSleep
          }
          size={1.0}
        />
        {combatEntry.roll_source}
      </RollContainer>
    </Container>
  );
}

export default RestEntryItem;
