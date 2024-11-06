export function calculatePotOdds({
  potValue,
  opponentCall,
}: {
  potValue: number;
  opponentCall: number;
}) {
  return (opponentCall * 100) / potValue;
}

export function shouldCall(equity: number, potOdds: number) {
  if (equity >= potOdds) return true;
  return false;
}
