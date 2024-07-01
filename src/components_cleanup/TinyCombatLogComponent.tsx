import "../Styles.css";
import { SessionEntry } from "../Types";

interface TinyCombatLogProps {
  session: SessionEntry;
}

function TinyCombatLogComponent({ session }: TinyCombatLogProps) {
  let latestCombatLogEntry;
  if (session.combatlog.length > 0) {
    latestCombatLogEntry = session.combatlog[session.combatlog.length - 1];
  }

  return (
    <>
      {session.combatlog.length > 0 && latestCombatLogEntry ? (
        <div>{latestCombatLogEntry.roll_entry.result1}</div>
      ) : null}
    </>
  );
}

export default TinyCombatLogComponent;
