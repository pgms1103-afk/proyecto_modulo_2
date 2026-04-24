package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el número de cédula proporcionado no cumple con las reglas de validación
 * definidas en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code UsuarioService}):
 * <ul>
 *   <li>Cédula negativa o cero</li>
 *   <li>Cédula mayor a 2.000.000.000</li>
 *   <li>Cédula que no tiene exactamente 10 dígitos</li>
 *   <li>Cédula ya registrada en el sistema (duplicada)</li>
 * </ul>
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @since 1.0
 * @see ApellidoInvalidoException
 * @see NombreInvalidoException
 * @see CorreoInvalidoException
 * @see ContrasenaInvalidaException
 * @see TipoUsuarioInvalidoException
 * @see IdExistException
 * @see UsuarioService
 */
public class CedulaInvalidaException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con la cédula  
     *                (ej. "La cedula no puede ser negativa o cero",  
     *                "La cedula ya esta registrada",  
     *                "Numero de cedula invalido, debe tener 10 digitos")
     */
    public CedulaInvalidaException(String mensaje) {
        super(mensaje);
    }
}