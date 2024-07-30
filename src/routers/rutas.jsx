import { Routes, Route } from 'react-router-dom';
import Authentication from '../controllers/Autentication';
import Consejos from '../controllers/Consejos';
import Sugerencias from '../controllers/Sugerencias';
import NavBar from '../controllers/NavBar';
import GenerateWeeks from '../controllers/GenerateWeeks';
import RedirectToExternal from '../controllers/RedirectToExternal';  

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<RedirectToExternal />} /> 
      <Route path="/Rotacion-Auxiliares" element={<Authentication />} />
      <Route path="/Consejos" element={<Consejos />} />
      <Route path="/Sugerencias" element={<Sugerencias />} />
      <Route path="/NavBar" element={<NavBar />} />
      <Route path="/generate-weeks" element={<GenerateWeeks />} />
    </Routes>
  );
};
  
export default Rutas;
