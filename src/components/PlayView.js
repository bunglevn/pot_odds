import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import InputWindows from "./InputWindows";
import { useState } from "react";
import my_avatar from "../images/avatar/you.jpg";
import { Stack, Avatar } from "@mui/material";

const avatar_size = 90;
function PlayView() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [river, setRiver] = useState(["", "", "", "", ""]);
    const [hole, setHole] = useState(["", ""]);

  const [selectedCard, setSelectedCard] = useState("");

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
        <InputWindows title={"Total Pot"} />
      </div>

      <div style={{ position: "absolute", right: "5vw" }}>
          <InputWindows title={"Opponent's Call Value"} />
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

export default PlayView;

const setNewImage = (prevImages, index, image) => {
  const newImages = [...prevImages];
  newImages[index] = image;
  return newImages;
};
