import * as Constants from "../Constants";
import { CombatEntry, SessionEntry } from "../Types";
import "../App.css";
import styled from "styled-components";
import { UpperFirstLetter } from "../functions/UtilityFunctions";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { CharacterPortraits } from "../Images";
import { useState, useEffect } from "react";
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
  width: 400px;
  max-height: 200px;
  min-height: 200px;
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

const ResultContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Result = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  flex: 2;
  justify-content: center;
  align-items: flex-end;
  width: 100px;
  height: 100%;
  font-size: 3.5rem;
  font-weight: bold;
  color: ${(props) =>
    props.$issuccess
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};

  opacity: ${(props) => (props.$issuccess ? 1 : 1.0)};

  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const Active = styled.div<ColorTypeProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.$rgb};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const Source = styled.div<ColorTypeProps>`
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  height: 50px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const FumbledSubText = styled.div`
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

function CombatEntryItem({ combatEntry, index }: CombatEntryItemProps) {
  const EntryColor = () => {
    return (
      Constants.TYPE_COLORS[combatEntry.active.toLowerCase()] ||
      Constants.WIDGET_SECONDARY_FONT
    );
  };

  let modifierText = "";
  if (combatEntry.modifier > 0) {
    modifierText = `+${combatEntry.modifier}`;
  } else if (combatEntry.modifier < 0) {
    modifierText = `${combatEntry.modifier}`;
  }

  let title = `Dice: d${combatEntry.dice}${modifierText}\nRoll: ${combatEntry.roll}\n`;

  if (combatEntry.source !== "Skill Test") {
    title += `Modifier: ${combatEntry.modifier}\n`;
  }

  if (combatEntry.target > 0) {
    title += `Target: ${combatEntry.target}`;
  }

  const [isRolling, setIsRolling] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [_rollCycles, setRollCycles] = useState<number>(0);

  useEffect(() => {
    if (index !== 19) {
      // Only allow the animation effect on the first item
      setCurrentDisplay(combatEntry.result);
      return;
    }
    setIsRolling(true);

    // Rapidly change the displayed roll result
    const rollInterval = setInterval(() => {
      setCurrentDisplay(Math.floor(Math.random() * combatEntry.dice) + 1); // assuming dice values start from 1
      setRollCycles((prev) => prev + 1);
    }, 100); // This determines how fast the numbers change

    // After certain cycles or time, finalize the result and clear the timer
    const timer = setTimeout(() => {
      setIsRolling(false);
      clearInterval(rollInterval);
      setCurrentDisplay(combatEntry.result);
      setRollCycles(0);
    }, 300); // Total duration of the roll animation

    return () => {
      clearTimeout(timer);
      clearInterval(rollInterval);
    };
  }, [combatEntry.result]);

  // const RollEntryColor = getAdjustedColor(EntryColor(), combatEntry.roll);

  const FumbledPerfect = () => {
    if (combatEntry.roll === 1) {
      return 0; // Perfect
    } else if (combatEntry.roll === 20) {
      return 1; // Fumbled
    } else {
      return 2; // Normal
    }
  };

  const FumbledPerfectText = () => {
    if (FumbledPerfect() === 0) {
      if (combatEntry.active === "attack") {
        return "+1d6 damage.";
      } else if (combatEntry.active === "defense") {
        return "Free attack against the enemy.";
      } else if (combatEntry.active === "casting") {
        return "Double the spell effect.";
      } else if (combatEntry.active === "sneaking") {
        return "No detection for the entire group.";
      } else {
        return "";
      }
    } else if (FumbledPerfect() === 1) {
      if (combatEntry.active === "attack") {
        return "Free attack against you.";
      } else if (combatEntry.active === "defense") {
        return "+3 Damage taken.";
      } else if (combatEntry.active === "casting") {
        return "Your spell hit a random foe/friend.";
      } else if (combatEntry.active === "sneaking") {
        return "Conflict is inevitable! If attacked, you are surprised!";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <Container src={CharacterPortraits[combatEntry.portrait]}>
      <ColorBlock $rgb={EntryColor()} $issuccess={combatEntry.success} />
      <ResultContainer>
        {combatEntry.active === "Resting" ? (
          <>
            <Result
              title={title}
              $rgb={EntryColor()}
              $issuccess={combatEntry.success}
            >
              <FontAwesomeIcon icon={faMoon} />
            </Result>
          </>
        ) : (
          <Result
            title={title}
            $rgb={EntryColor()}
            $issuccess={combatEntry.success}
            className={isRolling ? "rolling" : ""}
          >
            {currentDisplay}
          </Result>
        )}

        {combatEntry.source === "Skill Test" ? (
          <Active $rgb={EntryColor()} $issuccess={combatEntry.success}>
            {modifierText} {UpperFirstLetter(combatEntry.active)}{" "}
          </Active>
        ) : (
          <Active $rgb={EntryColor()} $issuccess={combatEntry.success}>
            {UpperFirstLetter(combatEntry.active)}
          </Active>
        )}
        <FumbledSubText>{FumbledPerfectText()}</FumbledSubText>
        <Source $rgb={EntryColor()} $issuccess={combatEntry.success}>
          {combatEntry.source === "Skill Test" ? (
            combatEntry.roll === 1 ? (
              <>
                <span>{"Perfect " + UpperFirstLetter(combatEntry.source)}</span>
                <FontAwesomeIcon
                  icon={faAngleDoubleUp} // icon for perfect test
                  color="#5cb57c" // color choice
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "4px",
                    left: "5px",
                  }}
                />
              </>
            ) : combatEntry.roll === 20 ? (
              <>
                <span>{"Fumbled " + UpperFirstLetter(combatEntry.source)}</span>
                <FontAwesomeIcon
                  icon={faAngleDoubleDown} // icon for fumbled test
                  color="#b55c5c" // color choice
                  style={{
                    fontSize: "20px",
                    position: "relative",
                    top: "4px",
                    left: "5px",
                  }}
                />
              </>
            ) : (
              <>
                <span>{UpperFirstLetter(combatEntry.source)}</span>
                {combatEntry.success ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    color="#5cb57c"
                    style={{
                      fontSize: "20px",
                      position: "relative",
                      top: "4px",
                      left: "5px",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    color="#b55c5c"
                    style={{
                      fontSize: "20px",
                      position: "relative",
                      top: "4px",
                      left: "5px",
                    }}
                  />
                )}
              </>
            )
          ) : (
            <span>{UpperFirstLetter(combatEntry.source)}</span>
          )}
        </Source>
      </ResultContainer>
    </Container>
  );
}

export default CombatEntryItem;
