package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad que representa un usuario de tipo premium dentro del sistema de paquetería.
 * <p>
 * Esta clase hereda de {@link Usuario} y forma parte de una jerarquía de herencia
 * mapeada con la estrategia {@code SINGLE_TABLE}, donde el discriminador identifica
 * el tipo de usuario como {@code "Premium"}.
 * </p>
 * <p>
 * Un usuario premium posee una tarifa base predeterminada de {@code 3500.0},
 * la cual puede ser ajustada según las reglas de negocio del sistema
 * (por ejemplo, descuentos por membresía, volumen de envíos o promociones).
 * Generalmente cuenta con beneficios adicionales como tarifas reducidas,
 * prioridad en envíos o acceso a servicios exclusivos.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see Usuario
 * @see UsuarioNormal
 * @see UsuarioConcurrente
 * @see UsuarioAdmin
 */
@Entity
@DiscriminatorValue("Premium")
public class UsuarioPremium extends Usuario {

    /**
     * Tipo de usuario asociado.
     * <p>
     * Este valor es gestionado por JPA mediante el discriminador, por lo que
     * no es insertable ni actualizable directamente desde la entidad.
     * </p>
     */
    @Column(name = "tipo_usuario", insertable = false, updatable = false)
    private String tipoUsuario = "Premium";

    /**
     * Tarifa base asignada al usuario premium.
     * Valor predeterminado: {@code 3500.0}.
     */
    private double tarifa = 3500.0;

    /**
     * Constructor vacío requerido por JPA para la correcta instanciación de la entidad.
     */
    public UsuarioPremium() {
    }

    /**
     * Constructor que permite crear un usuario premium con los datos básicos.
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
    public UsuarioPremium(int cedula, String nombre, String apellido, String correo, String contrasena) {
        super(cedula, nombre, apellido, correo, contrasena);
    }

    /**
     * Obtiene la tarifa actual del usuario premium.
     *
     * @return valor de la tarifa (por defecto {@code 3500.0})
     */
    public double getTarifa() {
        return tarifa;
    }

    /**
     * Establece una nueva tarifa para el usuario premium.
     *
     * @param tarifa nuevo valor de la tarifa
     */
    public void setTarifa(double tarifa) {
        this.tarifa = tarifa;
    }

    /**
     * Obtiene el tipo de usuario.
     * <p>
     * Este valor siempre será {@code "Premium"}.
     * </p>
     *
     * @return tipo de usuario
     */
    public String getTipoUsuario() {
        return "Premium";
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
     * Retorna una representación en texto del objeto {@code UsuarioPremium}.
     *
     * @return cadena con la información del usuario
     */
    @Override
    public String toString() {
        return "UsuarioPremium [tarifa=" + tarifa + ", " + super.toString() + "]";
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
        UsuarioPremium other = (UsuarioPremium) obj;
        return Double.compare(tarifa, other.tarifa) == 0;
    }
}