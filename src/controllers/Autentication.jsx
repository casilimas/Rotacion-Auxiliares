
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../App.css'; 

const Authentication = () => {
  // Estados para almacenar el valor del campo de entrada, y mensajes de éxito o error
  const [authKey, setAuthKey] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Obtiene la clave de autenticación desde las variables de entorno usando Vite
  const correctKey = import.meta.env.VITE_AUTH_KEY;

  // Crea una instancia de useNavigate
  const navigate = useNavigate();

  // Función para manejar el cambio en el campo de entrada
  const handleInputChange = (e) => {
    setAuthKey(e.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correctKey) {
      console.error('La variable de entorno VITE_AUTH_KEY no está definida.');
      return;
    }

    // Lógica de validación usando la variable de entorno
    if (authKey === correctKey) {
      setMessage('Clave de autenticación correcta.');
      setMessageType('success');
      
      // Limpia el campo de entrada
      setAuthKey('');

      // Oculta el mensaje después de 3 segundos y redirige al usuario
      setTimeout(() => {
        setMessage('');
        setMessageType('');
        navigate('/generate-weeks'); // Redirige al controlador de "GenerateWeeks"
      }, 3000);
    } else {
      setMessage('Clave de autenticación incorrecta. Inténtalo de nuevo.');
      setMessageType('error');
      
      // Limpia el campo de entrada
      setAuthKey('');

      // Oculta el mensaje después de 3 segundos
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  return (
    <div className="authentication-container">
      <h1 className='titulo-autenticacion'>Autenticación</h1>
      <form onSubmit={handleSubmit} className="authentication-form">
        <label htmlFor="authKey" className="authentication-label">
          Introduzca la clave de autenticación:
        </label>
        <input
          type="password"
          id="authKey"
          value={authKey}
          onChange={handleInputChange}
          className="authentication-input"
          placeholder="Clave de autenticación"
          required
        />
        <button type="submit" className="authentication-button">
          Enviar
        </button>
        {message && (
          <p className={`authentication-message ${messageType}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Authentication;
