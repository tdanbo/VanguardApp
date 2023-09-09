import UserBox from "../UserBox";

interface LoginProps {
  setSelector: (selector: string) => void;
}

function GamemasterComponent({ setSelector }: LoginProps) {
  return <UserBox />;
}
export default GamemasterComponent;
