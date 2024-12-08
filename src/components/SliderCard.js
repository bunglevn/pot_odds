import * as React from "react";
import { Slider } from "@mui/material/";
import Chip from "../images/chip.png";
import { useMediaQuery, useTheme } from "@mui/material";

function SliderCard({ title, sliderValue, handleSliderChange }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="flex flex-col px-2 md:px-4 pt-1 md:pt-3 pb-2 md:pb-4 xl:pb-6"
      style={{
        backgroundColor: "#eb2225",
        borderRadius: "5px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span
        className="text-[6px] mb-1 md:mb-2 md:text-xs xl:text-xl"
        style={{
          color: "#fff",
          textAlign: "center",
          fontFamily: '"Arial", sans-serif',
        }}
      >
        {title} : {sliderValue}
      </span>
      <Slider
        valueLabelDisplay="auto"
        size={!isSmallScreen ? "medium" : "small"}
        value={sliderValue}
        onChange={handleSliderChange}
        max={10000}
        sx={{
          color: "#00bfa5",
          "& .MuiSlider-thumb": {
            width: isSmallScreen ? 10 : 20,
            height: isSmallScreen ? 10 : 20,
            backgroundImage: `url(${Chip})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "50%",
            border: "2px solid #fff",
          },
        }}
        aria-labelledby={`${title}-slider`}
      />
    </div>
  );
}

export default SliderCard;
