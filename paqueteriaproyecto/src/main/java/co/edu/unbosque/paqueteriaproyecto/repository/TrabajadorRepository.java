package co.edu.unbosque.paqueteriaproyecto.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import co.edu.unbosque.paqueteriaproyecto.entity.Trabajador;
import jakarta.transaction.Transactional;

/**
 * Repositorio Spring Data para la gestión de la persistencia de la entidad {@link Trabajador}.
 * <p>
 * Extiende {@link CrudRepository} para proporcionar operaciones CRUD básicas,
 * además de métodos de consulta derivados y operaciones personalizadas
 * definidas mediante consultas nativas usando {@link Query}.
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 * @see Trabajador
 * @see CrudRepository
 */
public interface TrabajadorRepository extends CrudRepository<Trabajador, Long> {

    /**
     * Obtiene los trabajadores cuyo nombre coincide con el valor especificado.
     *
     * @param nombre nombre utilizado como criterio de búsqueda
     * @return {@link Optional} que contiene una lista de {@link Trabajador} que cumplen
     *         el criterio, o vacío si no se encuentran resultados
     */
    public Optional<List<Trabajador>> findByNombre(String nombre);

    /**
     * Verifica la existencia de un trabajador con la cédula especificada.
     *
     * @param cedula número de cédula a validar
     * @return {@code true} si existe un trabajador con dicha cédula;
     *         {@code false} en caso contrario
     */
    public boolean existsByCedula(long cedula);

    /**
     * Verifica la existencia de un trabajador con el número de teléfono especificado.
     *
     * @param telefono número de teléfono a validar
     * @return {@code true} si existe un trabajador con dicho número;
     *         {@code false} en caso contrario
     */
    public boolean existsByTelefono(long telefono);

    /**
     * Verifica la existencia de un trabajador con el correo electrónico especificado.
     *
     * @param email correo electrónico a validar
     * @return {@code true} si existe un trabajador con dicho correo;
     *         {@code false} en caso contrario
     */
    public boolean existsByEmail(String email);

    /**
     * Actualiza los datos básicos de un trabajador existente mediante una consulta nativa.
     * <p>
     * Modifica los campos {@code nombre}, {@code cedula}, {@code telefono} y {@code email}
     * del registro identificado por su {@code id} en la tabla {@code trabajador}.
     * No altera el campo {@code cargo}.
     * </p>
     *
     * @param id identificador único del trabajador a actualizar
     * @param nombre nuevo nombre del trabajador
     * @param cedula nuevo número de cédula del trabajador
     * @param telefono nuevo número de teléfono del trabajador
     * @param email nuevo correo electrónico del trabajador
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE trabajador SET nombre = :nombre, cedula = :cedula, telefono = :telefono, email = :email WHERE id = :id", nativeQuery = true)
    void actualizarTrabajador(@Param("id") Long id, @Param("nombre") String nombre, @Param("cedula") long cedula, @Param("telefono") long telefono, @Param("email") String email);

    /**
     * Actualiza el cargo de un trabajador existente mediante una consulta nativa.
     * <p>
     * Modifica únicamente el campo {@code cargo} del registro identificado
     * por su {@code id} en la tabla {@code trabajador}.
     * </p>
     *
     * @param id identificador único del trabajador
     * @param cargo nuevo cargo a asignar
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE trabajador SET cargo = :cargo WHERE id = :id", nativeQuery = true)
    void actualizarCargo(@Param("id") Long id, @Param("cargo") String cargo);
}