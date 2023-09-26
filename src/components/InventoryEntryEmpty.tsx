import * as Constants from "../Constants";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 30px;
  max-height: 30px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

function InventoryEntryEmpty() {
  return <Container></Container>;
}
export default InventoryEntryEmpty;
