package co.edu.unbosque.paqueteriaproyecto.exception;

/**
 * Excepción lanzada cuando el tipo de usuario proporcionado no es válido o no está
 * dentro de los valores permitidos definidos en la capa de negocio o servicio.
 * <p>
 * Esta excepción es de tipo {@link RuntimeException} (unchecked), por lo que no obliga
 * al llamador a capturarla explícitamente, aunque se recomienda manejarla en la capa
 * de controlador para devolver respuestas HTTP apropiadas (ej. 400 Bad Request).
 * </p>
 * <p>
 * Casos típicos que la provocan (según la lógica en {@code UsuarioService}):
 * <ul>
 *   <li>Tipo de usuario nulo o vacío</li>
 *   <li>Valor proporcionado no corresponde a ninguno de los roles permitidos en el sistema</li>
 *   <li>Intento de asignar un tipo de usuario no autorizado para ciertas operaciones</li>
 *   <li>Inconsistencia entre el tipo de usuario y los privilegios solicitados</li>
 * </ul>
 * </p>
 * <p>
 * Los tipos de usuario válidos en el sistema son:
 * <ul>
 *   <li>ADMIN - Administrador con privilegios completos</li>
 *   <li>EMPLEADO - Personal operativo con permisos limitados</li>
 *   <li>CLIENTE - Usuario final con acceso básico al sistema</li>
 * </ul>
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see CorreoInvalidoException
 * @see ApellidoInvalidoException
 * @see CedulaInvalidaException
 * @see NombreInvalidoException
 * @see ContrasenaInvalidaException
 * @see IdExistException
 * @see UsuarioService
 */
public class TipoUsuarioInvalidoException extends RuntimeException {

    /**
     * Construye una nueva excepción con el mensaje de error detallado.
     *
     * @param mensaje descripción específica del problema con el tipo de usuario  
     *                (ej. "El tipo de usuario no puede ser nulo",  
     *                "Tipo de usuario inválido. Los valores permitidos son: ADMIN, EMPLEADO, CLIENTE",  
     *                "El rol especificado no existe en el sistema")
     */
    public TipoUsuarioInvalidoException(String mensaje) {
        super(mensaje);
    }
}