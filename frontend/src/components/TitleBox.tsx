import * as Constants from "../Constants";

type Props = {
  title: string;
};

const TitleBox = ({ title }: Props) => {
  return (
    <div
      className="flex items-center justify-center p-1"
      style={{
        color: Constants.FONT_LIGHT,
        backgroundColor: Constants.DARK,
        height: Constants.SECTION_TITLE_HEIGHT,
      }}
    >
      {title.toUpperCase()}
    </div>
  );
};

export default TitleBox;
