import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { Avatar, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
      <div className="flex flex-col sm:gap-1 space-y-2 h-full lg:mt-44 md:mt-28 items-center">
        <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
          <SliderCard
            title={"Total Pot"}
            sliderValue={potValue}
            handleSliderChange={(event, value) => setPotValue(value)}
          />
          {isSmallScreen && <div></div>}
          <SliderCard
            title={"Opponent's Call"}
            sliderValue={opponentCall}
            handleSliderChange={(event, value) => setOpponentCall(value)}
          />
        </div>
        <div className="flex items-center flex-row gap-2">
          {river.map((image, index) => (
            <Card
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
        <div className="flex items-center flex-row gap-2">
          {hole.map((image, index) => (
            <Card
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

        <Avatar
          alt="You"
          src={my_avatar}
          sx={{ width: "6vw", height: "6vw" }}
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
