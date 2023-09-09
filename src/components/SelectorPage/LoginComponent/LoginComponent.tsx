import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Constants from "../../../Constants";
import { UserContext } from "../../../contexts/UserContext";

interface LoginProps {
  setSelector: (selector: string) => void;
}

function LoginComponent({ setSelector }: LoginProps) {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState<string | null>(null);

  const fetchUsername = async () => {
    try {
      const res = await axios.get("http://localhost:8000/username", {
        withCredentials: true,
      });
      const fetchedUsername = res.data.user;

      if (fetchedUsername) {
        setUser(fetchedUsername);
        setSelector("session");
      } else {
        console.log("Username is not present in the response.");
      }
    } catch (error) {
      console.error("Error fetching username from cookie:", error);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  console.log("Username:", username);

  const handleLogin = () => {
    axios.get("http://localhost:8000/login").then((res) => {
      const authURL = res.data.url;
      console.log(authURL);
      window.location.href = authURL;
    });
  };
  return (
    <div className="flex w-full p-7">
      <button
        className="center h-10 w-full flex-row rounded-l-lg px-20"
        style={{
          backgroundColor: Constants.BUTTON_LIGHT,
          border: `1px solid ${Constants.NEW_BORDER}`,
          textAlign: "center",
        }}
        onClick={handleLogin}
      >
        Login Using Discord
      </button>

      <div
        className="flex h-10 w-10 items-center justify-center rounded-r-lg"
        style={{
          color: "FF0000",
          fontSize: "1.25rem",
          backgroundColor: Constants.BUTTON_LIGHT,
          borderTop: `1px solid ${Constants.NEW_BORDER}`,
          borderRight: `1px solid ${Constants.NEW_BORDER}`,
          borderBottom: `1px solid ${Constants.NEW_BORDER}`,
        }}
      >
        <FontAwesomeIcon icon={faDiscord} />
      </div>
    </div>
  );
}

export default LoginComponent;
