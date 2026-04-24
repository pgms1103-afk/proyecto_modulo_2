package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el nombre proporcionado no cumple con las reglas de validación
 * definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code UsuarioService}):
 * <ul>
 *   <li>Nombre nulo o vacío</li>
 *   <li>Nombre que contiene caracteres numéricos o especiales no permitidos</li>
 *   <li>Nombre que excede la longitud máxima permitida</li>
 *   <li>Nombre que no cumple con el formato de solo letras y espacios</li>
 * </ul>
 * </p>
 * <p>
 * La validación típicamente utiliza una expresión regular que permite letras mayúsculas,
 * minúsculas y espacios: {@code ^[A-Za-záéíóúñÑÁÉÍÓÚ\\s]+$}
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @since 1.0
 * @see CorreoInvalidoException
 * @see ApellidoInvalidoException
 * @see CedulaInvalidaException
 * @see IdExistException
 * @see ContrasenaInvalidaException
 * @see TipoUsuarioInvalidoException
 * @see UsuarioService
 */
public class NombreInvalidoException extends RuntimeException{
	
	/**
	 * Construye una nueva excepción con el mensaje de error detallado.
	 *
	 * @param mensaje descripción específica del problema con el nombre  
	 *                (ej. "El nombre no puede estar vacío",  
	 *                "Nombre inválido. Solo se permiten letras y espacios",  
	 *                "El nombre excede la longitud máxima permitida de 50 caracteres")
	 */
	public NombreInvalidoException(String mensaje) {
		super(mensaje);
	}

}