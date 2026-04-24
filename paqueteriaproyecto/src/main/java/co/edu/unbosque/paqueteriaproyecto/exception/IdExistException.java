package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando se intenta registrar o utilizar un identificador (ID)
 * que ya existe en el sistema, violando la restricción de unicidad en la capa
 * de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 409 Conflict).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code UsuarioService}):
 * <ul>
 *   <li>Intento de registrar un nuevo usuario con un ID que ya está asociado a otro usuario</li>
 *   <li>Intento de crear una entidad con un identificador duplicado en la base de datos</li>
 *   <li>Operación de actualización que generaría conflicto de unicidad con un ID existente</li>
 * </ul>
 * </p>
 * <p>
 * Esta validación es fundamental para garantizar la integridad referencial y
 * la consistencia de los datos en el sistema, evitando duplicidades que podrían
 * generar comportamientos inesperados.
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @since 1.0
 * @see CorreoInvalidoException
 * @see ApellidoInvalidoException
 * @see CedulaInvalidaException
 * @see NombreInvalidoException
 * @see ContrasenaInvalidaException
 * @see TipoUsuarioInvalidoException
 * @see UsuarioService
 */
public class IdExistException extends RuntimeException{
	
	/**
	 * Construye una nueva excepción con el mensaje de error detallado.
	 *
	 * @param mensaje descripción específica del problema con el identificador  
	 *                (ej. "El ID ya existe en el sistema",  
	 *                "No se puede crear el usuario porque el ID ya está registrado",  
	 *                "Identificador duplicado: el recurso ya existe")
	 */
	public IdExistException(String mensaje) {
		super(mensaje);
	}

}