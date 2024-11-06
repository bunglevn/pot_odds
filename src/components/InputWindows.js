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

  const PrettoSlider = styled(Slider)(({ theme }) => ({
    color: "#52af77",
    height: 14,
    width: "90%", // Full width of the parent container
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 30,
      width: 30,
      backgroundImage: `url(${Chip})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      border: 'none'
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  }));

  return (
    <Box style={WindowStyle}>
      <div style={TitleStyle}> {title}</div>
      <PrettoSlider
        value={sliderValue}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        max={1000}
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
            color="warning"
            fontColor="#123456"
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
