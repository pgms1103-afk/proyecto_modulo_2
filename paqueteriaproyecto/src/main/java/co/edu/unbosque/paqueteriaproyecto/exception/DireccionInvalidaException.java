package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando la dirección de destino proporcionada para un envío no cumple
 * con las reglas de validación definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code EnvioService}):
 * <ul>
 *   <li>Dirección nula o vacía</li>
 *   <li>La dirección supera la longitud máxima permitida por el sistema</li>
 *   <li>La dirección contiene únicamente caracteres especiales o espacios en blanco</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @version 1.0
 * @since 1.0
 * @see DescripcionInvalidaException
 * @see FechaInvalidaException
 * @see PesoInvalidoException
 * @see TipoPaqueteInvalidoException
 * @see IdExistException
 */
public class DireccionInvalidaException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con la dirección de destino
     *                (ej. "La dirección no puede estar vacía",
     *                "La dirección supera la longitud máxima permitida",
     *                "La dirección no puede contener únicamente caracteres especiales")
     */
    public DireccionInvalidaException(String mensaje) {
        super(mensaje);
    }
}