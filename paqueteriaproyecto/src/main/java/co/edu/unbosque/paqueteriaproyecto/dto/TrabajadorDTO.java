package co.edu.unbosque.paqueteriaproyecto.dto;

import java.util.Objects;

/**
 * Objeto de Transferencia de Datos (DTO) que representa a un trabajador del sistema de paquetería.
 *
 * <p>Encapsula la información personal y laboral de un trabajador: nombre, cédula,
 * teléfono de contacto, correo electrónico y cargo que desempeña dentro de la empresa.</p>
 *
 * <p>Esta clase es utilizada para transportar datos entre las capas de la aplicación
 * (controlador, servicio, repositorio) sin exponer directamente las entidades de persistencia.</p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class TrabajadorDTO {

	/** Identificador único del trabajador generado por la base de datos. */
	private long id;

	/** Nombre completo del trabajador. */
    private String nombre;

	/** Número de cédula de identidad del trabajador. */
    private long cedula;

	/** Número de teléfono de contacto del trabajador. */
    private long telefono;

	/** Correo electrónico institucional o personal del trabajador. */
    private String email;

	/** Cargo o rol que desempeña el trabajador dentro de la empresa (por ejemplo, {@code "MENSAJERO"}, {@code "OPERADOR"}). */
    private String cargo;

	/**
	 * Constructor por defecto de {@code TrabajadorDTO}.
	 * Crea una instancia vacía; todos los campos quedan con sus valores predeterminados.
	 */
    public TrabajadorDTO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Constructor parametrizado para crear un {@code TrabajadorDTO} con los datos principales del trabajador.
	 *
	 * <p>El campo {@code id} no se incluye en este constructor ya que es asignado
	 * automáticamente por la base de datos al momento de la persistencia.</p>
	 *
	 * @param nombre    nombre completo del trabajador
	 * @param cedula    número de cédula de identidad del trabajador
	 * @param telefono  número de teléfono de contacto
	 * @param email     correo electrónico del trabajador
	 * @param cargo     cargo o rol que desempeña en la empresa
	 */
    public TrabajadorDTO(String nombre, long cedula, long telefono, String email, String cargo) {
		super();
		this.nombre = nombre;
		this.cedula = cedula;
		this.telefono = telefono;
		this.email = email;
		this.cargo = cargo;
	}

	/**
	 * Retorna el identificador único del trabajador.
	 *
	 * @return el {@code id} del trabajador asignado por la base de datos
	 */
	public long getId() {
		return id;
	}

	/**
	 * Establece el identificador único del trabajador.
	 *
	 * @param id identificador único asignado por la base de datos
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * Retorna el nombre completo del trabajador.
	 *
	 * @return nombre del trabajador
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Establece el nombre completo del trabajador.
	 *
	 * @param nombre nombre completo del trabajador; no debe estar vacío
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Retorna el número de cédula de identidad del trabajador.
	 *
	 * @return cédula del trabajador como valor {@code long}
	 */
	public long getCedula() {
		return cedula;
	}

	/**
	 * Establece el número de cédula de identidad del trabajador.
	 *
	 * @param cedula número de cédula; debe ser un valor numérico positivo válido
	 */
	public void setCedula(long cedula) {
		this.cedula = cedula;
	}

	/**
	 * Retorna el número de teléfono de contacto del trabajador.
	 *
	 * @return teléfono del trabajador como valor {@code long}
	 */
	public long getTelefono() {
		return telefono;
	}

	/**
	 * Establece el número de teléfono de contacto del trabajador.
	 *
	 * @param telefono número de teléfono; debe ser un valor numérico válido
	 */
	public void setTelefono(long telefono) {
		this.telefono = telefono;
	}

	/**
	 * Retorna el cargo o rol del trabajador dentro de la empresa.
	 *
	 * @return cargo del trabajador
	 */
	public String getCargo() {
		return cargo;
	}

	/**
	 * Establece el cargo o rol del trabajador dentro de la empresa.
	 *
	 * @param cargo cargo a asignar (por ejemplo, {@code "MENSAJERO"}, {@code "OPERADOR"})
	 */
	public void setCargo(String cargo) {
		this.cargo = cargo;
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
	 * @param email dirección de correo electrónico; debe tener un formato válido
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Retorna una representación en cadena de texto del objeto {@code TrabajadorDTO}.
	 *
	 * <p>Incluye todos los campos del DTO en formato legible, útil para depuración y registros de log.</p>
	 *
	 * @return cadena con los valores de todos los atributos del trabajador
	 */
	@Override
	public String toString() {
		return "TrabajadorDTO [id=" + id + ", nombre=" + nombre + ", cedula=" + cedula + ", telefono=" + telefono
				+ ", email=" + email + ", cargo=" + cargo + "]";
	}

	/**
	 * Calcula el código hash del objeto basándose en todos sus campos.
	 *
	 * <p>Utilizado en colecciones basadas en hash como {@link java.util.HashMap}
	 * y {@link java.util.HashSet}. Dos instancias iguales según {@link #equals(Object)}
	 * siempre producirán el mismo hash.</p>
	 *
	 * @return valor entero que representa el hash del objeto
	 */
	@Override
	public int hashCode() {
		return Objects.hash(cargo, cedula, email, id, nombre, telefono);
	}

	/**
	 * Compara este {@code TrabajadorDTO} con otro objeto para determinar si son iguales.
	 *
	 * <p>Dos instancias de {@code TrabajadorDTO} se consideran iguales si todos sus campos
	 * tienen exactamente el mismo valor. Los campos de tipo {@code long} ({@code id},
	 * {@code cedula} y {@code telefono}) se comparan directamente por valor primitivo,
	 * mientras que los de tipo {@link String} se comparan mediante {@link Objects#equals(Object, Object)}.</p>
	 *
	 * @param obj el objeto con el que se comparará esta instancia
	 * @return {@code true} si {@code obj} es un {@code TrabajadorDTO} con los mismos valores
	 *         en todos sus campos; {@code false} en cualquier otro caso
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TrabajadorDTO other = (TrabajadorDTO) obj;
		return Objects.equals(cargo, other.cargo) && cedula == other.cedula && Objects.equals(email, other.email)
				&& id == other.id && Objects.equals(nombre, other.nombre) && telefono == other.telefono;
	}

}