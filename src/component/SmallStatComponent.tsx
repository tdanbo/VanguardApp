import styled from "styled-components";
import * as Constants from "../Constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toTitleCase } from "../functions/UtilityFunctions";
interface ContainerProps {
  width: string;
}

const backgroundcolor = "rgba(19, 23, 22, 0.8)";

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  gap: 2px;
  min-width: ${(props) => props.width};
  background-color: ${backgroundcolor};
  border-radius: ${Constants.BORDER_RADIUS};
  margin: 2px;
`;
// background-image: url("/dist/assets/portrait1.jpeg");

interface DivProps {
  height: string;
}

interface ColumnProps {
  width: string;
}

const Column = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  max-width: ${(props) => props.width};
`;

const Row = styled.div<DivProps>`
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    flex-direction: row;
    border 1px solid ${Constants.WIDGET_BORDER};
    border-radius: ${Constants.BORDER_RADIUS};
    max-height: ${(props) => props.height};
    height: ${(props) => props.height};
    
  `;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;

  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT_INACTIVE};
  height: 10%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: top;
  justify-content: center;
  min-width: 30px;
  max-width: 30px;
  width: 30px;
  padding-top: 5px;
  filter: drop-shadow(1px 1px 0px ${Constants.BACKGROUND});
`;

interface SmallStatComponentProps {
  title: string;
  value: number;
  icon: any;
}

function SmallStatComponent({ title, value, icon }: SmallStatComponentProps) {
  return (
    <Container width={"23%"}>
      <Column width={"100%"}>
        <Row height={"70%"}>
          <Block></Block>
          <Value>{value}</Value>
          <Block>
            <FontAwesomeIcon
              icon={icon}
              color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
              size="sm"
            />
          </Block>
        </Row>
        <Row height={"30%"}>
          <Title>{toTitleCase(title)}</Title>
        </Row>
      </Column>
    </Container>
  );
}

export default SmallStatComponent;
