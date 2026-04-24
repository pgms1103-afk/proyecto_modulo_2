package co.edu.unbosque.paqueteriaproyecto.dto;

import java.util.Objects;

/**
 * Clase DTO (Data Transfer Object) que representa la información de un usuario
 * en la capa de transferencia entre el backend y el frontend (o entre servicios).
 * <p>
 * Contiene todos los atributos relevantes de un usuario: identificación, datos personales,
 * credenciales, tipo de usuario y tarifa asociada (por ejemplo, para envíos o servicios).
 * </p>
 * <p>
 * Esta clase es utilizada principalmente para:
 * <ul>
 *   <li>Transferir datos en peticiones y respuestas REST</li>
 *   <li>Evitar exponer directamente la entidad de base de datos</li>
 *   <li>Facilitar el mapeo con herramientas como ModelMapper</li>
 * </ul>
 * No incluye lógica de negocio; solo datos y métodos de acceso (getters/setters).
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 * @see co.edu.unbosque.paqueteriaproyecto.controller.UsuarioController
 * @see co.edu.unbosque.paqueteriaproyecto.service.UsuarioService
 */
public class UsuarioDTO {

    /** Identificador único del usuario generado por la base de datos. */
    private long id;

    /** Número de cédula de identidad del usuario. */
    private long cedula;

    /** Nombres del usuario. */
    private String nombre;

    /** Apellidos del usuario. */
    private String apellido;

    /** Correo electrónico del usuario. */
    private String correo;

    /** Contraseña del usuario (sin encriptar en este DTO). */
    private String contrasena;

    /** Tipo de usuario en el sistema (por ejemplo, {@code "NORMAL"} o {@code "ADMIN"}). */
    private String tipoUsuario;

    /** Tarifa asociada al usuario (por ejemplo, costo base por envío o servicio). */
    private double tarifa;

    /**
     * Constructor por defecto requerido para frameworks como Jackson (JSON),
     * ModelMapper u otros serializadores/deserializadores.
     */
    public UsuarioDTO() {

    }

    /**
     * Constructor con parámetros principales para crear un nuevo {@code UsuarioDTO}.
     * <p>
     * Normalmente se usa al crear un usuario nuevo (el campo {@code id} se asigna después
     * por la base de datos o el servicio).
     * </p>
     *
     * @param cedula      número de identificación (cédula) del usuario
     * @param nombre      nombres del usuario
     * @param apellido    apellidos del usuario
     * @param correo      correo electrónico del usuario
     * @param contrasena  contraseña del usuario (sin encriptar en este DTO)
     * @param tipoUsuario tipo de usuario ({@code "NORMAL"} o {@code "ADMIN"})
     * @param tarifa      tarifa asociada al usuario (por ejemplo, costo por envío o servicio)
     */
    public UsuarioDTO(long cedula, String nombre, String apellido, String correo, String contrasena,
            String tipoUsuario, double tarifa) {
        super();
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contrasena = contrasena;
        this.tipoUsuario = tipoUsuario;
        this.tarifa = tarifa;
    }

    /**
     * Retorna el identificador único del usuario generado por la base de datos.
     *
     * @return el {@code id} del usuario
     */
    public long getId() {
        return id;
    }

    /**
     * Establece el identificador único del usuario.
     * <p>
     * Normalmente solo lo usa el servicio o repositorio al recuperar datos de la base de datos.
     * </p>
     *
     * @param id el nuevo ID a asignar
     */
    public void setId(long id) {
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
     * @param correo dirección de correo electrónico; debe tener un formato válido
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * Retorna la contraseña del usuario.
     * <p>
     * <strong>Nota de seguridad:</strong> en un DTO expuesto en una API REST,
     * nunca se debería devolver la contraseña en respuestas. Este campo
     * se usa principalmente para operaciones de creación y actualización.
     * </p>
     *
     * @return la contraseña sin encriptar almacenada en este objeto
     */
    public String getContrasena() {
        return contrasena;
    }

    /**
     * Establece la contraseña del usuario.
     *
     * @param contrasena contraseña del usuario; debe cumplir los requisitos mínimos de seguridad
     */
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    /**
     * Retorna el tipo de usuario asignado en el sistema.
     *
     * @return tipo de usuario (por ejemplo, {@code "NORMAL"} o {@code "ADMIN"})
     */
    public String getTipoUsuario() {
        return tipoUsuario;
    }

    /**
     * Establece el tipo de usuario en el sistema.
     *
     * @param tipoUsuario tipo a asignar (por ejemplo, {@code "NORMAL"} o {@code "ADMIN"})
     */
    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    /**
     * Retorna la tarifa asociada al usuario.
     *
     * @return tarifa del usuario como valor {@code double}
     */
    public double getTarifa() {
        return tarifa;
    }

    /**
     * Establece la tarifa asociada al usuario.
     *
     * @param tarifa valor de la tarifa; debe ser un número positivo
     */
    public void setTarifa(double tarifa) {
        this.tarifa = tarifa;
    }

    /**
     * Retorna una representación en cadena de texto del objeto {@code UsuarioDTO}.
     *
     * <p>Incluye todos los campos relevantes del DTO en formato legible,
     * útil para depuración y registros de log. Por seguridad, el campo
     * {@code contrasena} es omitido de esta representación.</p>
     *
     * @return cadena con los valores de los atributos del usuario
     */
    @Override
    public String toString() {
        return "UsuarioDTO [id=" + id + ", cedula=" + cedula + ", nombre=" + nombre
                + ", apellido=" + apellido + ", correo=" + correo
                + ", tipoUsuario=" + tipoUsuario + ", tarifa=" + tarifa + "]";
    }

    /**
     * Calcula el código hash del objeto basándose en todos sus campos significativos.
     *
     * <p>Utilizado en colecciones basadas en hash como {@link java.util.HashMap}
     * y {@link java.util.HashSet}. Dos instancias iguales según {@link #equals(Object)}
     * siempre producirán el mismo hash.</p>
     *
     * @return valor entero que representa el hash del objeto
     */
    @Override
    public int hashCode() {
        return Objects.hash(id, cedula, nombre, apellido, correo, contrasena, tipoUsuario, tarifa);
    }

    /**
     * Compara este {@code UsuarioDTO} con otro objeto para determinar si son iguales.
     *
     * <p>Dos instancias de {@code UsuarioDTO} se consideran iguales si todos sus campos
     * tienen exactamente el mismo valor. Los campos de tipo {@code long} ({@code id} y
     * {@code cedula}) se comparan directamente por valor primitivo; el campo {@code double}
     * ({@code tarifa}) se compara mediante {@link Double#compare(double, double)} para evitar
     * problemas de precisión de punto flotante; y los campos {@link String} se comparan
     * mediante {@link Objects#equals(Object, Object)}.</p>
     *
     * @param obj el objeto con el que se comparará esta instancia
     * @return {@code true} si {@code obj} es un {@code UsuarioDTO} con los mismos valores
     *         en todos sus campos; {@code false} en cualquier otro caso
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null) return false;
        if (getClass() != obj.getClass()) return false;
        UsuarioDTO other = (UsuarioDTO) obj;
        return id == other.id
                && cedula == other.cedula
                && Objects.equals(nombre, other.nombre)
                && Objects.equals(apellido, other.apellido)
                && Objects.equals(correo, other.correo)
                && Objects.equals(contrasena, other.contrasena)
                && Objects.equals(tipoUsuario, other.tipoUsuario)
                && Double.compare(tarifa, other.tarifa) == 0;
    }
}