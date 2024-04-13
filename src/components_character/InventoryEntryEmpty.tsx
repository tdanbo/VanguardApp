import * as Constants from "../Constants";
import styled from "styled-components";

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
`;

function InventoryEntryEmpty() {
  return <Container></Container>;
}
export default InventoryEntryEmpty;
