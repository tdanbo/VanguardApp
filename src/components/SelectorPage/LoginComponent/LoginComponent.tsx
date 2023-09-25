import { useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Constants from "../../../Constants";
import { UserContext } from "../../../contexts/UserContext";
import styled from "styled-components";

import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
} from "../SelectorStyles";

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0 0 ${Constants.BORDER_RADIUS}}px;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 20px;
  background-color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  text-align: center;
  border-radius: 0 ${Constants.BORDER_RADIUS} ${Constants.BORDER_RADIUS} 0}px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

interface LoginProps {
  setSelector: (selector: string) => void;
}

function LoginComponent({ setSelector }: LoginProps) {
  const { setUser } = useContext(UserContext);

  const fetchUsername = async () => {
    console.log("fetching username");
    try {
      const res = await axios.get("http://localhost:8000/username", {
        withCredentials: true,
      });
      const fetchedUsername = res.data.user;
      console.log("fetched username: ", fetchedUsername);
      if (fetchedUsername) {
        setUser(fetchedUsername);
        setSelector("session");
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  const handleLogin = () => {
    axios.get("http://localhost:8000/login").then((res) => {
      const authURL = res.data.url;
      window.location.href = authURL;
    });
  };
  return (
    <MainContainer>
      <Title>Login</Title>
      <ModalContainer>
        <CenterContainer>
          <ButtonContainer>
            <IconButton>
              <FontAwesomeIcon icon={faDiscord} />
            </IconButton>
            <LoginButton onClick={handleLogin}>Login Using Discord</LoginButton>
          </ButtonContainer>
        </CenterContainer>
      </ModalContainer>
    </MainContainer>
  );
}

export default LoginComponent;
