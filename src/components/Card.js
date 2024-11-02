import React, { useState } from 'react';

function Card({ image, onCardClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: '105px',
    height: '150px',
    minHeight: '130px',
    backgroundColor: '#808080',
    borderRadius: '8px',
    boxShadow: isHovered ? '0px 8px 12px rgba(0, 0, 0, 0.3)' : '0px 4px 8px rgba(0, 0, 0, 0.2)',
    opacity: isHovered ? 1 : 0.8,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer', // Indicate clickable element
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCardClick} // Trigger the popup on click
    ></div>
  );
}

export default Card;
