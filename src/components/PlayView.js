import "./PlayView.css";
import Card from "./Card";
import ChooseCard from "./ChooseCard";
import InputWindows from "./InputWindows";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import opponent_avatar from '../images/avatar/opponent.png'
import my_avatar from '../images/avatar/you.jpg'

const avatar_size = 70;
function PlayView() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const [river, setRiver] = useState([null, null, null, null, null]);
    const [hole, setHole] = useState([null, null]);

    const [selectedCard, setSelectedCard] = useState("");

    const chooseCardImage = (image, key) => {
        const index = parseInt(key.split("-")[1], 10);

        if (key.includes("river")) {
            setRiver((prevImages) => setNewImage(prevImages, index, image));
        } else if (key.includes("hole")) {
            setHole((prevImages) => setNewImage(prevImages, index, image));
        }
        setIsPopupVisible(false);
    };

    return (
        <div className="PlayView">
            <div className="card-container"
                 style={{
                     display: 'flex',
                     justifyContent: 'center',
                     gap: '10px'
                 }}>                {river.map((image, index) => (
                <Card
                    key={"river-" + index}
                    image={image}
                    onCardClick={() => {
                        setIsPopupVisible(true);
                        setSelectedCard("river-" + index);
                    }}
                />
            ))}
            </div>
            <div className="card-container" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                position: 'absolute',
                top: '470px',
                alignItems: 'center',
            }}>
                <Avatar alt="You" src={my_avatar} sx={{width: avatar_size, height: avatar_size}}/>

                {hole.map((image, index) => (
                    <Card
                        key={"hole" + index}
                        image={image}
                        onCardClick={() => {
                            setIsPopupVisible(true);
                            setSelectedCard("hole-" + index);
                        }}
                    />
                ))}
            </div>
            <div style={{position: 'absolute', left: '25vw'}}>
                <InputWindows/>
            </div>

            <div style={{position: 'absolute', right: '5vw'}}>
                <Avatar alt="Opponent" src={opponent_avatar} sx={{width: avatar_size, height: avatar_size}}/>
            </div>
            {isPopupVisible && (
                <ChooseCard
                    cardKey={selectedCard}
                    onSelect={chooseCardImage}
                    onClose={() => {
                        setIsPopupVisible(false);
                        setSelectedCard("");
                    }}
                />
            )}
        </div>
    );
}

export default PlayView;

const setNewImage = (prevImages, index, image) => {
    const newImages = [...prevImages];
    newImages[index] = image;
    return newImages;
};
