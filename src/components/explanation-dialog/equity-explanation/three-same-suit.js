import { StaticMathField } from "react-mathquill";

export const ThreeSameSuit = () => {
  return (
    <div className="overflow-scroll">
      <StaticMathField>
        {`P(\\text{Flush}) = P(\\text{Both card 4 and 5 have the same suit})`}
      </StaticMathField>
      <StaticMathField>
        {`= P(\\text{Card 4 has the same suit})P(\\text{Card 5 has the same suit})`}
      </StaticMathField>
      <StaticMathField>
        {`= \\frac{\\text{Number of remaing cards with the same suit}}{\\text{Number of remaining cards}}\\frac{\\text{Number of remaining cards with the same suit} - 1}{\\text{Number of remaining cards}-1}`}
      </StaticMathField>
      <StaticMathField>
        {`= \\frac{13-3}{52-5}\\frac{13-4}{52-5-1}`}
      </StaticMathField>
      <StaticMathField>{`= \\frac{10}{47}\\frac{9}{46}`}</StaticMathField>
      <StaticMathField>{`= 0.04`}</StaticMathField>
    </div>
  );
};
