package co.edu.unbosque.paqueteriaproyecto.entity;

import java.time.LocalDateTime;
import java.util.Objects;
import jakarta.persistence.*;

/**
 * Entidad JPA que representa un envío en el sistema de paquetería.
 * <p>
 * Almacena la información completa de un envío, incluyendo el tipo de paquete,
 * su descripción, peso, dirección de destino, costo calculado, fechas de envío
 * y entrega, y si la entrega se realizó a tiempo.
 * </p>
 *
 * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "envio")
public class Envio {

	/**
	 * Identificador único del envío, generado automáticamente por la base de datos.
	 * Anotado con {@code @Id} y {@code @GeneratedValue} con estrategia {@code IDENTITY}.
	 */
	private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

	/** Tipo de paquete asociado al envío (por ejemplo, {@code "FRAGIL"}, {@code "NORMAL"}). */
	private String tipoPaquete;

	/** Descripción del contenido o características especiales del paquete. */
	private String descripcion;

	/** Peso del paquete en kilogramos; debe ser un valor positivo mayor que cero. */
	private double peso;

	/** Dirección completa del destinatario a donde se realizará el envío. */
	private String direccionDestino;

	/** Costo calculado del envío en la moneda del sistema; debe ser un valor positivo. */
	private double costo;

	/** Fecha y hora programada para el despacho del envío. */
	private LocalDateTime fechaEnvio;

	/** Fecha y hora estimada o real de entrega del envío al destinatario. */
	private LocalDateTime fechaEntrega;

	/** Indica si el envío fue entregado dentro del plazo establecido. */
	private boolean entregaATiempo;

	/**
	 * Construye una nueva instancia de {@code Envio} sin inicializar atributos.
	 * Requerido por JPA para la instanciación de entidades mediante reflexión.
	 */
	public Envio() {
	}

	/**
	 * Construye una nueva instancia de {@code Envio} con los datos del paquete indicados.
	 *
	 * <p>El campo {@code id} no se incluye en este constructor ya que es asignado
	 * automáticamente por la base de datos al momento de la persistencia.
	 * El campo {@code entregaATiempo} es calculado posteriormente por la lógica de negocio.</p>
	 *
	 * @param tipoPaquete      tipo de paquete a enviar (por ejemplo, {@code "FRAGIL"}, {@code "NORMAL"})
	 * @param descripcion      descripción del contenido del paquete
	 * @param peso             peso del paquete en kilogramos; debe ser positivo
	 * @param direccionDestino dirección completa del destinatario
	 * @param costo            costo calculado del envío; debe ser positivo
	 * @param fechaEnvio       fecha y hora programada para el despacho
	 * @param fechaEntrega     fecha y hora estimada o real de entrega
	 */
	public Envio(String tipoPaquete, String descripcion, double peso, String direccionDestino, double costo,
			LocalDateTime fechaEnvio, LocalDateTime fechaEntrega) {
		this.tipoPaquete = tipoPaquete;
		this.descripcion = descripcion;
		this.peso = peso;
		this.direccionDestino = direccionDestino;
		this.costo = costo;
		this.fechaEnvio = fechaEnvio;
		this.fechaEntrega = fechaEntrega;
	}

	/**
	 * Retorna el identificador único del envío.
	 *
	 * @return identificador único del envío, o {@code null} si aún no ha sido persistido
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Establece el identificador único del envío.
	 *
	 * @param id nuevo identificador único del envío asignado por la base de datos
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Retorna el tipo de paquete asociado al envío.
	 *
	 * @return tipo de paquete del envío
	 */
	public String getTipoPaquete() {
		return tipoPaquete;
	}

	/**
	 * Establece el tipo de paquete asociado al envío.
	 *
	 * @param tipoPaquete nuevo tipo de paquete del envío
	 */
	public void setTipoPaquete(String tipoPaquete) {
		this.tipoPaquete = tipoPaquete;
	}

	/**
	 * Retorna la descripción del contenido del paquete.
	 *
	 * @return descripción del paquete
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Establece la descripción del contenido del paquete.
	 *
	 * @param descripcion nueva descripción del paquete
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * Retorna el peso del paquete en kilogramos.
	 *
	 * @return peso del paquete en kilogramos
	 */
	public double getPeso() {
		return peso;
	}

	/**
	 * Establece el peso del paquete en kilogramos.
	 *
	 * @param peso nuevo peso del paquete en kilogramos; debe ser un valor positivo
	 */
	public void setPeso(double peso) {
		this.peso = peso;
	}

	/**
	 * Retorna la dirección de destino del envío.
	 *
	 * @return dirección completa del destinatario
	 */
	public String getDireccionDestino() {
		return direccionDestino;
	}

	/**
	 * Establece la dirección de destino del envío.
	 *
	 * @param direccionDestino nueva dirección completa del destinatario
	 */
	public void setDireccionDestino(String direccionDestino) {
		this.direccionDestino = direccionDestino;
	}

	/**
	 * Retorna el costo calculado del envío.
	 *
	 * @return costo del envío en la moneda del sistema
	 */
	public double getCosto() {
		return costo;
	}

	/**
	 * Establece el costo calculado del envío.
	 *
	 * @param costo nuevo costo del envío en la moneda del sistema; debe ser positivo
	 */
	public void setCosto(double costo) {
		this.costo = costo;
	}

	/**
	 * Retorna la fecha y hora programada para el despacho del envío.
	 *
	 * @return {@link LocalDateTime} con la fecha y hora de envío
	 */
	public LocalDateTime getFechaEnvio() {
		return fechaEnvio;
	}

	/**
	 * Establece la fecha y hora programada para el despacho del envío.
	 *
	 * @param fechaEnvio nueva fecha y hora en que el paquete será despachado
	 */
	public void setFechaEnvio(LocalDateTime fechaEnvio) {
		this.fechaEnvio = fechaEnvio;
	}

	/**
	 * Retorna la fecha y hora estimada o real de entrega del envío.
	 *
	 * @return {@link LocalDateTime} con la fecha y hora de entrega
	 */
	public LocalDateTime getFechaEntrega() {
		return fechaEntrega;
	}

	/**
	 * Establece la fecha y hora estimada o real de entrega del envío.
	 *
	 * @param fechaEntrega nueva fecha y hora en que el paquete fue o será entregado
	 */
	public void setFechaEntrega(LocalDateTime fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	/**
	 * Indica si el envío fue entregado dentro del plazo establecido.
	 *
	 * @return {@code true} si la entrega se realizó a tiempo;
	 *         {@code false} en caso contrario
	 */
	public boolean isEntregaATiempo() {
		return entregaATiempo;
	}

	/**
	 * Establece si el envío fue entregado dentro del plazo establecido.
	 *
	 * @param entregaATiempo {@code true} si la entrega se realizó a tiempo;
	 *                       {@code false} si hubo retraso
	 */
	public void setEntregaATiempo(boolean entregaATiempo) {
		this.entregaATiempo = entregaATiempo;
	}

	/**
	 * Retorna una representación en cadena de texto del envío, incluyendo
	 * todos sus atributos. Útil para depuración y registros de log.
	 *
	 * @return cadena de texto con los datos completos del envío
	 */
	@Override
	public String toString() {
		return "Envio [id=" + id + ", tipoPaquete=" + tipoPaquete + ", descripcion=" + descripcion + ", peso=" + peso
				+ ", direccionDestino=" + direccionDestino + ", costo=" + costo + ", fechaEnvio=" + fechaEnvio
				+ ", fechaEntrega=" + fechaEntrega + ", entregaATiempo=" + entregaATiempo + "]";
	}

	/**
	 * Calcula el código hash del envío basándose en todos sus atributos:
	 * costo, descripción, dirección de destino, estado de entrega a tiempo,
	 * fecha de entrega, fecha de envío, ID, peso y tipo de paquete.
	 *
	 * <p>Utilizado en colecciones basadas en hash como {@link java.util.HashMap}
	 * y {@link java.util.HashSet}. Dos instancias iguales según {@link #equals(Object)}
	 * siempre producirán el mismo hash.</p>
	 *
	 * @return valor entero que representa el hash del envío
	 */
	@Override
	public int hashCode() {
		return Objects.hash(costo, descripcion, direccionDestino, entregaATiempo, fechaEntrega, fechaEnvio, id, peso,
				tipoPaquete);
	}

	/**
	 * Compara este envío con otro objeto para determinar si son iguales.
	 * <p>
	 * Dos instancias de {@code Envio} se consideran iguales si comparten el mismo
	 * ID, tipo de paquete, descripción, peso, dirección de destino, costo, fechas
	 * de envío y entrega, y estado de entrega a tiempo. La comparación de los campos
	 * {@code double} ({@code costo} y {@code peso}) se realiza mediante
	 * {@link Double#doubleToLongBits(double)} para garantizar precisión y evitar
	 * problemas de punto flotante.
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
		Envio other = (Envio) obj;
		return Double.doubleToLongBits(costo) == Double.doubleToLongBits(other.costo)
				&& Objects.equals(descripcion, other.descripcion)
				&& Objects.equals(direccionDestino, other.direccionDestino) && entregaATiempo == other.entregaATiempo
				&& Objects.equals(fechaEntrega, other.fechaEntrega) && Objects.equals(fechaEnvio, other.fechaEnvio)
				&& Objects.equals(id, other.id) && Double.doubleToLongBits(peso) == Double.doubleToLongBits(other.peso)
				&& Objects.equals(tipoPaquete, other.tipoPaquete);
	}

}