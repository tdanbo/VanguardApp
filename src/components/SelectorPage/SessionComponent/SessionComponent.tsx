import * as Constants from "../../../Constants";
import * as Styles from "../SelectorStyles";
import SessionButtons from "./SessionButtons";
import SessionBox from "./SessionBox";
import { useState, useEffect, useContext } from "react";
import { SessionEntry } from "../../../Types";
import { getSessions } from "../../../functions/SessionsFunctions";
import { UserContext } from "../../../contexts/UserContext";

interface LoginProps {
  setSelector: (selector: string) => void;
}

function CreateSessionComponent({ setSelector }: LoginProps) {
  const { user } = useContext(UserContext);
  const [sessionLog, setSessionLog] = useState<SessionEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getSessions(user);
      setSessionLog(data);
    }

    fetchData();
  }, []);

  return (
    <div
      className="flex w-1/5 flex-col justify-center"
      style={{ margin: "100px" }}
    >
      <div style={Styles.modalStyles}>
        <div
          className="flex justify-center p-10 text-4xl font-bold"
          style={{ color: Constants.FONT_LIGHT }}
        >
          Sessions
        </div>
        <div className="h-0.5 w-full bg-zinc-800"></div>
        <div
          className="flex flex-col justify-center space-y-2 overflow-auto"
          style={{ height: "400px" }}
        >
          {[...sessionLog].reverse().map((item, index) => (
            <SessionBox setSelector={setSelector} sessionprop={item} />
          ))}
        </div>
        <div className="my-5 h-0.5 w-full bg-zinc-800"></div>
      </div>
      <SessionButtons setSelector={setSelector} />
    </div>
  );
}

export default CreateSessionComponent;
