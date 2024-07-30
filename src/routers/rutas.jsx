import { Routes, Route, Navigate } from 'react-router-dom';
import Authentication from '../controllers/Autentication';
import Consejos from '../controllers/Consejos';
import Sugerencias from '../controllers/Sugerencias';
import NavBar from '../controllers/NavBar';
import GenerateWeeks from '../controllers/GenerateWeeks';

const Rutas = () => {
    return (
      <Routes>
        <Route path="https://casilimas.github.io/Rotacion-Auxiliares/" element={<Navigate to="https://casilimas.github.io/Autentication" replace />} /> 
        <Route path="/Autentication" element={<Authentication />} />
        <Route path="/Consejos" element={<Consejos />} />
        <Route path="/Sugerencias" element={<Sugerencias />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/generate-weeks" element={<GenerateWeeks />} />
      </Routes>
    );
};
  
export default Rutas;
