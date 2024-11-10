import * as React from "react";
import Box from "@mui/material/Box";
import { Slider, Input } from "@mui/material/";
import Chip from "../images/chip.png";

function InputWindows({ title, sliderValue, handleSliderChange }) {
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
    width: "200px",
    height: "100px",
    minHeight: "100px",
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
        max={1000}
        sx={{
          color: "#00bfa5",
          width: "180px",
          height: "10px",
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
      <div style={titleStyle}>
        Value:
        <Input
          value={sliderValue}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          sx={{
            color: "#fff",
            width: "50px",
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

export default InputWindows;
