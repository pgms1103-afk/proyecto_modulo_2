package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el número de teléfono proporcionado para un trabajador
 * no cumple con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code TrabajadorService}):
 * <ul>
 *   <li>Número de teléfono con valor nulo o igual a cero</li>
 *   <li>Número de teléfono con cantidad de dígitos fuera del rango permitido</li>
 *   <li>El número contiene caracteres no numéricos</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see CargoInvalidoException
 * @see NombreInvalidoException
 * @see CedulaInvalidaException
 * @see CorreoInvalidoException
 * @see IdExistException
 */
public class NumeroTelefonoInvalidoException extends RuntimeException {

	/**
	 * Construye una nueva excepción con el mensaje de error detallado.
	 *
	 * @param mensaje descripción específica del problema con el número de teléfono
	 *                (ej. "El número de teléfono no puede ser nulo o cero",
	 *                "El número de teléfono no tiene la longitud permitida")
	 */
	public NumeroTelefonoInvalidoException(String mensaje) {
		super(mensaje);
	}
}