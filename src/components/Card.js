import React, { useState } from 'react';

function Card({ image }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  const cardStyle = {
    width: '105px',
    height: '150px',
    minHeight: '150px',
    backgroundColor: '#808080',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    opacity: isHovered ? 1 : 0.6, // Change opacity based on hover status
    transition: 'opacity 0.3s ease', // Smooth transition for opacity
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)} // Set to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set to false on mouse leave
    ></div>
  );
}

export default Card;