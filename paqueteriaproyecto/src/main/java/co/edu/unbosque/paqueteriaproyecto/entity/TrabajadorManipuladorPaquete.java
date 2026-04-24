package co.edu.unbosque.paqueteriaproyecto.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad JPA que representa un trabajador con cargo de manipulador de paquetes
 * en el sistema de paquetería.
 * <p>
 * Subclase concreta de {@link Trabajador} dentro de la jerarquía de herencia
 * {@code SINGLE_TABLE}. Se distingue en la base de datos mediante el
 * valor discriminador {@code "Manipulador"} en la columna {@code cargo}.
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
@DiscriminatorValue("Manipulador")
public class TrabajadorManipuladorPaquete extends Trabajador {

	/**
	 * Construye una nueva instancia de {@code TrabajadorManipuladorPaquete}
	 * sin inicializar atributos.
	 * Requerido por JPA para la instanciación de entidades mediante reflexión.
	 */
	public TrabajadorManipuladorPaquete() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Construye una nueva instancia de {@code TrabajadorManipuladorPaquete}
	 * con los datos personales indicados, delegando la inicialización
	 * al constructor de la clase base {@link Trabajador}.
	 *
	 * @param nombre   nombre completo del trabajador manipulador de paquetes; no debe estar vacío
	 * @param cedula   número de cédula de identidad del trabajador manipulador de paquetes; debe ser un valor positivo válido
	 * @param telefono número de teléfono de contacto del trabajador manipulador de paquetes
	 * @param email    correo electrónico del trabajador manipulador de paquetes; debe tener un formato válido
	 */
	public TrabajadorManipuladorPaquete(String nombre, long cedula, long telefono, String email) {
		super(nombre, cedula, telefono, email);
		// TODO Auto-generated constructor stub
	}
}