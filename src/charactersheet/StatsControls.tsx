import StatBox from "../components/StatsControls/StatBox";
import { useState } from "react";
import styled from "styled-components";
import { CharacterEntry } from "../Types";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

interface StatsControlsProps {
  character: CharacterEntry;
}

function StatsControls({ character }: StatsControlsProps) {
  const [swapSource, setSwapSource] = useState<null | string>(null);
  return (
    <Container>
      <StatBox
        type_name={"Cunning"}
        type_value={character.stats.cunning.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Discreet"}
        type_value={character.stats.discreet.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Persuasive"}
        type_value={character.stats.persuasive.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Quick"}
        type_value={character.stats.quick.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Resolute"}
        type_value={character.stats.resolute.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Strong"}
        type_value={character.stats.strong.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Vigilant"}
        type_value={character.stats.vigilant.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
      <StatBox
        type_name={"Accurate"}
        type_value={character.stats.accurate.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
      />
    </Container>
  );
}

export default StatsControls;
