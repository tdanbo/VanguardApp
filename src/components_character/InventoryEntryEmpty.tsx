import styled from "styled-components";
import * as Constants from "../Constants";

const Container = styled.div`
  display: flex;
  min-height: 35px;
  max-height: 35px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  min-height: 40px;
  max-height: 40px;
  padding: 2px;
  width: 100%;
`;

function InventoryEntryEmpty() {
  return <div className="row row--card bg--primary-1 border"></div>;
}
export default InventoryEntryEmpty;
