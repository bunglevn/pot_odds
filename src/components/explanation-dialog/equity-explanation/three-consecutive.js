import { StaticMathField } from "react-mathquill";

export const ThreeConsecutive = () => {
  return (
    <div className="overflow-scroll">
      <StaticMathField>
        {`P(\\text{Straight}) = P(\\text{Both card 4 and card 5 are in the Straight})`}
      </StaticMathField>
      <StaticMathField>
        {`=P(\\text{Both cards are start of straight}) + P(\\text{Both cards are end of straight}) + P(\\text{Card 4 is start of Straight})*P(\\text{Card 5 is end of Straight}) +  P(\\text{Card 4 is end of Straight})*P(\\text{Card 5 is start of Straight})`}
      </StaticMathField>
      <StaticMathField>
        {`=\\frac{4}{52-5}*\\frac{4}{52-5-1} + \\frac{4}{52-5}*\\frac{4}{52-5-1} + \\frac{4}{52-5}*\\frac{4}{52-5-1} + \\frac{4}{52-5}*\\frac{4}{52-5-1}`}
      </StaticMathField>
      <StaticMathField>{`= 4*\\frac{4}{47}\\frac{4}{46}`}</StaticMathField>
      <StaticMathField>{`= 0.0296`}</StaticMathField>
    </div>
  );
};
