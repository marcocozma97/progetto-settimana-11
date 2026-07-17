import Sidebar from './components/Sidebar';
import MainSection from './components/MainSection';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="app-container d-flex flex-column flex-md-row">
      <Sidebar />
      <MainSection />
      <Player />
    </div>
  );
}

export default App;