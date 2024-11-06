import React, { useState } from "react";
import Card from "./Card";
import InputWindows from "./InputWindows";
import ChooseCard from "./ChooseCard";
import './PlayView.css'
import Avatar from '@mui/material/Avatar';
import opponent_avatar from '../images/avatar/opponent.png'
import my_avatar from '../images/avatar/you.jpg'

const importAll = (r) => r.keys().map(r);

const avatar_size = 70;

function PlayView() {
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const allCardImages = importAll(require.context('../images/PNG-cards-1.3', false, /\.(png|jpe?g|svg)$/));
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [cardImages, setCardImages] = useState([null, null, null, null, null, null, null]);

    const handleCardClick = (index) => {
        setSelectedCardIndex(index);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const chooseCardImage = (image) => {
        setCardImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[selectedCardIndex] = image;
            return newImages;
        });
        closePopup();
    };

    return (
        <div className = "PlayView">
            {/* Centered container for the first 5 cards */}
            <div className="card-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {cardImages.slice(0, 5).map((image, index) => (
                    <Card
                        key={index}
                        image={image}
                        onCardClick={() => handleCardClick(index)}
                    />
                ))}
            </div>

            {/* Positioned container for the remaining cards */}
            <div className="card-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', position: 'absolute', top: '470px', alignItems: 'center',}}>
                <Avatar alt="You" src={my_avatar} sx={{ width: avatar_size, height: avatar_size }}/>

                {cardImages.slice(5).map((image, index) => (
                    <Card
                        key={index + 5}
                        image={image}
                        onCardClick={() => handleCardClick(index + 5)}
                    />
                ))}
            </div>

            {/* Positioned InputWindows component */}
            <div style={{ position: 'absolute', left: '25vw'}}>
                <InputWindows />
            </div>

            <div style={{position: 'absolute', right: '5vw'}}>
                <Avatar alt="Opponent" src={opponent_avatar} sx={{ width: avatar_size, height: avatar_size }}/>
            </div>

            {/* Popup for selecting cards */}
            {isPopupVisible && (
                <ChooseCard images={allCardImages} onSelect={chooseCardImage} onClose={closePopup} />
            )}
        </div>
    );
}

export default PlayView;
