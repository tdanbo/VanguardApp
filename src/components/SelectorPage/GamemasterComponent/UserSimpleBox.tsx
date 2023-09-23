import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import * as Constants from "../../../Constants";
import { getSessionUsers } from "../../../functions/SessionsFunctions";
import { useContext } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import styled from "styled-components";

interface UserSimpleBoxProps {
  username: string;
  setUserLog: React.Dispatch<React.SetStateAction<string[]>>;
}

const BoxContainer = styled.div`
  display: flex;
  padding: 0.25rem;
  border-radius: 0.375rem;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const FlexGrowSection = styled.div`
  display: flex;
  flex-grow: 1;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const RedFlexCenter = styled(FlexCenter)`
  color: ${Constants.BRIGHT_RED};
`;

function UserSimpleBox({ username, setUserLog }: UserSimpleBoxProps) {
  const { session } = useContext(SessionContext);

  const onHandleKickUser = async () => {
    const users = await getSessionUsers(session.id);
    setUserLog(users);
  };

  return (
    <BoxContainer>
      <FlexCenter>
        <FontAwesomeIcon icon={faDiscord} onClick={onHandleKickUser} />
      </FlexCenter>
      <FlexGrowSection>{username}</FlexGrowSection>
      <RedFlexCenter>
        <FontAwesomeIcon icon={faXmark} onClick={onHandleKickUser} />
      </RedFlexCenter>
    </BoxContainer>
  );
}

export default UserSimpleBox;
