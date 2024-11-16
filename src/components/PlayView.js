import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import SliderCard from "./SliderCard";
import { useEffect, useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { Stack, Avatar } from "@mui/material";
import { calculateEquity, validCardNumberAndSuit } from "../logic/equity.ts";
import { calculatePotOdds, shouldCall } from "../logic/pot-odds.ts";
import { calculateExpectedValue } from "../logic/expected-value.ts";

const avatar_size = 110;
export function PlayView({
  getPotOdds,
  getEquity,
  getDecision,
  getExpectedValue,
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [potValue, setPotValue] = useState(20);
  const [opponentCall, setOpponentCall] = useState(20);

  const [river, setRiver] = useState(["", "", "", "", ""]);
  const [hole, setHole] = useState(["", ""]);

  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    const n =
      river.filter(validCardNumberAndSuit).length +
      hole.filter(validCardNumberAndSuit).length;

    if (n >= 5) {
      // Calculate values
      const potOdds = calculatePotOdds({ potValue, opponentCall });
      getPotOdds(potOdds);
      const equity = calculateEquity({ hole, river });
      getEquity(equity);
      const decision = shouldCall(equity, potOdds);
      getDecision(decision);
      const expectedValue = calculateExpectedValue({
        equity,
        opponentCall,
        potValue,
      });
      getExpectedValue(expectedValue);
    }
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
            key={"river-" + index}
            image={image}
            onCardClick={() => {
              setIsPopupVisible(true);
              setSelectedCard("river-" + index);
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
            key={"hole" + index}
            image={image}
            onCardClick={() => {
              setIsPopupVisible(true);
              setSelectedCard("hole-" + index);
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

      <div style={{ position: "absolute", left: "43vw", top: "23vh" }}>
        <SliderCard
          title={"Total Pot"}
          sliderValue={potValue}
          handleSliderChange={(event, value) => setPotValue(value)}
        />
      </div>

      <div style={{ position: "absolute", right: "21vw", top: "23vh" }}>
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
