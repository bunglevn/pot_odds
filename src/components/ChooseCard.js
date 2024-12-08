import React from "react";
import { Typography } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ChooseCard({ onSelect, onClose, cardKey, chosenCards }) {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
    },
    imageGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "10px",
      marginTop: "20px",
    },
  };

  const importAll = (r) => r.keys().map(r);
  const allCardImages = importAll(
    require.context("../images/PNG-cards-1.3", false, /\.(png|jpe?g|svg)$/),
  );

  const rankOrder = {
    ace: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    jack: 11,
    queen: 12,
    king: 13,
  };

  // Function to extract rank and suit from the file name
  const extractRank = (filename) => {
    const match = filename.match(/(\w+)_of_\w+/);
    return match ? match[1] : null;
  };

  // Sort the array based on the extracted rank
  allCardImages.sort((a, b) => {
    const rankA = extractRank(a).toLowerCase();
    const rankB = extractRank(b).toLowerCase();
    return rankOrder[rankA] - rankOrder[rankB];
  });

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ background: "white", borderRadius: "8px" }}
        className="overflow-auto p-4 relative max-h-[90vh] w-[80%] lg:w-[40vw] md:w-[40%]"
        onClick={(e) => e.stopPropagation()}
      >
        <button style={styles.closeButton} onClick={onClose}>
          X
        </button>
        <Typography variant="h5"> Choose card </Typography>
        <br />
        <div className="grid grid-cols-4 gap-4">
          {allCardImages.map((image, index) => (
            <div className="relative" key={index}>
              <LazyLoadImage
                src={image}
                alt={`card-${index}`}
                effect="opacity"
                style={{
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transition: "transform 0.2s",
                  filter: chosenCards.includes(image) && "brightness(0.5)",
                }}
                onClick={() => {
                  if (chosenCards.includes(image)) {
                    return;
                  }
                  onSelect(image, cardKey);
                }}
              />
              {chosenCards.includes(image) && (
                <span className="text-[6px] md:text-xs xl:text-base absolute top-0 left-0 h-full w-full text-white font-bold flex items-center justify-center">
                  This card has already been selected
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseCard;
