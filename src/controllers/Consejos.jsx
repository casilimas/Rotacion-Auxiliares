import '../App.css'; 

const Consejos = () => {
    return (
        <div className="consejos-container">
            <h1 className='consejos-aplicacion'>CONSEJOS DE USO DE LA APLICACION</h1>
            <div className="scroll-box">
                <p>
                    <strong>Guía para usar la aplicación</strong><br />
                    Asegúrate de ingresar los nombres y apellidos correctamente en los campos proporcionados. El sistema no acepta símbolos, acentuaciones ni números. Después de realizar cambios en los datos de la semana, es importante hacer clic en el botón Guardar para almacenar los cambios. No olvides también guardar los datos correspondientes al año y al mes. Ten en cuenta que, debido a que la aplicación utiliza IndexedDB para almacenar la información localmente, los datos pueden variar si accedes a la aplicación desde diferentes dispositivos o navegadores.
                </p>
                <p>
                    <strong>¿Cómo solucionar problemas mediante la purga de caché?</strong><br />
                    Si encuentras problemas al usar la aplicación, puede ser útil purgar la caché de tu navegador. Este proceso varía según el navegador, pero generalmente puedes encontrar la opción en la configuración bajo Privacidad o Historial. Busca una opción para borrar datos de navegación y selecciona caché para asegurarte de que los datos antiguos se eliminen.
                </p>
            </div>
        </div>
    );
};

export default Consejos;
