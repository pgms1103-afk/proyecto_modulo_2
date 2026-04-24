package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el cargo proporcionado para un trabajador no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code TrabajadorService}):
 * <ul>
 *   <li>Cargo nulo o vacío</li>
 *   <li>El cargo no corresponde a ninguno de los valores permitidos en el sistema
 *       (ej. "Administrador", "Conductor", "Manipulador")</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see NombreInvalidoException
 * @see CedulaInvalidaException
 * @see NumeroTelefonoInvalidoException
 * @see CorreoInvalidoException
 * @see IdExistException
 */
public class CargoInvalidoException extends RuntimeException {

	/**
	 * Construye una nueva excepción con el mensaje de error detallado.
	 *
	 * @param mensaje descripción específica del problema con el cargo
	 *                (ej. "El cargo no puede estar vacío",
	 *                "El cargo ingresado no es válido para el sistema")
	 */
	public CargoInvalidoException(String mensaje) {
		super(mensaje);
	}
}