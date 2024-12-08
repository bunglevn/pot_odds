import { StaticMathField } from "react-mathquill";

export const FourSameSuitExplanation = ({ numCard }) => {
  if (numCard === 6)
    return (
      <StaticMathField>
        {`P(Flush) = P(\\text{Last card is as the same suit}) 
        = \\frac{\\text{Number of cards left with the same suit}}{\\text{Number of cards left}}
        = \\frac{13-4}{52-6} = \\frac{9}{47} = 0.19`}
      </StaticMathField>
    );

  if (numCard === 5)
    return (
      <div className="overflow-scroll">
        <StaticMathField>{`P(Flush)`}</StaticMathField>
        <StaticMathField>
          {`= P(\\text{Card 4 has the same suit}) + P(\\text{Card 4 has a different suit})P(\\text{Card 5 has the same suit})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{\\text{Number of cards left with the same suit}}{\\text{Number of cards left}} + \\frac{\\text{Number of cards left with different suits}}{\\text{Number of cards left}}\\frac{\\text{Number of cards left with the same suit}}{\\text{Number of cards left} - 1}`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{13-4}{52-5} + \\frac{52-5-(13-4)}{52-5}\\frac{13-4}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{9}{47} + \\frac{38}{47}\\frac{9}{46}`}
        </StaticMathField>
        <StaticMathField>{`= 0.35`}</StaticMathField>
      </div>
    );
};
