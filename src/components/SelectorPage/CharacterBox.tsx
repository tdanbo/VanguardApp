import * as Constants from "../../Constants";

function CharacterBox() {
  return (
    <button
      className="fs-l text-bold mb-2 flex h-10 w-full items-center justify-center rounded-lg"
      style={{
        color: Constants.FONT_LIGHT,
        backgroundColor: Constants.BUTTON,
        borderTop: `1px solid ${Constants.NEW_BORDER}`,
        borderRight: `1px solid ${Constants.NEW_BORDER}`,
        borderBottom: `1px solid ${Constants.NEW_BORDER}`,
      }}
    >
      Vindica
    </button>
  );
}

export default CharacterBox;
