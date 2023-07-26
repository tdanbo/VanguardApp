import * as Constants from "../Constants";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center p-1"
      style={{ color: Constants.FONT_LIGHT, backgroundColor: Constants.DARK }}
    >
      {title.toUpperCase()}
    </div>
  );
};

export default Header;
