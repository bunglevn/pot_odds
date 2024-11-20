import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Input } from "@mui/material/";
import Chip from "../images/chip.png";
import { Typography } from "@mui/material";

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

  const windowStyle = {
    width: "100%",
    backgroundColor: "#eb2225",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "10px",
  };

  const titleStyle = {
    color: "#fff",
    marginBottom: "5px",
    fontSize: "19px",
    textAlign: "center",
    fontFamily: '"Arial", sans-serif',
  };

  return (
    <Box sx={windowStyle}>
      <div style={titleStyle}>{title}</div>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        max={10000}
        sx={{
          color: "#00bfa5",
          "& .MuiSlider-thumb": {
            width: 25,
            height: 25,
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
        <Typography> Value: </Typography>
        <Input
          value={sliderValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          sx={{
            color: "#fff",
            width: "70%",
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
    </Box>
  );
}

export default SliderCard;
