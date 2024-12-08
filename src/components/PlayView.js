import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { useTheme } from "@mui/material";
import { calculateEquity } from "../logic/equity.ts";
import { calculatePotOdds, shouldCall } from "../logic/pot-odds.ts";
import { calculateExpectedValue } from "../logic/expected-value.ts";
import { validCardNumberAndSuit } from "../logic/utils.ts";

export function PlayView({
  getPotOdds,
  getEquity,
  getDecision,
  getExpectedValue,
  getOpponentCall,
  getPotValue,
  getNHole,
  getNRiver,
  className,
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [potValue, setPotValue] = useState(20);
  const [opponentCall, setOpponentCall] = useState(20);
  const [river, setRiver] = useState(["", "", "", "", ""]);
  const [hole, setHole] = useState(["", ""]);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    const nRiver = river.filter(validCardNumberAndSuit).length;
    const nHole = hole.filter(validCardNumberAndSuit).length;
    const n = nRiver + nHole;

    if (n >= 5) {
      // Calculate values
      const potOdds = calculatePotOdds({ potValue, opponentCall });
      const equityResult = calculateEquity({ hole, river });
      getEquity(equityResult);
      const equity = equityResult.equity;
      const decision = shouldCall(equity, potOdds);
      getDecision(decision);
      const expectedValue = calculateExpectedValue({
        equity,
        opponentCall,
        potValue,
      });
      getExpectedValue(expectedValue);
      getPotOdds(potOdds);
      getOpponentCall(opponentCall);
      getPotValue(potValue);
    }
    getNRiver(nRiver);
    getNHole(nHole);
  }, [hole, river, potValue, opponentCall]);

  const chooseCardImage = (image, key) => {
    const index = parseInt(key.split("-")[1], 10);

    if (key.includes("river")) {
      setRiver((prevImages) => setNewImage(prevImages, index, image));
    } else if (key.includes("hole")) {
      setHole((prevImages) => setNewImage(prevImages, index, image));
    }
    setIsPopupVisible(false);
  };

  return (
    <div className={className + " PlayView"}>
      <div className="absolute top-[24%] grid grid-cols-2 gap-4 w-5/12 md:w-6/12">
        <SliderCard
          title={"Total Pot"}
          sliderValue={potValue}
          handleSliderChange={(event, value) => setPotValue(value)}
        />
        <SliderCard
          title={"Opponent's Call"}
          sliderValue={opponentCall}
          handleSliderChange={(event, value) => setOpponentCall(value)}
        />
      </div>
      <div className="grid grid-cols-5 place-items-center w-7/12 items-center absolute xl:top-[38%] top-[40%] flex-row gap-2 h-[40px] md:h-[10vw]">
        {river.map((image, index) => (
          <Card
            className="w-[30px] max-w-[100px] h-full md:w-[7vw]"
            removable={
              index === 4 || (river[index] !== "" && river[index + 1] === "")
            }
            disabled={index !== 0 && river[index - 1] === ""}
            key={"river-" + index}
            image={river[index] !== "" ? image : undefined}
            onCardClick={() => {
              setIsPopupVisible(true);
              setSelectedCard("river-" + index);
            }}
            onRemove={() => {
              setRiver((prevImages) => removeImage(prevImages, index));
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 place-items-center w-1/4 items-center absolute md:top-[64%] xl:top-[61%] top-[62%] flex-row h-[40px] md:h-[10vw]">
        {hole.map((image, index) => (
          <Card
            className="h-full w-[30px] md:w-[7vw]"
            removable={
              index === 1 || (hole[index] !== "" && hole[index + 1] === "")
            }
            disabled={index !== 0 && hole[index - 1] === ""}
            key={"hole" + index}
            image={image}
            onCardClick={() => {
              setIsPopupVisible(true);
              setSelectedCard("hole-" + index);
            }}
            onRemove={() => {
              setHole((prevImages) => removeImage(prevImages, index));
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-0.5 w-8 h-8 sm:w-8 sm:h-8 md:w-16 md:h-16 lg:w-32 lg:h-32"
        style={{ borderRadius: "50%", background: "none" }}
      >
        <img
          className="w-full h-full"
          src={my_avatar}
          style={{ borderRadius: "50%" }}
        />
      </div>

      {isPopupVisible && (
        <ChooseCard
          chosenCards={river.concat(hole)}
          cardKey={selectedCard}
          onSelect={chooseCardImage}
          onClose={() => {
            setIsPopupVisible(false);
            setSelectedCard("");
          }}
        />
      )}
    </div>
  );
}

const setNewImage = (prevImages, index, image) => {
  const newImages = [...prevImages];
  newImages[index] = image;
  return newImages;
};

const removeImage = (prevImages, indexToDrop) => {
  const newImages = [...prevImages];
  newImages[indexToDrop] = "";
  return newImages;
};
