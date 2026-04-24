package co.edu.unbosque.paqueteriaproyecto.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * Entidad JPA que representa un trabajador con cargo administrativo
 * en el sistema de paquetería.
 * <p>
 * Subclase concreta de {@link Trabajador} dentro de la jerarquía de herencia
 * {@code SINGLE_TABLE}. Se distingue en la base de datos mediante el
 * valor discriminador {@code "Administrador"} en la columna {@code cargo}.
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
@DiscriminatorValue("Administrador")
public class TrabajadorAdministrativo extends Trabajador {

	/**
	 * Construye una nueva instancia de {@code TrabajadorAdministrativo}
	 * sin inicializar atributos.
	 * Requerido por JPA para la instanciación de entidades mediante reflexión.
	 */
	public TrabajadorAdministrativo() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Construye una nueva instancia de {@code TrabajadorAdministrativo}
	 * con los datos personales indicados, delegando la inicialización
	 * al constructor de la clase base {@link Trabajador}.
	 *
	 * @param nombre   nombre completo del trabajador administrativo; no debe estar vacío
	 * @param cedula   número de cédula de identidad del trabajador administrativo; debe ser un valor positivo válido
	 * @param telefono número de teléfono de contacto del trabajador administrativo
	 * @param email    correo electrónico del trabajador administrativo; debe tener un formato válido
	 */
	public TrabajadorAdministrativo(String nombre, long cedula, long telefono, String email) {
		super(nombre, cedula, telefono, email);
		// TODO Auto-generated constructor stub
	}
}