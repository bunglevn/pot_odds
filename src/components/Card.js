import React, { useState } from "react";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";

function Card({ image, onCardClick, onRemove, disabled, removable }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyle = {
    position: "relative",
    backgroundColor: "#808080",
    borderRadius: "5px",
    boxShadow: isHovered
      ? "0px 8px 12px rgba(0, 0, 0, 0.3)"
      : "0px 4px 8px rgba(0, 0, 0, 0.2)",
    opacity: isHovered ? 1 : 0.8,
    transform: !disabled && isHovered ? "scale(1.05)" : "scale(1)",
    transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
    backgroundImage: image ? `url(${image})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    cursor: "pointer", // Indicate clickable element
  };

  return (
    <div
      className="w-[6vw] h-[9vw]"
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {isHovered && (
        <div
          className="flex text-center items-center"
          style={{
            color: disabled ? "rgb(253 186 116)" : "white",
            transition: "background-color 0.3s ease",
            fontWeight: "bold",
            backdropFilter: image && "brightness(50%)",
            height: "100%",
            width: "100%",
            textTransform: "none",
            borderRadius: "5px",
          }}
          onClick={(e) => {
            if (removable && image) {
              e.stopPropagation();
              onRemove();
              return;
            }

            if (!disabled) onCardClick();
          }}
        >
          <Typography sx={{ fontSize: isSmallScreen ? "6px" : "10px" }}>
            {image && removable && "Click to remove"}
            {disabled && "Please choose the previous card first"}
            {!disabled && !image && "Click to add"}
            {image && !removable && "Click to change"}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default Card;
