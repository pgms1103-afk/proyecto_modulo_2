package co.edu.unbosque.paqueteriaproyecto.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad JPA que representa un trabajador con cargo de conductor
 * en el sistema de paquetería.
 * <p>
 * Subclase concreta de {@link Trabajador} dentro de la jerarquía de herencia
 * {@code SINGLE_TABLE}. Se distingue en la base de datos mediante el
 * valor discriminador {@code "Conductor"} en la columna {@code cargo}.
 * </p>
 * <p>
 * No define atributos propios; hereda todos los campos de {@link Trabajador}
 * (identificador, nombre, cédula, teléfono y correo electrónico).
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 * @see Trabajador
 */
@Entity
@DiscriminatorValue("Conductor")
public class TrabajadorConductor extends Trabajador {

	/**
	 * Construye una nueva instancia de {@code TrabajadorConductor}
	 * sin inicializar atributos.
	 * Requerido por JPA para la instanciación de entidades mediante reflexión.
	 */
	public TrabajadorConductor() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Construye una nueva instancia de {@code TrabajadorConductor}
	 * con los datos personales indicados, delegando la inicialización
	 * al constructor de la clase base {@link Trabajador}.
	 *
	 * @param nombre   nombre completo del trabajador conductor; no debe estar vacío
	 * @param cedula   número de cédula de identidad del trabajador conductor; debe ser un valor positivo válido
	 * @param telefono número de teléfono de contacto del trabajador conductor
	 * @param email    correo electrónico del trabajador conductor; debe tener un formato válido
	 */
	public TrabajadorConductor(String nombre, long cedula, long telefono, String email) {
		super(nombre, cedula, telefono, email);
		// TODO Auto-generated constructor stub
	}
}