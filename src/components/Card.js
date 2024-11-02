import React, { useState } from 'react';

function Card({ image }) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  const cardStyle = {
    width: '105px', // Base width for small screens
    height: '150px',
    minHeight: '130px',
    backgroundColor: '#808080',
    borderRadius: '8px',
    boxShadow: isHovered ? '0px 8px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 8px rgba(0, 0, 0, 0.2)', // More shadow on hover
    opacity: isHovered ? 1 : 0.8, // Change opacity based on hover status
    transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Slight scale on hover
    transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for effects
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'cover',
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
