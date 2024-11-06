import * as React from "react";
import Box from "@mui/material/Box";
import {Slider, Input} from "@mui/material/";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Chip from '../images/chip.png'

function InputWindows({ title }) {
  const [sliderValue, setSliderValue] = useState(20);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleInputChange = (event) => {
    setSliderValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (sliderValue < 0) {
      setSliderValue(0);
    } else if (sliderValue > 100) {
      setSliderValue(100);
    }
  };

  const WindowStyle = {
    width: "200px",
    height: "100px",
    minHeight: "100px",
    backgroundColor: "#740938",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    display: "block", // Change to block for stacking
    padding: "10px", // Add padding for better spacing
  };

  const TitleStyle = {
    color: "#fff",
    marginBottom: "5px",
    fontSize: "19px",
    textAlign: "center",
    fontFamily: '"Arial", sans-serif',
  };

  return (
    <Box style={WindowStyle}>
      <div style={TitleStyle}> {title}</div>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        max={1000}
        sx={{
          fontColor: "#fff",
          color: "#00bfa5",
          width: "180px",
          height: "10px",
          '& .MuiSlider-thumb': {
            width: 25, // Set thumb width
            height: 25, // Set thumb height
            backgroundImage: `url(${Chip})`,
            backgroundSize: 'cover', // Ensure the image covers the thumb fully
            backgroundRepeat: 'no-repeat', // Prevent the image from repeating
            borderRadius: '50%', // Optional, if you want a circular thumb
            border: '2px solid #fff', // Add a border to the thumb
          },
        }}
      />
      <div style={TitleStyle}>Value:
        <Input
            value={sliderValue}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            sx={{
              fontColor: "#fff", // Set background color to white
              color: "#fff", // Set font color
              width: "50px",
            }}
            color="success"
            inputProps={{
              step: 5,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
        />
      </div>
      {/* Display the current value */}
    </Box>
  );
}

export default InputWindows;
