import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheck,
  faMoon,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../Styles.css";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CombatEntry, SessionEntry } from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
interface CombatEntryItemProps {
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
  max-height: 150px;
  min-height: 150px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
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
  width: 30px;
  max-width: 30px;
  margin: 1px 1px 1px 1px;
  padding-right: 10px;
  padding-top: 10px;
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

function CombatEntryItem({ combatEntry, index }: CombatEntryItemProps) {
  const EntryColor = () => {
    return (
      Constants.TYPE_COLORS[combatEntry.roll_type.toLowerCase()] ||
      Constants.WIDGET_SECONDARY_FONT
    );
  };

  let modifierText = "";
  if (combatEntry.roll_entry.mod > 0) {
    modifierText = `+ ${combatEntry.roll_entry.mod}`;
  } else if (combatEntry.roll_entry.mod < 0) {
    modifierText = `${combatEntry.roll_entry.mod}`;
  }

  let title = `Dice: d${combatEntry.roll_entry.dice.join(
    " + d",
  )} ${modifierText}\nResult: ${combatEntry.roll_entry.result1}\n`;

  if (combatEntry.roll_source !== "Skill Test") {
    title += `Modifier: ${combatEntry.roll_entry.mod}\n`;
  }

  if (combatEntry.roll_entry.target > 0) {
    title += `Target: ${combatEntry.roll_entry.target}`;
  }

  const [isRolling, setIsRolling] = useState(false);
  const [currentDisplay1, setCurrentDisplay1] = useState<number>(0);
  const [currentDisplay2, setCurrentDisplay2] = useState<number>(0);
  const [_rollCycles, setRollCycles] = useState<number>(0);

  useEffect(() => {
    if (index !== 19) {
      // Only allow the animation effect on the first item
      setCurrentDisplay1(combatEntry.roll_entry.result1);
      setCurrentDisplay2(combatEntry.roll_entry.result2);
      return;
    }
    setIsRolling(true);

    // Rapidly change the displayed roll result
    const rollInterval = setInterval(() => {
      setCurrentDisplay1(Math.floor(Math.random() * 20) + 1); // assuming dice values start from 1
      setCurrentDisplay2(Math.floor(Math.random() * 20) + 1); // assuming dice values start from 1
      setRollCycles((prev) => prev + 1);
    }, 100); // This determines how fast the numbers change

    // After certain cycles or time, finalize the result and clear the timer
    const timer = setTimeout(() => {
      setIsRolling(false);
      clearInterval(rollInterval);
      setCurrentDisplay1(combatEntry.roll_entry.result1);
      setCurrentDisplay2(combatEntry.roll_entry.result2);
      setRollCycles(0);
    }, 300); // Total duration of the roll animation

    return () => {
      clearTimeout(timer);
      clearInterval(rollInterval);
    };
  }, [combatEntry.uuid]);

  // const RollEntryColor = getAdjustedColor(EntryColor(), combatEntry.roll_entry.roll);

  const FumbledPerfectText = () => {
    let message = "";

    if (combatEntry.roll_entry.critical.state === 2) {
      if (combatEntry.roll_type === "attack") {
        message = "+1d6 damage.";
      } else if (combatEntry.roll_type === "defense") {
        message = "Free attack against the enemy.";
      } else if (combatEntry.roll_type === "resolute") {
        message = "Double the spell effect.";
      } else if (combatEntry.roll_type === "discreet") {
        message = "No detection for the entire group.";
      } else {
        message = "";
      }
    } else if (combatEntry.roll_entry.critical.state === 0) {
      if (combatEntry.roll_type === "attack") {
        message += "Free attack against you. ";
      } else if (combatEntry.roll_type === "defense") {
        message += "+3 Damage taken. ";
      } else if (combatEntry.roll_type === "resolute") {
        message += "Your spell hit a random foe/friend.";
      } else if (combatEntry.roll_type === "discreet") {
        message += "Conflict is inevitable! If attacked, you are surprised!";
      } else {
        message += "";
      }
    }

    return message;
  };

  const roll_text = `${combatEntry.roll_state} ${combatEntry.roll_type}`;

  return (
    <Container src={CharacterPortraits[combatEntry.character.portrait]}>
      <ColorBlock
        $rgb={EntryColor()}
        $issuccess={combatEntry.roll_entry.success}
      />
      <RollContainer>
        {combatEntry.roll_source === "Resting" ? null : (
          <Breakdown>
            {combatEntry.roll_entry.dice
              .map((die, index) => "1d" + die + " ")
              .join("+ ")}
            {modifierText}
          </Breakdown>
        )}
        <ResultContainer>
          {combatEntry.roll_state === "focused" ||
          combatEntry.roll_state === "unfocused" ? (
            <>
              <Result
                title={title}
                $position={0}
                className={isRolling ? "rolling" : ""}
                style={{
                  opacity:
                    (combatEntry.roll_state === "focused" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay1 <= currentDisplay2) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay1 >= currentDisplay2))) ||
                    (combatEntry.roll_state === "unfocused" &&
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
                    (combatEntry.roll_state === "focused" &&
                      ((combatEntry.roll_source === "Skill Test" &&
                        currentDisplay2 <= currentDisplay1) ||
                        (combatEntry.roll_source !== "Skill Test" &&
                          currentDisplay2 >= currentDisplay1))) ||
                    (combatEntry.roll_state === "unfocused" &&
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
          <FumbledSubText>
            {FumbledPerfectText() !== ""
              ? FumbledPerfectText()
              : combatEntry.roll_source}
          </FumbledSubText>
        )}
      </RollContainer>
      <RightBlock>
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
      </RightBlock>
    </Container>
  );
}

export default CombatEntryItem;
