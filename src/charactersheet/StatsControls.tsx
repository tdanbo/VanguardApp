import { useState } from "react";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../Types";
import StatBox from "../components/StatsControls/StatBox";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

interface StatsControlsProps {
  character: CharacterEntry;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
}

function StatsControls({
  character,
  session,
  websocket,
  isCreature,
}: StatsControlsProps) {
  const [swapSource, setSwapSource] = useState<null | string>(null);
  return (
    <Container>
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Cunning"}
        type_value={character.stats.cunning.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Discreet"}
        type_value={character.stats.discreet.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Persuasive"}
        type_value={character.stats.persuasive.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Quick"}
        type_value={character.stats.quick.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Resolute"}
        type_value={character.stats.resolute.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Strong"}
        type_value={character.stats.strong.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Vigilant"}
        type_value={character.stats.vigilant.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
      <StatBox
        character={character}
        session={session}
        websocket={websocket}
        type_name={"Accurate"}
        type_value={character.stats.accurate.value}
        swapSource={swapSource}
        setSwapSource={setSwapSource}
        isCreature={isCreature}
      />
    </Container>
  );
}

export default StatsControls;
