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
  min-height: 153px;
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
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  padding-right: 8px;
  padding-top: 5px;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Result = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
  font-weight: bold;
  color: ${(props) =>
    props.$issuccess
      ? Constants.WIDGET_PRIMARY_FONT
      : Constants.WIDGET_PRIMARY_FONT};

  opacity: ${(props) => (props.$issuccess ? 1 : 1.0)};
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
  justify-content: end;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.$rgb};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 50%;
`;

const Source = styled.div<ColorTypeProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-size: 20px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 50%;
`;

const Divider = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  background-color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
  width: 1px;
  height: 100%;
  margin: 0px 10px 0px 10px;
`;

function CombatEntryItem({
  combatEntry,
  index,
  session,
}: CombatEntryItemProps) {
  const EntryColor = () => {
    return (
      Constants.TYPE_COLORS[combatEntry.roll_type.toLowerCase()] ||
      Constants.WIDGET_SECONDARY_FONT
    );
  };

  let modifierText = "";
  if (combatEntry.roll_entry.mod > 0) {
    modifierText = `+${combatEntry.roll_entry.mod}`;
  } else if (combatEntry.roll_entry.mod < 0) {
    modifierText = `${combatEntry.roll_entry.mod}`;
  }

  let title = `Dice: d${combatEntry.roll_entry.dice}${modifierText}\nResult: ${combatEntry.roll_entry.result}\n`;
  let durability_title = `Dice: d4\nResult: ${combatEntry.durability.check}\nTarget: 3`;

  if (combatEntry.roll_source !== "Skill Test") {
    title += `Modifier: ${combatEntry.roll_entry.mod}\n`;
  }

  if (combatEntry.roll_entry.target > 0) {
    title += `Target: ${combatEntry.roll_entry.target}`;
  }

  const [isRolling, setIsRolling] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState<number>(0);
  const [_rollCycles, setRollCycles] = useState<number>(0);

  useEffect(() => {
    if (index !== 19) {
      // Only allow the animation effect on the first item
      setCurrentDisplay(combatEntry.roll_entry.result);
      return;
    }
    setIsRolling(true);

    // Rapidly change the displayed roll result
    const rollInterval = setInterval(() => {
      setCurrentDisplay(
        Math.floor(Math.random() * combatEntry.roll_entry.dice) + 1,
      ); // assuming dice values start from 1
      setRollCycles((prev) => prev + 1);
    }, 100); // This determines how fast the numbers change

    // After certain cycles or time, finalize the result and clear the timer
    const timer = setTimeout(() => {
      setIsRolling(false);
      clearInterval(rollInterval);
      setCurrentDisplay(combatEntry.roll_entry.result);
      setRollCycles(0);
    }, 300); // Total duration of the roll animation

    return () => {
      clearTimeout(timer);
      clearInterval(rollInterval);
    };
  }, [combatEntry.uuid]);

  // const RollEntryColor = getAdjustedColor(EntryColor(), combatEntry.roll_entry.roll);

  const FumbledPerfect = () => {
    if (combatEntry.roll_entry.roll === 1) {
      return 0; // Perfect
    } else if (combatEntry.roll_entry.roll === 20) {
      return 1; // Fumbled
    } else {
      return 2; // Normal
    }
  };

  const FumbledPerfectText = () => {
    if (FumbledPerfect() === 0) {
      if (combatEntry.roll_type === "attack") {
        return "+1d6 damage.";
      } else if (combatEntry.roll_type === "defense") {
        return "Free attack against the enemy.";
      } else if (combatEntry.roll_type === "casting") {
        return "Double the spell effect.";
      } else if (combatEntry.roll_type === "sneaking") {
        return "No detection for the entire group.";
      } else {
        return "";
      }
    } else if (FumbledPerfect() === 1) {
      if (combatEntry.roll_type === "attack") {
        return `Free attack against you.`;
      } else if (combatEntry.roll_type === "defense") {
        return `+3 Damage taken.`;
      } else if (combatEntry.roll_type === "casting") {
        return "Your spell hit a random foe/friend.";
      } else if (combatEntry.roll_type === "sneaking") {
        return "Conflict is inevitable! If attacked, you are surprised!";
      } else {
        return "";
      }
    } else if (
      combatEntry.durability.name !== "" &&
      combatEntry.durability.check === 4
    ) {
      return `Durability check failed. ${combatEntry.durability.name} lost durability.`;
    } else {
      return "";
    }
  };

  return (
    <Container src={CharacterPortraits[combatEntry.character.portrait]}>
      <ColorBlock
        $rgb={EntryColor()}
        $issuccess={combatEntry.roll_entry.success}
      />
      <ResultContainer>
        {combatEntry.roll_type === "resting" ? (
          <>
            <Result
              title={title}
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
            >
              <FontAwesomeIcon icon={faMoon} />
            </Result>
          </>
        ) : (
          <>
            <Breakdown>1d{combatEntry.roll_entry.dice}</Breakdown>
            <Result
              title={title}
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
              className={isRolling ? "rolling" : ""}
            >
              {currentDisplay}
            </Result>
          </>
        )}
        <SourceContainer>
          {combatEntry.roll_source === "Skill Test" ? (
            <Active
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
            >
              {modifierText} {UpperFirstLetter(combatEntry.roll_type)}{" "}
            </Active>
          ) : (
            <Active
              $rgb={EntryColor()}
              $issuccess={combatEntry.roll_entry.success}
            >
              {UpperFirstLetter(combatEntry.roll_type)}
            </Active>
          )}
          <Divider />
          <Source
            $rgb={EntryColor()}
            $issuccess={combatEntry.roll_entry.success}
          >
            {combatEntry.roll_source === "Resting" ? (
              <span>
                {toTitleCase(session.travel.weather)} Morning - Day{" "}
                {session.travel.day}
              </span>
            ) : (
              <>
                <span>{UpperFirstLetter(combatEntry.roll_source)}</span>
              </>
            )}
          </Source>
        </SourceContainer>
        <FumbledSubText title={durability_title}>
          {FumbledPerfectText()}
        </FumbledSubText>
      </ResultContainer>
      <RightBlock>
        {combatEntry.roll_source === "Skill Test" ? (
          combatEntry.roll_entry.roll === 1 ? (
            <FontAwesomeIcon
              icon={faAngleDoubleUp}
              color="#5cb57c"
              style={{
                fontSize: "25px",
              }}
            />
          ) : combatEntry.roll_entry.roll === 20 ? (
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
