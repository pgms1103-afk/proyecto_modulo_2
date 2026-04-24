package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad que representa un usuario de tipo concurrente dentro del sistema de paquetería.
 * <p>
 * Esta clase hereda de {@link Usuario} y forma parte de una jerarquía de herencia
 * gestionada mediante la estrategia {@code SINGLE_TABLE} de JPA, utilizando un
 * discriminador para identificar el tipo de usuario.
 * </p>
 * <p>
 * Los usuarios concurrentes representan clientes con una tarifa estándar o base
 * dentro del sistema. Por defecto, la tarifa asignada es {@code 2000.0}, aunque
 * puede ser modificada según las reglas de negocio.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see Usuario
 * @see UsuarioAdmin
 */
@Entity
@DiscriminatorValue("Concurrente")
public class UsuarioConcurrente extends Usuario {

    /**
     * Tipo de usuario asociado a la entidad.
     * <p>
     * Este valor es gestionado automáticamente por JPA mediante el discriminador,
     * por lo que no es insertable ni actualizable directamente desde la entidad.
     * </p>
     */
    @Column(name = "tipo_usuario", insertable = false, updatable = false)
    private String tipoUsuario = "Concurrente";

    /**
     * Tarifa base asignada al usuario concurrente.
     * Valor predeterminado: {@code 2000.0}.
     */
    private double tarifa = 2000.0;

    /**
     * Constructor vacío requerido por JPA para la correcta instanciación de la entidad.
     */
    public UsuarioConcurrente() {
    }

    /**
     * Constructor parametrizado para crear un usuario concurrente.
     * <p>
     * Inicializa los atributos heredados de {@link Usuario}. La tarifa se mantiene
     * con su valor predeterminado y el tipo de usuario es gestionado por el
     * discriminador de JPA.
     * </p>
     *
     * @param cedula     número de identificación del usuario
     * @param nombre     nombre del usuario
     * @param apellido   apellido del usuario
     * @param correo     correo electrónico del usuario
     * @param contrasena contraseña del usuario (debe manejarse de forma segura en otras capas)
     */
    public UsuarioConcurrente(int cedula, String nombre, String apellido, String correo, String contrasena) {
        super(cedula, nombre, apellido, correo, contrasena);
    }

    /**
     * Obtiene la tarifa actual del usuario concurrente.
     *
     * @return valor de la tarifa asignada
     */
    public double getTarifa() {
        return tarifa;
    }

    /**
     * Establece una nueva tarifa para el usuario concurrente.
     *
     * @param tarifa nueva tarifa a asignar
     */
    public void setTarifa(double tarifa) {
        this.tarifa = tarifa;
    }

    /**
     * Obtiene el tipo de usuario.
     * <p>
     * Este método siempre retorna {@code "Concurrente"}, independientemente
     * del valor interno del atributo.
     * </p>
     *
     * @return tipo de usuario
     */
    public String getTipoUsuario() {
        return "Concurrente";
    }

    /**
     * Establece el tipo de usuario.
     * <p>
     * Este método existe por consistencia, pero su uso no es recomendado,
     * ya que el valor es gestionado por JPA y no se persiste debido a la
     * configuración del campo.
     * </p>
     *
     * @param tipoUsuario tipo de usuario a establecer
     */
    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    /**
     * Retorna una representación en cadena del objeto.
     *
     * @return cadena con la información del usuario concurrente
     */
    @Override
    public String toString() {
        return "UsuarioConcurrente [tarifa=" + tarifa + ", " + super.toString() + "]";
    }

    /**
     * Genera el código hash del objeto.
     *
     * @return valor hash calculado
     */
    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), tarifa);
    }

    /**
     * Compara este objeto con otro para determinar igualdad.
     * <p>
     * Dos objetos son considerados iguales si los atributos heredados son iguales
     * y la tarifa también coincide.
     * </p>
     *
     * @param obj objeto a comparar
     * @return {@code true} si son iguales, {@code false} en caso contrario
     */
    @Override
    public boolean equals(Object obj) {
        if (!super.equals(obj)) return false;
        UsuarioConcurrente other = (UsuarioConcurrente) obj;
        return Double.compare(tarifa, other.tarifa) == 0;
    }
}