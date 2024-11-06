import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import InputWindows from "./InputWindows";
import { useEffect, useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { Stack, Avatar } from "@mui/material";
import { calculateEquity } from "../logic/equity.ts";
import { calculatePotOdds, shouldCall } from "../logic/pot-odds.ts";

const avatar_size = 90;
export function PlayView({getPotOdds}) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [potValue, setPotValue] = useState(20);
  const [opponentCall, setOpponentCall] = useState(20);

  const [river, setRiver] = useState(["", "", "", "", ""]);
  const [hole, setHole] = useState(["", ""]);

  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    // Calculate values
    const potOdds = calculatePotOdds({ potValue, opponentCall });
    getPotOdds(potOdds)
    const equity = calculateEquity({ hole, river });
    const decision = shouldCall(equity, potOdds);
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

      <div style={{ position: "absolute", left: "25vw" }}>
        <InputWindows
          title={"Total Pot"}
          sliderValue={potValue}
          handleSliderChange={(event, value) => setPotValue(value)}
        />
      </div>

      <div style={{ position: "absolute", right: "5vw" }}>
        <Stack direction="column" spacing={2} alignItems="flex-end">
          {/*<TextField*/}
          {/*    id="filled-basic"*/}
          {/*    label="Opponent's Raise"*/}
          {/*    variant="filled"*/}
          {/*    sx={{ width: '180px' }}*/}
          {/*    InputProps={{*/}
          {/*        style: { fontSize: '1rem' }*/}
          {/*    }}*/}
          {/*    InputLabelProps={{*/}
          {/*        style: {fontSize: '1.1rem'}*/}
          {/*    }}*/}
          {/*/>*/}
          <InputWindows
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
