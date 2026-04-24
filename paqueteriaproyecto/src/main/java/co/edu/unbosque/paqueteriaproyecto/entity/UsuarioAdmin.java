package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad que representa un usuario con rol de ADMINISTRADOR en el sistema.
 * <p>
 * Esta clase hereda de {@link Usuario} y utiliza la estrategia de herencia
 * {@link InheritanceType#SINGLE_TABLE} con discriminador {@code tipo_usuario = 'ADMIN'}.
 * Todos los registros de administradores se almacenan en la misma tabla que los usuarios normales,
 * diferenciados únicamente por el valor en la columna discriminadora.
 * </p>
 * <p>
 * Los administradores tienen permisos elevados en el sistema (gestión de usuarios, configuraciones, etc.).
 * El campo {@code tipoUsuario} está marcado como {@code insertable=false, updatable=false} para que
 * JPA no intente modificarlo, ya que su valor es fijo y controlado por el discriminador.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see Usuario
 * @see jakarta.persistence.DiscriminatorValue
 * @see jakarta.persistence.InheritanceType#SINGLE_TABLE
 */
@Entity
@DiscriminatorValue("Admin")
public class UsuarioAdmin extends Usuario {

    @Column(name = "tipo_usuario", insertable = false, updatable = false)
    private String tipoUsuario = "Admin";

    /**
     * Constructor por defecto requerido por JPA/Hibernate.
     */
    public UsuarioAdmin() {
    }

    /**
     * Constructor con los campos principales para crear un nuevo administrador.
     * <p>
     * Delega la inicialización de los campos comunes en el constructor de la superclase {@link Usuario}.
     * El campo {@code tipo_usuario} se establece automáticamente por el discriminador.
     * </p>
     *
     * @param cedula    Número de cédula o documento de identidad
     * @param nombre    Nombres del administrador
     * @param apellido  Apellidos del administrador
     * @param correo    Correo electrónico (debe ser único)
     * @param contrasena Contraseña (debe almacenarse encriptada en la capa de servicio)
     */
    public UsuarioAdmin(int cedula, String nombre, String apellido,
            String correo, String contrasena) {
        super(cedula, nombre, apellido, correo, contrasena);
    }

    /**
     * Método conveniente que siempre devuelve el tipo literal "ADMIN".
     * <p>
     * Útil para verificaciones de rol sin depender del campo de la base de datos.
     * </p>
     *
     * @return siempre retorna "ADMIN"
     */
    public String getTipo() {
        return "Admin";
    }

    /**
     * Obtiene el valor del campo discriminador (fijo en "ADMIN").
     * <p>
     * Este getter existe principalmente para consistencia con la superclase y para frameworks
     * que inspeccionen la propiedad {@code tipoUsuario}.
     * No debe usarse para modificar el valor (el campo no es actualizable).
     * </p>
     *
     * @return "ADMIN"
     */
    public String getTipoUsuario() {
        return tipoUsuario;
    }

    /**
     * Representación en cadena específica para administradores.
     * <p>
     * Incluye solo el tipo de usuario, ya que los campos comunes se heredan de {@link Usuario}.
     * </p>
     *
     * @return cadena descriptiva del administrador
     */
    @Override
    public String toString() {
        return "UsuarioAdmin [tipoUsuario=" + tipoUsuario + "]";
    }

    /**
     * Genera el código hash combinando el hash de la superclase con el campo tipoUsuario.
     *
     * @return código hash del objeto
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), tipoUsuario);
    }

    /**
     * Compara este administrador con otro objeto.
     * <p>
     * Además de verificar la igualdad de los campos heredados (mediante {@code super.equals}),
     * también compara el campo {@code tipoUsuario} (aunque en teoría siempre será "ADMIN").
     * </p>
     *
     * @param obj el objeto con el que comparar
     * @return {@code true} si son iguales (incluyendo tipo de usuario), {@code false} en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (!super.equals(obj)) return false;
        UsuarioAdmin other = (UsuarioAdmin) obj;
        return Objects.equals(tipoUsuario, other.tipoUsuario);
    }
}