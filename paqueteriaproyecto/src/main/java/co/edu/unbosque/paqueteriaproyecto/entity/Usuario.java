package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

/**
 * Entidad JPA abstracta que representa la clase base de un usuario en el sistema de paquetería.
 * <p>
 * Define la jerarquía de herencia con estrategia {@code SINGLE_TABLE}, donde todas las
 * subclases se almacenan en la tabla {@code usuario} y se diferencian mediante la columna
 * discriminadora {@code tipo_usuario} (por ejemplo, {@code "NORMAL"} y {@code "ADMIN"}).
 * </p>
 * <p>
 * Contiene los atributos comunes a todos los usuarios y define la estructura base para
 * las entidades hijas concretas. Las subclases deben definir su propio valor discriminador
 * mediante {@code @DiscriminatorValue}. Esta clase no debe instanciarse directamente.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 * @see jakarta.persistence.InheritanceType#SINGLE_TABLE
 * @see co.edu.unbosque.paqueteriaproyecto.dto.UsuarioDTO
 */
@Entity
@Table(name = "usuario")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_usuario")
public abstract class Usuario {

    /**
     * Identificador único del usuario, generado automáticamente por la base de datos.
     * Anotado con {@code @Id} y {@code @GeneratedValue} con estrategia {@code IDENTITY}.
     */
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    /** Número de cédula de identidad del usuario. */
    private long cedula;

    /** Nombres del usuario. */
    private String nombre;

    /** Apellidos del usuario. */
    private String apellido;

    /** Correo electrónico del usuario; debe ser único en la base de datos. */
    private String correo;

    /** Contraseña del usuario; debe almacenarse encriptada en la capa de servicio. */
    private String contrasena;

    /**
     * Construye una nueva instancia de {@code Usuario} sin inicializar atributos.
     * Requerido por JPA para la instanciación de entidades mediante reflexión.
     */
    public Usuario() {
    }

    /**
     * Construye una nueva instancia de {@code Usuario} con los datos personales indicados.
     * <p>
     * El campo {@code id} no se incluye en este constructor ya que es asignado
     * automáticamente por la base de datos al momento de la persistencia.
     * </p>
     *
     * @param cedula     número de cédula de identidad del usuario; debe ser un valor positivo válido
     * @param nombre     nombres del usuario; no debe estar vacío
     * @param apellido   apellidos del usuario; no debe estar vacío
     * @param correo     correo electrónico del usuario; debe tener formato válido y ser único
     * @param contrasena contraseña del usuario; debe almacenarse encriptada en la capa de servicio
     */
    public Usuario(long cedula, String nombre, String apellido, String correo, String contrasena) {
        super();
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    /**
     * Retorna el identificador único del usuario generado por la base de datos.
     *
     * @return el {@code id} del usuario, o {@code null} si aún no ha sido persistido
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el identificador único del usuario.
     * <p>
     * Normalmente solo lo usa JPA al cargar la entidad desde la base de datos.
     * No se recomienda modificarlo manualmente.
     * </p>
     *
     * @param id nuevo identificador único asignado por la base de datos
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Retorna el número de cédula de identidad del usuario.
     *
     * @return cédula del usuario como valor {@code long}
     */
    public long getCedula() {
        return cedula;
    }

    /**
     * Establece el número de cédula de identidad del usuario.
     *
     * @param cedula número de cédula; debe ser un valor numérico positivo válido
     */
    public void setCedula(long cedula) {
        this.cedula = cedula;
    }

    /**
     * Retorna los nombres del usuario.
     *
     * @return nombres del usuario
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece los nombres del usuario.
     *
     * @param nombre nombres del usuario; no debe estar vacío
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Retorna los apellidos del usuario.
     *
     * @return apellidos del usuario
     */
    public String getApellido() {
        return apellido;
    }

    /**
     * Establece los apellidos del usuario.
     *
     * @param apellido apellidos del usuario; no debe estar vacío
     */
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    /**
     * Retorna el correo electrónico del usuario.
     *
     * @return dirección de correo electrónico del usuario
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * Establece el correo electrónico del usuario.
     *
     * @param correo dirección de correo electrónico; debe tener formato válido y ser única en el sistema
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * Retorna la contraseña del usuario.
     * <p>
     * <strong>Nota de seguridad:</strong> este campo debe manejarse con cuidado.
     * Nunca debe exponerse en respuestas de API ni en registros de log sin encriptación.
     * La contraseña debe almacenarse hasheada en la base de datos.
     * </p>
     *
     * @return la contraseña tal como está almacenada (encriptada en la base de datos)
     */
    public String getContrasena() {
        return contrasena;
    }

    /**
     * Establece la contraseña del usuario.
     *
     * @param contrasena contraseña del usuario; debe cumplir los requisitos mínimos de seguridad
     *                   y ser encriptada antes de persistirse
     */
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    /**
     * Retorna una representación en cadena de texto del usuario, incluyendo
     * sus atributos principales. Útil para depuración y registros de log.
     *
     * <p>Por razones de seguridad, el campo {@code contrasena} es omitido
     * de esta representación.</p>
     *
     * @return cadena de texto con los datos del usuario sin incluir la contraseña
     */
    @Override
    public String toString() {
        return "Usuario [id=" + id + ", cedula=" + cedula + ", nombre=" + nombre
                + ", apellido=" + apellido + ", correo=" + correo + "]";
    }

    /**
     * Calcula el código hash del usuario basándose en todos sus campos significativos.
     *
     * <p>Utilizado en colecciones basadas en hash como {@link java.util.HashMap}
     * y {@link java.util.HashSet}. Dos instancias iguales según {@link #equals(Object)}
     * siempre producirán el mismo hash.</p>
     *
     * @return valor entero que representa el hash del usuario
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, cedula, nombre, apellido, correo, contrasena);
    }

    /**
     * Compara este usuario con otro objeto para determinar si son iguales.
     * <p>
     * Dos instancias de {@code Usuario} se consideran iguales si coinciden en todos sus
     * campos, incluyendo la contraseña (útil en pruebas o validaciones internas). Los campos
     * de tipo {@code long} ({@code cedula}) se comparan directamente por valor primitivo,
     * mientras que los de tipo {@link Object} ({@code id}, {@code nombre}, {@code apellido},
     * {@code correo} y {@code contrasena}) se comparan mediante {@link Objects#equals(Object, Object)}.
     * </p>
     *
     * @param obj objeto con el que se desea comparar esta instancia
     * @return {@code true} si ambos objetos son iguales en todos sus campos;
     *         {@code false} en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        Usuario other = (Usuario) obj;
        return Objects.equals(id, other.id)
                && cedula == other.cedula
                && Objects.equals(nombre, other.nombre)
                && Objects.equals(apellido, other.apellido)
                && Objects.equals(correo, other.correo)
                && Objects.equals(contrasena, other.contrasena);
    }

}