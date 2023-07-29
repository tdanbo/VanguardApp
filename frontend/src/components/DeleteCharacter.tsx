import * as Constants from "../Constants";

import ClearIcon from "@mui/icons-material/Clear";

function DeleteCharacter() {
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
      <ClearIcon />
    </div>
  );
}

export default DeleteCharacter;
