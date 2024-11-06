import React from "react";

function ChooseCard({ onSelect, onClose, cardKey }) {
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
    },
    content: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      position: "relative",
      maxHeight: "80vh",
      overflowY: "auto",
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
    image: {
      width: "100%",
      height: "auto",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "transform 0.2s",
    },
  };

  const importAll = (r) => r.keys().map(r);
  const allCardImages = importAll(
    require.context("../images/PNG-cards-1.3", false, /\.(png|jpe?g|svg)$/),
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.content} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Choose Card</h2>
        <div style={styles.imageGrid}>
          {allCardImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`card-${index}`}
              style={styles.image}
              onClick={() => onSelect(image, cardKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseCard;
