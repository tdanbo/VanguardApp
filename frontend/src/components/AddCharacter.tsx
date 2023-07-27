import * as Constants from "../Constants";

function AddCharacter() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: Constants.PRIMARY_LIGHTER,
        width: Constants.SECTION_TITLE_HEIGHT,
        minWidth: Constants.SECTION_TITLE_HEIGHT,
        border: `1px solid ${Constants.BORDER}`,
      }}
    >
      a
    </div>
  );
}

export default AddCharacter;
