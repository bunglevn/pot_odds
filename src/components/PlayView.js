import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import SliderCard from "./SliderCard";
import { useEffect, useRef, useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { Stack, Avatar } from "@mui/material";
import { calculateEquity } from "../logic/equity.ts";
import { calculatePotOdds, shouldCall } from "../logic/pot-odds.ts";
import { calculateExpectedValue } from "../logic/expected-value.ts";
import { validCardNumberAndSuit } from "../logic/utils.ts";

const avatar_size = 110;
export function PlayView({
  getPotOdds,
  getEquity,
  getDecision,
  getExpectedValue,
  getOpponentCall,
  getPotValue,
  getNHole,
  getNRiver,
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
    <div className="PlayView" style={{ borderRadius: "10px" }}>
      <div
        className="card-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {" "}
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
      <div
        className="card-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          position: "absolute",
          top: "61vh",
          alignItems: "center",
        }}
      >
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

      <div style={{ position: "absolute", bottom: "1vh" }}>
        <Avatar
          alt="You"
          src={my_avatar}
          sx={{ width: avatar_size, height: avatar_size }}
        />
      </div>

      <div
        className="w-[230px]"
        style={{ position: "absolute", left: "43vw", top: "23vh" }}
      >
        <SliderCard
          title={"Total Pot"}
          sliderValue={potValue}
          handleSliderChange={(event, value) => setPotValue(value)}
        />
      </div>

      <div
        className="w-[230px]"
        style={{ position: "absolute", right: "21vw", top: "23vh" }}
      >
        <Stack direction="column" spacing={2} alignItems="flex-end">
          <SliderCard
            title={"Opponent's Call Value"}
            sliderValue={opponentCall}
            handleSliderChange={(event, value) => setOpponentCall(value)}
          />
        </Stack>
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
