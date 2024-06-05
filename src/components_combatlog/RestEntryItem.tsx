import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheck,
  faCutlery,
  faMoon,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../App.css";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CombatEntry, SessionEntry } from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import Icon from "@mdi/react";
import { mdiShieldOff, mdiSilverwareForkKnife, mdiSleep } from "@mdi/js";
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

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  padding-right: 8px;
  padding-top: 5px;
  gap: 5px;
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

const ResultContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

interface ResultProps {
  $position: 0 | 1 | 2;
}
const Result = styled.div<ResultProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: ${(props) =>
    props.$position === 0
      ? "flex-end"
      : props.$position === 1
      ? "flex-start"
      : "center"};


  font-size: 3.5rem;
  font-weight: bold;
  width: 100%;

  color: ${Constants.WIDGET_PRIMARY_FONT}
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const FumbledSubText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  min-height: 20px;
  max-height: 20px;
  width: 100%;
`;

const Breakdown = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  min-height: 20px;
  max-height: 20px;
`;

const SourceContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 14px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const Active = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.$rgb};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 50%;
`;

const ResultDivider = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 1px;
  height: 60%;
  margin: 10px 0px 0px 0px;
`;

function RestEntryItem({ combatEntry, index }: RestEntryItemProps) {
  return (
    <Container src={CharacterPortraits[combatEntry.character.portrait]}>
      <ColorBlock
        $rgb={
          combatEntry.roll_type === "eating"
            ? Constants.COLOR_5
            : Constants.COLOR_3
        }
        $issuccess={combatEntry.roll_entry.success}
      >
        <Icon
          path={
            combatEntry.roll_type === "eating"
              ? mdiSilverwareForkKnife
              : mdiSleep
          }
          size={0.8}
        />
      </ColorBlock>
      <RollContainer>
        {combatEntry.roll_source}
        {/* {combatEntry.roll_source === "Resting" ? null : (
          <Breakdown>1d{combatEntry.roll_entry.dice} </Breakdown>
        )}
        <ResultContainer>
          {combatEntry.roll_state === "full" ||
          combatEntry.roll_state === "weak" ? (
            <>
              <Result
                title={title}
                $position={0}
                className={isRolling ? "rolling" : ""}
                style={{
                  opacity:
                    (combatEntry.roll_state === "full" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay1 <= currentDisplay2) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay1 >= currentDisplay2))) ||
                    (combatEntry.roll_state === "weak" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay1 >= currentDisplay2) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay1 <= currentDisplay2)))
                      ? 1
                      : 0.1,
                }}
              >
                {currentDisplay1}
              </Result>
              <ResultDivider />
              <Result
                title={title}
                $position={1}
                className={isRolling ? "rolling" : ""}
                style={{
                  opacity:
                    (combatEntry.roll_state === "full" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay2 <= currentDisplay1) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay2 >= currentDisplay1))) ||
                    (combatEntry.roll_state === "weak" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay2 >= currentDisplay1) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay2 <= currentDisplay1)))
                      ? 1
                      : 0.1,
                }}
              >
                {currentDisplay2}
              </Result>
            </>
          ) : (
            <Result
              title={title}
              $position={2}
              className={isRolling ? "rolling" : ""}
            >
              {combatEntry.roll_source === "Resting" ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                currentDisplay1
              )}
            </Result>
          )}
        </ResultContainer>
        <SourceContainer>
          {combatEntry.roll_source === "Skill Test" ? (
            <Active
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
            >
              {modifierText} {toTitleCase(roll_text)}
            </Active>
          ) : (
            <Active
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
            >
              {toTitleCase(roll_text)}
            </Active>
          )}
        </SourceContainer>
        {combatEntry.roll_source === "Resting" ? null : (
          <FumbledSubText title={durability_title}>
            {FumbledPerfectText() !== ""
              ? FumbledPerfectText()
              : combatEntry.roll_source}
          </FumbledSubText>
        )} */}
      </RollContainer>
      {/* <RightBlock>
        {combatEntry.roll_source === "Skill Test" ? (
          combatEntry.roll_entry.critical.state === 2 ? (
            <FontAwesomeIcon
              icon={faAngleDoubleUp}
              color="#5cb57c"
              style={{
                fontSize: "25px",
              }}
            />
          ) : combatEntry.roll_entry.critical.state === 0 ? (
            <FontAwesomeIcon
              icon={faAngleDoubleDown}
              color="#b55c5c"
              style={{
                fontSize: "25px",
              }}
            />
          ) : combatEntry.roll_entry.success ? (
            <FontAwesomeIcon
              icon={faCheck}
              color="#5cb57c"
              style={{
                fontSize: "25px",
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faXmark}
              color="#b55c5c"
              style={{
                fontSize: "25px",
              }}
            />
          )
        ) : null}
        {combatEntry.durability.check === 5 &&
        !combatEntry.roll_entry.success &&
        (combatEntry.roll_type === "damage" ||
          combatEntry.roll_type === "armor") ? (
          <Icon path={mdiShieldOff} size={0.9} color={"#b55c5c"} />
        ) : null}
      </RightBlock> */}
    </Container>
  );
}

export default RestEntryItem;
