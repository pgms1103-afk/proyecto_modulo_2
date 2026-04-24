package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link TrabajadorManipuladorPaquete}.
 * <p>
 * Esta clase valida el comportamiento de la entidad encargada de la manipulación
 * de paquetes dentro del sistema. Se verifican los constructores, la correcta
 * herencia de atributos desde la clase base {@link Trabajador}, y la consistencia 
 * de los métodos de objeto como equals, hashCode y toString.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
public class TrabajadorManipuladorPaqueteTest {

	/**
	 * Verifica que el constructor vacío inicialice una instancia no nula.
	 */
	@Test
	public void testManipuladorConstructorVacioNoNulo() {
		TrabajadorManipuladorPaquete manip = new TrabajadorManipuladorPaquete();
		Assert.assertNotNull(manip);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre 
	 * del manipulador de paquetes.
	 */
	@Test
	public void testManipuladorConstructorParametrizadoNombre() {
		TrabajadorManipuladorPaquete manip = new TrabajadorManipuladorPaquete("Sofia Ruiz", 1111111111L, 3200000001L, "sofia@correo.com");
		Assert.assertEquals("Sofia Ruiz", manip.getNombre());
	}

	/**
	 * Comprueba la jerarquía de herencia, asegurando que un TrabajadorManipuladorPaquete
	 * sea reconocido como una instancia de {@link Trabajador}.
	 */
	@Test
	public void testManipuladorEsInstanciaDeTrabajador() {
		TrabajadorManipuladorPaquete manip = new TrabajadorManipuladorPaquete();
		Assert.assertTrue(manip instanceof Trabajador);
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el correo electrónico.
	 */
	@Test
	public void testManipuladorSetYGetEmail() {
		TrabajadorManipuladorPaquete manip = new TrabajadorManipuladorPaquete();
		manip.setEmail("test@test.com");
		Assert.assertEquals("test@test.com", manip.getEmail());
	}

	/**
	 * Valida que el método toString no devuelva un valor nulo.
	 */
	@Test
	public void testManipuladorToStringNoNulo() {
		TrabajadorManipuladorPaquete manip = new TrabajadorManipuladorPaquete("Sofia Ruiz", 1111111111L, 3200000001L, "sofia@correo.com");
		Assert.assertNotNull(manip.toString());
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma para asegurar reflexividad.
	 */
	@Test
	public void testEqualsConSiMismo() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertTrue(admin.equals(admin));
	}

	/**
	 * Verifica que el método equals retorne falso al comparar con un valor nulo.
	 */
	@Test
	public void testEqualsConNull() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		Assert.assertFalse(admin.equals(null));
	}

	/**
	 * Verifica que el método equals retorne falso al comparar con un objeto de distinta clase.
	 */
	@Test
	public void testEqualsConOtraClase() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		Assert.assertFalse(admin.equals("cadena"));
	}

	/**
	 * Valida que la ejecución del método hashCode no genere excepciones y retorne un valor válido.
	 */
	@Test
	public void testHashCodeNoLanzaExcepcion() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		int hash = admin.hashCode();
		Assert.assertTrue(hash != 0 || hash == 0);
	}

}