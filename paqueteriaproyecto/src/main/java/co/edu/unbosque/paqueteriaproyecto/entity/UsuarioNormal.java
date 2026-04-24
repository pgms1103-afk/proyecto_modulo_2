package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad que representa un usuario de tipo normal dentro del sistema de paquetería.
 * <p>
 * Esta clase hereda de {@link Usuario} y forma parte de una jerarquía de herencia
 * mapeada con la estrategia {@code SINGLE_TABLE}, donde el discriminador identifica
 * el tipo de usuario como {@code "Normal"}.
 * </p>
 * <p>
 * Un usuario normal posee una tarifa base predeterminada de {@code 5000.0},
 * la cual puede ser modificada según las reglas de negocio del sistema
 * (por ejemplo, promociones o volumen de envíos).
 * Representa clientes regulares con tarifas diferenciadas de otros tipos de usuario.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see Usuario
 * @see UsuarioAdmin
 * @see UsuarioConcurrente
 */
@Entity
@DiscriminatorValue("Normal")
public class UsuarioNormal extends Usuario {

    /**
     * Tipo de usuario asociado.
     * <p>
     * Este valor es gestionado por JPA mediante el discriminador, por lo que
     * no es insertable ni actualizable directamente desde la entidad.
     * </p>
     */
    @Column(name = "tipo_usuario", insertable = false, updatable = false)
    private String tipoUsuario = "Normal";

    /**
     * Tarifa base asignada al usuario normal.
     * Valor predeterminado: {@code 5000.0}.
     */
    private double tarifa = 5000.0;

    /**
     * Constructor vacío requerido por JPA para la correcta instanciación de la entidad.
     */
    public UsuarioNormal() {
    }

    /**
     * Constructor que permite crear un usuario normal con los datos básicos.
     * <p>
     * Inicializa los atributos heredados de {@link Usuario}. La tarifa se mantiene
     * con su valor por defecto y el tipo de usuario es definido automáticamente
     * por el discriminador de JPA.
     * </p>
     *
     * @param cedula número de identificación del usuario
     * @param nombre nombre del usuario
     * @param apellido apellido del usuario
     * @param correo correo electrónico del usuario
     * @param contrasena contraseña del usuario (debe gestionarse de forma segura)
     */
    public UsuarioNormal(int cedula, String nombre, String apellido, String correo, String contrasena) {
        super(cedula, nombre, apellido, correo, contrasena);
    }

    /**
     * Obtiene la tarifa actual del usuario normal.
     *
     * @return valor de la tarifa (por defecto {@code 5000.0})
     */
    public double getTarifa() {
        return tarifa;
    }

    /**
     * Establece una nueva tarifa para el usuario normal.
     *
     * @param tarifa nuevo valor de la tarifa
     */
    public void setTarifa(double tarifa) {
        this.tarifa = tarifa;
    }

    /**
     * Obtiene el tipo de usuario.
     * <p>
     * Este valor siempre será {@code "Normal"}.
     * </p>
     *
     * @return tipo de usuario
     */
    public String getTipoUsuario() {
        return "Normal";
    }

    /**
     * Establece el tipo de usuario.
     * <p>
     * <strong>Nota:</strong> Este método no tiene efecto en la persistencia,
     * ya que el valor es controlado por el discriminador de JPA.
     * </p>
     *
     * @param tipoUsuario tipo de usuario a asignar
     */
    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    /**
     * Retorna una representación en texto del objeto {@code UsuarioNormal}.
     *
     * @return cadena con la información del usuario
     */
    @Override
    public String toString() {
        return "UsuarioNormal [tarifa=" + tarifa + ", " + super.toString() + "]";
    }

    /**
     * Calcula el código hash del objeto basado en los atributos relevantes.
     *
     * @return valor hash del objeto
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), tarifa);
    }

    /**
     * Compara este objeto con otro para determinar si son iguales.
     * <p>
     * Dos objetos se consideran iguales si sus atributos heredados son iguales
     * y además tienen la misma tarifa.
     * </p>
     *
     * @param obj objeto a comparar
     * @return {@code true} si son iguales, {@code false} en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (!super.equals(obj))
            return false;
        UsuarioNormal other = (UsuarioNormal) obj;
        return Double.compare(tarifa, other.tarifa) == 0;
    }
}