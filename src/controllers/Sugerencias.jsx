

import '../App.css'; 

const Sugerencias = () => {
  return (
    <div className="sugerencias-container">
      <h1 className="titulo-sugerencias">SUGERENCIAS PARA IMPRESION</h1>
      <div className="imagenes-container">
        <img src="/Rotacion-Auxiliares/images/pdfUno.png" alt="Imagen 1" className="imagen-uno" />
        <img src="/Rotacion-Auxiliares/images/pdfDos.png" alt="Imagen 2" className="imagen-dos" />
      </div>
      <div className="explicacion-container">
        <h2>Personalización de Impresión</h2>
        <p>
          Para personalizar la impresión de los documentos, siga estos pasos:
        </p>
        <ol>
          <li>
            <strong>Seleccione el documento:</strong> En la vista previa, elija el documento que desea imprimir.
          </li>
          <li>
            <strong>Personalice el contenido:</strong> Haga clic en el ícono de impresión o presione <kbd>Ctrl</kbd> + <kbd>P</kbd> en su teclado para abrir la ventana de impresión.
          </li>
          <li>
            <strong>Acceda a la paleta de impresión:</strong> En la ventana de impresión, encontrará una paleta de opciones para ajustar la configuración de impresión. Aquí podrá personalizar las opciones como el tamaño del papel, los márgenes y la calidad de impresión.
          </li>
          <li>
            <strong>Ajuste según sus preferencias:</strong> Use las herramientas disponibles para ajustar el diseño y la apariencia del documento antes de enviarlo a la impresora.
          </li>
          <li>
            <strong>Envíe a imprimir:</strong> Una vez que haya configurado todas las opciones, haga clic en el botón de impresión para enviar el documento a la impresora.
          </li>
        </ol>
        <p>
          Las imágenes proporcionadas sirven como guía para ayudarlo a identificar las opciones de impresión en la paleta con control p = en la tecla Ctrl+p.
        </p>
      </div>
    </div>
  );
};

export default Sugerencias;

