package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el tipo de paquete proporcionado para un envío no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code EnvioService}):
 * <ul>
 *   <li>Tipo de paquete nulo o vacío</li>
 *   <li>El tipo de paquete no corresponde a ninguno de los valores permitidos en el sistema</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see DescripcionInvalidaException
 * @see DireccionInvalidaException
 * @see FechaInvalidaException
 * @see PesoInvalidoException
 * @see IdExistException
 */
public class TipoPaqueteInvalidoException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con el tipo de paquete
     *                (ej. "El tipo de paquete no puede estar vacío",
     *                "El tipo de paquete ingresado no es válido para el sistema")
     */
    public TipoPaqueteInvalidoException(String mensaje) {
        super(mensaje);
    }
}