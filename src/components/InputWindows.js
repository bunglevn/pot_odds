import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

function InputWindows() {
    const [sliderValue, setSliderValue] = useState(20);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const WindowStyle = {
        width: '200px',
        height: '100px',
        minHeight: '100px',
        backgroundColor: '#740938',
        borderRadius: '5px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'block', // Change to block for stacking
        padding: '10px', // Add padding for better spacing
    };

    const TitleStyle = {
        color: '#fff',
        marginBottom: '5px',
        fontSize: '19px',
        textAlign: 'center',
        fontFamily: '"Arial", sans-serif',
    };

    const PrettoSlider = styled(Slider)(({ theme }) => ({
        color: '#52af77',
        height: 14,
        width: '100%', // Full width of the parent container
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&::before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#52af77',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&::before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        }
    }));

    return (
        <Box style={WindowStyle}>
            <div style={TitleStyle}>Pots</div>
            <PrettoSlider
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-label="pretto slider"
            />
            <div style={TitleStyle}>Value: {sliderValue}</div> {/* Display the current value */}
        </Box>
    );
}

export default InputWindows;
