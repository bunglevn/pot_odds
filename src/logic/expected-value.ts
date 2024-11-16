export const calculateExpectedValue = ({
  equity,
  opponentCall,
  potValue,
}: {
  readonly equity: number;
  readonly opponentCall: number;
  readonly potValue: number;
}) => {
  const equityPercent = equity / 100;
  const expectedWin = equityPercent * (opponentCall + potValue);
  const expectedLose = (1 - equityPercent) * opponentCall;
  return expectedWin - expectedLose;
};
