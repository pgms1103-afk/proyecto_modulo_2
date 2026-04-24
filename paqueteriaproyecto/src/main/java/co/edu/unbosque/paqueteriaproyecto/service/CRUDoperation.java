package co.edu.unbosque.paqueteriaproyecto.service;

import java.util.List;

/**
 * Interfaz genérica que define las operaciones básicas de CRUD (Create, Read, Update, Delete)
 * para cualquier tipo de entidad o DTO en la capa de servicio.
 * <p>
 * Esta interfaz proporciona un contrato estándar para servicios que manejan persistencia
 * de datos, facilitando la reutilización de código y la consistencia en todos los servicios
 * del proyecto (por ejemplo: {@code UsuarioService}, servicios de paquetes, envíos, etc.).
 * </p>
 * <p>
 * Los métodos devuelven valores enteros en operaciones de modificación (create, update, delete)
 * para indicar el número de filas afectadas o el estado de la operación (por convención:
 * 1 = éxito, 0 = no se encontró o fallo, aunque puede variar según implementación).
 * </p>
 * <p>
 * Nota: El método {@code delateById} contiene un typo en el nombre (debería ser "deleteById").
 * Se mantiene tal cual por respeto al código original, pero se recomienda corregirlo en futuras versiones.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @param <T> el tipo de dato que maneja el servicio (entidad JPA o DTO)
 */
public interface CRUDoperation<T> {

    /**
     * Crea un nuevo registro en la base de datos o en el almacenamiento correspondiente.
     *
     * @param data el objeto (entidad o DTO) a crear
     * @return número de filas afectadas (normalmente 1 en caso de éxito, 0 en fallo)
     */
    public int create(T data);

    /**
     * Obtiene todos los registros existentes del tipo {@code T}.
     *
     * @return lista completa de todos los elementos (puede estar vacía)
     */
    public List<T> getAll();

    /**
     * Elimina un registro por su identificador único.
     *
     * @param id el ID del registro a eliminar
     * @return número de filas afectadas (1 si se eliminó, 0 si no existía)
     */
    public int delateById(Long id);

    /**
     * Actualiza un registro existente identificado por su ID.
     *
     * @param id   el ID del registro a actualizar
     * @param data el objeto con los datos actualizados
     * @return número de filas afectadas (1 en éxito, 0 si no se encontró o fallo)
     */
    public int updateById(Long id, T data);


}