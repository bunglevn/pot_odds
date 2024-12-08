import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Input } from "@mui/material/";
import Chip from "../images/chip.png";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

function SliderCard({ title, sliderValue, handleSliderChange }) {
  const handleInputChange = (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    handleSliderChange(value);
  };

  const handleBlur = () => {
    if (sliderValue < 0) {
      handleSliderChange(0);
    } else if (sliderValue > 1000) {
      handleSliderChange(1000);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const titleStyle = {
    color: "#fff",
    fontSize: isSmallScreen ? "6px" : "13px",
    textAlign: "center",
    fontFamily: '"Arial", sans-serif',
  };

  return (
    <div
      className="flex flex-col lg:w-[220px] md:w-[200px] md:h-[60px] h-[35px]"
      style={{
        backgroundColor: "#eb2225",
        borderRadius: "5px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "2px 8px",
      }}
    >
      <span className="lg:text-sm text-[10px] mb-2" style={titleStyle}>
        {title}
      </span>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        max={10000}
        sx={{
          color: "#00bfa5",
          marginBottom: !isSmallScreen ? "8px" : "6px",
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
      <div style={titleStyle} className="w-full text-x flex flex-row">
        <Typography sx={{ fontSize: isSmallScreen ? "6px" : "10px" }}>
          {" "}
          Value:{" "}
        </Typography>
        <Input
          value={sliderValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          sx={{
            color: "#fff",
            width: "70%",
            fontSize: isSmallScreen ? "6px" : "10px",
          }}
          inputProps={{
            step: 5,
            min: 0,
            max: 1000,
            type: "number",
            "aria-labelledby": `${title}-input`,
          }}
        />
      </div>
    </div>
  );
}

export default SliderCard;
