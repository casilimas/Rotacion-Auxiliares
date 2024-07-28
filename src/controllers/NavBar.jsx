import { Link } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/Autentication" className="navbar-link">Autenticación</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Consejos" className="navbar-link">Consejos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/Sugerencias" className="navbar-link">Sugerencias</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
