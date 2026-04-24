package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando la descripción proporcionada para un paquete no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code EnvioService}):
 * <ul>
 *   <li>Descripción nula o vacía</li>
 *   <li>La descripción supera la longitud máxima permitida por el sistema</li>
 *   <li>La descripción contiene caracteres no permitidos</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see DireccionInvalidaException
 * @see FechaInvalidaException
 * @see PesoInvalidoException
 * @see TipoPaqueteInvalidoException
 * @see IdExistException
 */
public class DescripcionInvalidaException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con la descripción del paquete
     *                (ej. "La descripción no puede estar vacía",
     *                "La descripción supera la longitud máxima permitida",
     *                "La descripción contiene caracteres no permitidos")
     */
    public DescripcionInvalidaException(String mensaje) {
        super(mensaje);
    }
}