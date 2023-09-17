import styled from "styled-components";
import * as Constants from "../Constants";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 10px;
  justify-content: right;
  align-items: center;
`;

const Thaler = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  border-radius: 100px;
  background-color: rgba(180, 156, 40, 0.5);
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  h1 {
    font-size: 0.6em;
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const Shilling = styled.div`
  display: flex;
  flex: 1;
  border-radius: 100px;
  background-color: rgba(140, 140, 140, 0.5);
  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  h1 {
    font-size: 0.6em;
    margin-left: 5px;
    margin-top: 5px;
  }
`;

const Ortheg = styled.div`
  display: flex;
  flex: 1;
  border-radius: 100px;
  background-color: rgba(90, 46, 0, 0.5);

  justify-content: center;
  align-items: center;
  font-size: 1.25em;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  h1 {
    font-size: 0.6em;
    margin-left: 5px;
    margin-top: 5px;
  }
`;

function CurrencyBox() {
  return (
    <Container>
      <Thaler>
        100 <h1>Th</h1>
      </Thaler>
      <Shilling>
        50 <h1>Sh</h1>
      </Shilling>
      <Ortheg>
        10 <h1>Or</h1>
      </Ortheg>
    </Container>
  );
}
export default CurrencyBox;
