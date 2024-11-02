import './App.css';
import Card from './components/Card';
import clubs2 from './images/PNG-cards-1.3/2_of_clubs.png';
import InputWindows from './components/InputWindows';

function App() {
  return (
    <div className="App">
      <div className="card-container">
        <Card image={clubs2}/>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="card-container" style={{ position: 'absolute', top: '470px'}}>
        <Card />
        <Card />
      </div>
      <div style={{ position: 'absolute', left: '220px'}}>
        <InputWindows />
      </div>
    </div>
  );
}

export default App;
