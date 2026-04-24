package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando una fecha proporcionada para un envío no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code EnvioService}):
 * <ul>
 *   <li>Fecha nula</li>
 *   <li>La fecha de envío es posterior a la fecha de entrega</li>
 *   <li>La fecha de envío es anterior a la fecha actual del sistema</li>
 *   <li>La fecha de entrega ya ha sido superada al momento del registro</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see DescripcionInvalidaException
 * @see DireccionInvalidaException
 * @see PesoInvalidoException
 * @see TipoPaqueteInvalidoException
 * @see IdExistException
 */
public class FechaInvalidaException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con la fecha
     *                (ej. "La fecha no puede ser nula",
     *                "La fecha de envío no puede ser posterior a la fecha de entrega",
     *                "La fecha de envío no puede ser anterior a la fecha actual")
     */
    public FechaInvalidaException(String mensaje) {
        super(mensaje);
    }
}