import './App.css';
import Card from './components/Card';
import ChooseCard from './components/ChooseCard';
import InputWindows from './components/InputWindows';
import { useState } from 'react';

const importAll = (r) => r.keys().map(r);
const allCardImages = importAll(require.context('./images/PNG-cards-1.3', false, /\.(png|jpe?g|svg)$/));

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [cardImages, setCardImages] = useState([null, null, null, null, null, null, null]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

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
    <div className="App">
      <div className="card-container">
        {cardImages.slice(0, 5).map((image, index) => (
          <Card
            key={index}
            image={image}
            onCardClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <div className="card-container" style={{ position: 'absolute', top: '470px' }}>
        {cardImages.slice(5).map((image, index) => (
          <Card
            key={index + 5}
            image={image}
            onCardClick={() => handleCardClick(index + 5)}
          />
        ))}
      </div>
      <div style={{ position: 'absolute', left: '15%' }}>
        <InputWindows />
      </div>

      {isPopupVisible && (
        <ChooseCard images={allCardImages} onSelect={chooseCardImage} onClose={closePopup} />
      )}
    </div>
  );
}

export default App;
