import './App.css';
import Card from './components/Card';
import ChooseCard from './components/ChooseCard';
import InputWindows from './components/InputWindows';
import { useState } from 'react';

const importAll = (r) => r.keys().map(r);
const cardImages = importAll(require.context('./images/PNG-cards-1.3', false, /\.(png|jpe?g|svg)$/));

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleCardClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="App">
      <div className="card-container">
        <Card image={cardImages[0]} onCardClick={handleCardClick} />
        <Card image={cardImages[1]} onCardClick={handleCardClick} />
        <Card image={cardImages[2]} onCardClick={handleCardClick} />
        <Card image={cardImages[3]} onCardClick={handleCardClick} />
        <Card image={cardImages[4]} onCardClick={handleCardClick} />
      </div>
      <div className="card-container" style={{ position: 'absolute', top: '470px' }}>
        <Card onCardClick={handleCardClick} />
        <Card onCardClick={handleCardClick} />
      </div>
      <div style={{ position: 'absolute', left: '220px' }}>
        <InputWindows />
      </div>

      {isPopupVisible && (
        <ChooseCard images={cardImages} onClose={closePopup}>
          <h2>Choose Card</h2>

        </ChooseCard>
      )}
    </div>
  );
}

export default App;
