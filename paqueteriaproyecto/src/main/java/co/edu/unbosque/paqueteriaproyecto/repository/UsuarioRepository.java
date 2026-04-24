package co.edu.unbosque.paqueteriaproyecto.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import co.edu.unbosque.paqueteriaproyecto.entity.Usuario;

import jakarta.transaction.Transactional;

/**
 * Repositorio JPA para la gestión de la entidad {@link Usuario} y sus subtipos.
 * <p>
 * Extiende {@link CrudRepository} para proporcionar operaciones CRUD básicas,
 * además de consultas personalizadas para búsqueda, validación de unicidad
 * y actualización de datos mediante queries nativas.
 * </p>
 * <p>
 * Las consultas nativas operan directamente sobre la tabla {@code usuario},
 * aprovechando la estrategia de herencia {@code SINGLE_TABLE} con discriminador
 * {@code tipo_usuario}.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see CrudRepository
 * @see Usuario
 * @see UsuarioNormal
 * @see UsuarioConcurrente
 * @see UsuarioPremium
 * @see UsuarioAdmin
 */
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {

	/**
	 * Verifica la existencia de un usuario con la cédula especificada.
	 *
	 * @param cedula número de cédula a validar
	 * @return {@code true} si existe un usuario con dicha cédula;
	 *         {@code false} en caso contrario
	 */
	public boolean existsByCedula(long cedula);

	/**
	 * Verifica la existencia de un usuario con el correo electrónico especificado.
	 * <p>
	 * Útil para validar la unicidad del correo durante procesos de registro
	 * o actualización de datos.
	 * </p>
	 *
	 * @param correo correo electrónico a validar
	 * @return {@code true} si el correo ya está registrado;
	 *         {@code false} en caso contrario
	 */
	public boolean existsByCorreo(String correo);

	/**
	 * Actualiza los datos básicos de un usuario existente mediante una consulta nativa.
	 * <p>
	 * Modifica los campos {@code cedula}, {@code nombre}, {@code apellido},
	 * {@code correo} y {@code contrasena} del registro identificado por su {@code id}.
	 * </p>
	 *
	 * @param id identificador único del usuario
	 * @param cedula nuevo número de cédula
	 * @param nombre nuevo nombre
	 * @param apellido nuevo apellido
	 * @param correo nuevo correo electrónico
	 * @param contrasena nueva contraseña (debe gestionarse de forma segura)
	 */
	@Modifying
	@Transactional
	@Query(value = "UPDATE usuario SET cedula = :cedula, nombre = :nombre, apellido = :apellido, correo = :correo, contrasena = :contrasena WHERE id = :id", nativeQuery = true)
	public void actualizarUsuario(@Param("id") Long id, @Param("cedula") long cedula, @Param("nombre") String nombre,
			@Param("apellido") String apellido, @Param("correo") String correo, @Param("contrasena") String contrasena);

	/**
	 * Actualiza el tipo de usuario y su tarifa mediante una consulta nativa.
	 * <p>
	 * Permite cambiar el valor del discriminador {@code tipo_usuario} y la tarifa
	 * asociada al usuario, lo cual puede implicar un cambio de rol dentro del sistema
	 * (por ejemplo, de NORMAL a PREMIUM o ADMIN).
	 * </p>
	 *
	 * @param id identificador único del usuario
	 * @param tipo nuevo tipo de usuario (ej. "NORMAL", "ADMIN", "PREMIUM", "CONCURRENTE")
	 * @param tarifa nueva tarifa asociada al usuario
	 */
	@Modifying
	@Transactional
	@Query(value = "UPDATE usuario SET tipo_usuario = :tipo, tarifa = :tarifa WHERE id = :id", nativeQuery = true)
	public void actualizarTipoYTarifa(@Param("id") Long id, @Param("tipo") String tipo, @Param("tarifa") double tarifa);

	/**
	 * Obtiene los usuarios que pertenecen a un tipo específico.
	 * <p>
	 * Filtra los registros según el valor del discriminador {@code tipo_usuario}
	 * en la tabla {@code usuario}.
	 * </p>
	 *
	 * @param tipo tipo de usuario a buscar (ej. "ADMIN", "NORMAL", "PREMIUM", "CONCURRENTE")
	 * @return {@link Optional} que contiene una lista de {@link Usuario} que cumplen
	 *         el criterio, o vacío si no se encuentran resultados
	 */
	@Query(value = "SELECT * FROM usuario WHERE tipo_usuario = :tipo", nativeQuery = true)
	public Optional<List<Usuario>> findByTipo(@Param("tipo") String tipo);
	
	 /**
     * Busca usuarios cuyo nombre contenga el texto indicado, sin distinción de mayúsculas.
     *
     * <p>Realiza una búsqueda parcial ({@code LIKE '%nombre%'}) sobre el campo {@code nombre}
     * usando {@code LOWER()} para hacer la búsqueda insensible a mayúsculas y minúsculas.
     * Este método reemplaza al anterior {@code findByCedula} como método principal de
     * búsqueda expuesto al frontend.</p>
     *
     * <p>Ejemplo de uso: si se pasa {@code "juan"}, retornará registros con nombre
     * {@code "Juan"}, {@code "Juanita"}, {@code "Pedro Juan"}, etc.</p>
     *
     * @param nombre fragmento de nombre utilizado como criterio de búsqueda
     * @return {@link Optional} que contiene una lista de {@link Usuario} cuyos nombres
     *         coincidan parcialmente con el valor dado; vacío si no hay resultados
     */
   
    public Optional<List<Usuario>> findByNombre(String nombre);
 
    /**
     * Busca un único usuario que coincida exactamente con el correo y la contraseña indicados.
     *
     * <p>Este método es el núcleo del proceso de autenticación. Spring Data JPA genera
     * automáticamente la consulta a partir del nombre del método
     * ({@code findBy<Campo1>And<Campo2>}), por lo que no requiere anotación {@code @Query}.</p>
     *
     * <p><b>Nota de seguridad:</b> actualmente las contraseñas se almacenan en texto plano.
     * Se recomienda integrar BCrypt u otro algoritmo de hash antes de pasar a producción.</p>
     *
     * @param correo     correo electrónico del usuario que intenta iniciar sesión
     * @param contrasena contraseña del usuario que intenta iniciar sesión
     * @return {@link Optional} con el {@link Usuario} autenticado si las credenciales
     *         coinciden con un registro en la base de datos; vacío si no hay coincidencia
     */
    public Optional<Usuario> findByCorreoAndContrasena(String correo, String contrasena);

}