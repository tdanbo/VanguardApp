interface RollProps {
  dice: string;
  count: number;
  modifier: number;
}

function Roll({ dice, count, modifier }: RollProps) {
  const diceToNumber = dice.match(/d(\d+)/);
  console.log(diceToNumber);
}

export default Roll;
