import StatBox from "./StatBox";

import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

import styled from "styled-components";
import * as Constants from "../../Constants";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

function StatsControls() {
  const { character } = useContext(CharacterContext);
  return (
    <Container>
      <StatBox
        type_name={"Cunning"}
        type_value={character.stats.cunning.value}
      />
      <StatBox
        type_name={"Discreet"}
        type_value={character.stats.discreet.value}
      />
      <StatBox
        type_name={"Persuasive"}
        type_value={character.stats.persuasive.value}
      />
      <StatBox type_name={"Quick"} type_value={character.stats.quick.value} />
      <StatBox
        type_name={"Resolute"}
        type_value={character.stats.resolute.value}
      />
      <StatBox type_name={"Strong"} type_value={character.stats.strong.value} />
      <StatBox
        type_name={"Vigilant"}
        type_value={character.stats.vigilant.value}
      />
      <StatBox
        type_name={"Accurate"}
        type_value={character.stats.accurate.value}
      />
    </Container>
  );
}

export default StatsControls;
