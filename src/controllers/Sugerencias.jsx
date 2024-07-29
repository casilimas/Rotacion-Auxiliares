

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
        <p>
        Para organizar tus datos de manera eficiente, primero crea una nueva carpeta en tu escritorio. Haz clic derecho en un área vacía del escritorio, selecciona <strong>Nuevo</strong> y luego <strong>Carpeta</strong>. Nombra la carpeta algo como <strong>Registro de Datos</strong>. Después, personaliza los documentos o la información que necesites. Una vez que hayas hecho los cambios, guarda una captura de pantalla para registrar lo que has hecho. En Windows, presiona la tecla <strong>PrtScn</strong> para copiar la pantalla y luego pega la imagen en un programa como <strong>Paint</strong> para guardarla en la carpeta que creaste. En macOS, usa <strong>Shift + Command + 4</strong> para capturar la parte de la pantalla que elijas y guarda la imagen en el escritorio, moviéndola luego a la carpeta que preparaste. Esto te ayudará a tener un registro visual y organizado de tus cambios y datos importantes.
        </p>
      </div>
    </div>
  );
};

export default Sugerencias;

