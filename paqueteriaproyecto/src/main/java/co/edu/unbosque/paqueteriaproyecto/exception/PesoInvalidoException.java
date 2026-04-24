package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el peso proporcionado para un paquete no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code EnvioService}):
 * <ul>
 *   <li>Peso con valor nulo o igual a cero</li>
 *   <li>Peso con valor negativo</li>
 *   <li>Peso que supera el límite máximo permitido por el sistema</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see DescripcionInvalidaException
 * @see DireccionInvalidaException
 * @see FechaInvalidaException
 * @see TipoPaqueteInvalidoException
 * @see IdExistException
 */
public class PesoInvalidoException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con el peso
     *                (ej. "El peso no puede ser nulo o igual a cero",
     *                "El peso no puede ser negativo",
     *                "El peso supera el límite máximo permitido")
     */
    public PesoInvalidoException(String mensaje) {
        super(mensaje);
    }
}