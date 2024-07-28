
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../src/controllers/NavBar';
import Rutas from '../src/routers/rutas';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Rutas />
      </div>
    </Router>
  );
}

export default App;
