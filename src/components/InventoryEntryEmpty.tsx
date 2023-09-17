import * as Constants from "../Constants";
import styled from "styled-components";
interface InventoryEntryEmptyProps {
  index: number;
}

const Container = styled.div`
  display: flex;
  min-height: 50px;
  max-height: 50px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
`;

function InventoryEntryEmpty({ index }: InventoryEntryEmptyProps) {
  return <Container></Container>;
}
export default InventoryEntryEmpty;
