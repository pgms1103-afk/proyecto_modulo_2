package co.edu.unbosque.paqueteriaproyecto.entity;

import java.util.Objects;
import org.hibernate.annotations.DiscriminatorOptions;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

/**
 * Entidad JPA abstracta que representa la clase base de un trabajador en el sistema de paquetería.
 * <p>
 * Define la jerarquía de herencia con estrategia {@code SINGLE_TABLE}, donde todas las
 * subclases se almacenan en la tabla {@code trabajador} y se diferencian mediante la
 * columna discriminadora {@code cargo}. La opción {@code force = true} en
 * {@code @DiscriminatorOptions} garantiza que la restricción del discriminador se aplique
 * incluso en consultas polimórficas.
 * </p>
 * <p>
 * Las subclases concretas deben definir su propio valor de discriminador mediante
 * {@code @DiscriminatorValue} para indicar el cargo que representan dentro del sistema.
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "trabajador")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "cargo")
@DiscriminatorOptions(force = true)
public abstract class Trabajador {

	/**
	 * Identificador único del trabajador, generado automáticamente por la base de datos.
	 * Anotado con {@code @Id} y {@code @GeneratedValue} con estrategia {@code IDENTITY}.
	 */
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) long id;

	/** Nombre completo del trabajador. */
	private String nombre;

	/** Número de cédula de identidad del trabajador. */
	private long cedula;

	/** Número de teléfono de contacto del trabajador. */
	private long telefono;

	/** Correo electrónico institucional o personal del trabajador. */
	private String email;

	/**
	 * Construye una nueva instancia de {@code Trabajador} sin inicializar atributos.
	 * Requerido por JPA para la instanciación de entidades mediante reflexión.
	 */
	public Trabajador() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Construye una nueva instancia de {@code Trabajador} con los datos personales indicados.
	 *
	 * <p>El campo {@code id} no se incluye en este constructor ya que es asignado
	 * automáticamente por la base de datos al momento de la persistencia.</p>
	 *
	 * @param nombre   nombre completo del trabajador; no debe estar vacío
	 * @param cedula   número de cédula de identidad del trabajador; debe ser un valor positivo válido
	 * @param telefono número de teléfono de contacto del trabajador
	 * @param email    correo electrónico del trabajador; debe tener un formato válido
	 */
	public Trabajador(String nombre, long cedula, long telefono, String email) {
		super();
		this.nombre = nombre;
		this.cedula = cedula;
		this.telefono = telefono;
		this.email = email;
	}

	/**
	 * Retorna el identificador único del trabajador.
	 *
	 * @return identificador único del trabajador asignado por la base de datos
	 */
	public long getId() {
		return id;
	}

	/**
	 * Establece el identificador único del trabajador.
	 *
	 * @param id nuevo identificador único asignado por la base de datos
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * Retorna el nombre completo del trabajador.
	 *
	 * @return nombre completo del trabajador
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Establece el nombre completo del trabajador.
	 *
	 * @param nombre nuevo nombre completo del trabajador; no debe estar vacío
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Retorna el número de cédula de identidad del trabajador.
	 *
	 * @return número de cédula del trabajador como valor {@code long}
	 */
	public long getCedula() {
		return cedula;
	}

	/**
	 * Establece el número de cédula de identidad del trabajador.
	 *
	 * @param cedula nuevo número de cédula; debe ser un valor numérico positivo válido
	 */
	public void setCedula(long cedula) {
		this.cedula = cedula;
	}

	/**
	 * Retorna el número de teléfono de contacto del trabajador.
	 *
	 * @return número de teléfono del trabajador como valor {@code long}
	 */
	public long getTelefono() {
		return telefono;
	}

	/**
	 * Establece el número de teléfono de contacto del trabajador.
	 *
	 * @param telefono nuevo número de teléfono del trabajador
	 */
	public void setTelefono(long telefono) {
		this.telefono = telefono;
	}

	/**
	 * Retorna el correo electrónico del trabajador.
	 *
	 * @return dirección de correo electrónico del trabajador
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Establece el correo electrónico del trabajador.
	 *
	 * @param email nuevo correo electrónico del trabajador; debe tener un formato válido
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Retorna una representación en cadena de texto del trabajador, incluyendo
	 * todos sus atributos. Útil para depuración y registros de log.
	 *
	 * <p>Nota: el campo {@code cargo} es gestionado por JPA como columna discriminadora
	 * y no es un atributo de instancia, por lo que aparece vacío en esta representación.</p>
	 *
	 * @return cadena de texto con los datos del trabajador
	 */
	@Override
	public String toString() {
		return "Trabajador [id=" + id + ", nombre=" + nombre + ", cedula=" + cedula + ", telefono=" + telefono
				+ ", email=" + email + ", cargo=" + "]";
	}

	/**
	 * Calcula el código hash del trabajador basándose en su cédula, correo
	 * electrónico, ID, nombre y teléfono.
	 *
	 * <p>Utilizado en colecciones basadas en hash como {@link java.util.HashMap}
	 * y {@link java.util.HashSet}. Dos instancias iguales según {@link #equals(Object)}
	 * siempre producirán el mismo hash.</p>
	 *
	 * @return valor entero que representa el hash del trabajador
	 */
	@Override
	public int hashCode() {
		return Objects.hash(cedula, email, id, nombre, telefono);
	}

	/**
	 * Compara este trabajador con otro objeto para determinar si son iguales.
	 * <p>
	 * Dos instancias de {@code Trabajador} se consideran iguales si comparten
	 * el mismo ID, cédula, nombre, teléfono y correo electrónico. Los campos de
	 * tipo {@code long} ({@code id}, {@code cedula} y {@code telefono}) se comparan
	 * directamente por valor primitivo, mientras que los campos {@link String}
	 * ({@code nombre} y {@code email}) se comparan mediante {@link Objects#equals(Object, Object)}.
	 * </p>
	 *
	 * @param obj objeto con el que se desea comparar esta instancia
	 * @return {@code true} si ambos objetos son iguales en todos sus campos;
	 *         {@code false} en caso contrario
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Trabajador other = (Trabajador) obj;
		return cedula == other.cedula && Objects.equals(email, other.email) && id == other.id
				&& Objects.equals(nombre, other.nombre) && telefono == other.telefono;
	}
}