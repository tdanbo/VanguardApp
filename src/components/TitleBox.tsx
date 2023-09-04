import * as Constants from "../Constants";

type Props = {
  title: string;
};

const TitleBox = ({ title }: Props) => {
  return (
    <div
      className="flex grow items-center justify-center p-1"
      style={{
        color: Constants.FONT_LIGHT,
        backgroundColor: Constants.DARK,
        height: Constants.SECTION_TITLE_HEIGHT,
        maxHeight: Constants.SECTION_TITLE_HEIGHT,
      }}
    >
      {title.toUpperCase()}
    </div>
  );
};

export default TitleBox;
