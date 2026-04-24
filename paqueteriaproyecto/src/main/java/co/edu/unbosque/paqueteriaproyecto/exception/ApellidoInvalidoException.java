package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el apellido proporcionado no cumple con las reglas de validación
 * definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code UsuarioService}):
 * <ul>
 *   <li>Apellido vacío o nulo</li>
 *   <li>Contiene caracteres no permitidos (solo letras y espacios)</li>
 *   <li>Contiene espacios dobles o consecutivos</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @since 1.0
 * @see NombreInvalidoException
 * @see CedulaInvalidaException
 * @see CorreoInvalidoException
 * @see ContrasenaInvalidaException
 * @see TipoUsuarioInvalidoException
 * @see IdExistException
 */
public class ApellidoInvalidoException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con el apellido
     *                (ej. "El apellido no puede estar vacio", "El apellido solo debe contener letras y espacios")
     */
    public ApellidoInvalidoException(String mensaje) {
        super(mensaje);
    }
}