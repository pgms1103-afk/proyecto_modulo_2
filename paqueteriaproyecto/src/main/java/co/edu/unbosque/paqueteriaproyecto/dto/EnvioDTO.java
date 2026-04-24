package co.edu.unbosque.paqueteriaproyecto.dto;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Objeto de Transferencia de Datos (DTO) que representa un envío dentro del sistema de paquetería.
 *
 * <p>Encapsula toda la información asociada a un envío: tipo de paquete, descripción,
 * peso, dirección de destino, costo calculado, fechas de envío y entrega, y si la
 * entrega se realizó a tiempo.</p>
 *
 * <p>Esta clase es utilizada para transportar datos entre las capas de la aplicación
 * (controlador, servicio, repositorio) sin exponer directamente las entidades de persistencia.</p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class EnvioDTO {

	/** Identificador único del envío generado por la base de datos. */
	private Long id;

	/** Categoría o tipo del paquete a enviar (por ejemplo, {@code "FRAGIL"}, {@code "NORMAL"}). */
	private String tipoPaquete;

	/** Descripción del contenido o características especiales del paquete. */
	private String descripcion;

	/** Peso del paquete en kilogramos. */
	private double peso;

	/** Dirección completa del destinatario a donde se realizará el envío. */
	private String direccionDestino;

	/** Costo total calculado del envío en la moneda del sistema. */
	private double costo;

	/** Fecha y hora en que se registró o despachó el envío. */
	private LocalDateTime fechaEnvio;

	/** Fecha y hora estimada o real de entrega del paquete al destinatario. */
	private LocalDateTime fechaEntrega;

	/** Indica si el paquete fue entregado dentro del plazo acordado. */
	private boolean entregaATiempo;

	/**
	 * Constructor por defecto de {@code EnvioDTO}.
	 * Crea una instancia vacía; todos los campos quedan con sus valores predeterminados.
	 */
	public EnvioDTO() {
	}

	/**
	 * Constructor parametrizado para crear un {@code EnvioDTO} con los datos principales del envío.
	 *
	 * <p>Los campos {@code id}, {@code costo} y {@code entregaATiempo} no se incluyen
	 * en este constructor ya que son calculados o asignados posteriormente por la lógica de negocio.</p>
	 *
	 * @param tipoPaquete       categoría o tipo del paquete
	 * @param descripcion       descripción del contenido del paquete
	 * @param peso              peso del paquete en kilogramos
	 * @param direccionDestino  dirección completa del destinatario
	 * @param fechaEnvio        fecha y hora de despacho del envío
	 * @param fechaEntrega      fecha y hora estimada o real de entrega
	 */
	public EnvioDTO(String tipoPaquete, String descripcion, double peso, String direccionDestino,
			LocalDateTime fechaEnvio, LocalDateTime fechaEntrega) {
		this.tipoPaquete = tipoPaquete;
		this.descripcion = descripcion;
		this.peso = peso;
		this.direccionDestino = direccionDestino;
		this.fechaEnvio = fechaEnvio;
		this.fechaEntrega = fechaEntrega;
	}

	/**
	 * Retorna el identificador único del envío.
	 *
	 * @return el {@code id} del envío, o {@code null} si aún no ha sido persistido
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Establece el identificador único del envío.
	 *
	 * @param id identificador único asignado por la base de datos
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Retorna el tipo o categoría del paquete.
	 *
	 * @return cadena de texto con el tipo de paquete
	 */
	public String getTipoPaquete() {
		return tipoPaquete;
	}

	/**
	 * Establece el tipo o categoría del paquete.
	 *
	 * @param tipoPaquete categoría del paquete (por ejemplo, {@code "FRAGIL"}, {@code "NORMAL"})
	 */
	public void setTipoPaquete(String tipoPaquete) {
		this.tipoPaquete = tipoPaquete;
	}

	/**
	 * Retorna la descripción del contenido o características del paquete.
	 *
	 * @return descripción del paquete
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Establece la descripción del contenido o características del paquete.
	 *
	 * @param descripcion texto descriptivo del paquete
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * Retorna el peso del paquete en kilogramos.
	 *
	 * @return peso del paquete como valor {@code double}
	 */
	public double getPeso() {
		return peso;
	}

	/**
	 * Establece el peso del paquete en kilogramos.
	 *
	 * @param peso peso del paquete; debe ser un valor positivo mayor que cero
	 */
	public void setPeso(double peso) {
		this.peso = peso;
	}

	/**
	 * Retorna la dirección completa del destinatario.
	 *
	 * @return dirección de destino del envío
	 */
	public String getDireccionDestino() {
		return direccionDestino;
	}

	/**
	 * Establece la dirección completa del destinatario.
	 *
	 * @param direccionDestino dirección a la que se despachará el paquete
	 */
	public void setDireccionDestino(String direccionDestino) {
		this.direccionDestino = direccionDestino;
	}

	/**
	 * Retorna el costo total calculado del envío.
	 *
	 * @return costo del envío como valor {@code double}
	 */
	public double getCosto() {
		return costo;
	}

	/**
	 * Establece el costo total del envío.
	 *
	 * @param costo valor monetario calculado para el envío; debe ser positivo
	 */
	public void setCosto(double costo) {
		this.costo = costo;
	}

	/**
	 * Retorna la fecha y hora en que se registró o despachó el envío.
	 *
	 * @return {@link LocalDateTime} con la fecha y hora de envío
	 */
	public LocalDateTime getFechaEnvio() {
		return fechaEnvio;
	}

	/**
	 * Establece la fecha y hora de despacho del envío.
	 *
	 * @param fechaEnvio fecha y hora en que el paquete fue despachado
	 */
	public void setFechaEnvio(LocalDateTime fechaEnvio) {
		this.fechaEnvio = fechaEnvio;
	}

	/**
	 * Retorna la fecha y hora estimada o real de entrega del paquete.
	 *
	 * @return {@link LocalDateTime} con la fecha y hora de entrega
	 */
	public LocalDateTime getFechaEntrega() {
		return fechaEntrega;
	}

	/**
	 * Establece la fecha y hora estimada o real de entrega del paquete.
	 *
	 * @param fechaEntrega fecha y hora en que el paquete fue o será entregado al destinatario
	 */
	public void setFechaEntrega(LocalDateTime fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	/**
	 * Indica si el paquete fue entregado dentro del plazo acordado.
	 *
	 * @return {@code true} si la entrega se realizó a tiempo; {@code false} en caso contrario
	 */
	public boolean isEntregaATiempo() {
		return entregaATiempo;
	}

	/**
	 * Establece si el paquete fue entregado dentro del plazo acordado.
	 *
	 * @param entregaATiempo {@code true} si la entrega fue puntual; {@code false} si hubo retraso
	 */
	public void setEntregaATiempo(boolean entregaATiempo) {
		this.entregaATiempo = entregaATiempo;
	}

	/**
	 * Retorna una representación en cadena de texto del objeto {@code EnvioDTO}.
	 *
	 * <p>Incluye todos los campos del DTO en formato legible, útil para depuración y registros de log.</p>
	 *
	 * @return cadena con los valores de todos los atributos del envío
	 */
	@Override
	public String toString() {
		return "EnvioDTO [id=" + id + ", tipoPaquete=" + tipoPaquete + ", descripcion=" + descripcion + ", peso=" + peso
				+ ", direccionDestino=" + direccionDestino + ", costo=" + costo + ", fechaEnvio=" + fechaEnvio
				+ ", fechaEntrega=" + fechaEntrega + ", entregaATiempo=" + entregaATiempo + "]";
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
		return Objects.hash(costo, descripcion, direccionDestino, entregaATiempo, fechaEntrega, fechaEnvio, id, peso,
				tipoPaquete);
	}

	/**
	 * Compara este {@code EnvioDTO} con otro objeto para determinar si son iguales.
	 *
	 * <p>Dos instancias de {@code EnvioDTO} se consideran iguales si todos sus campos
	 * tienen el mismo valor. Para los campos de tipo {@code double} ({@code costo} y {@code peso})
	 * se utiliza {@link Double#doubleToLongBits(double)} para una comparación precisa
	 * que evita problemas de precisión de punto flotante.</p>
	 *
	 * @param obj el objeto con el que se comparará esta instancia
	 * @return {@code true} si {@code obj} es un {@code EnvioDTO} con los mismos valores
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
		EnvioDTO other = (EnvioDTO) obj;
		return Double.doubleToLongBits(costo) == Double.doubleToLongBits(other.costo)
				&& Objects.equals(descripcion, other.descripcion)
				&& Objects.equals(direccionDestino, other.direccionDestino) && entregaATiempo == other.entregaATiempo
				&& Objects.equals(fechaEntrega, other.fechaEntrega) && Objects.equals(fechaEnvio, other.fechaEnvio)
				&& Objects.equals(id, other.id) && Double.doubleToLongBits(peso) == Double.doubleToLongBits(other.peso)
				&& Objects.equals(tipoPaquete, other.tipoPaquete);
	}


}