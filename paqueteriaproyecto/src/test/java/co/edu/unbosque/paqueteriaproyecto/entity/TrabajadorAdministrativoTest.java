package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link TrabajadorAdministrativo}.
 * <p>
 * Esta clase se encarga de validar el correcto funcionamiento de la entidad
 * que representa al personal administrativo dentro del sistema. Se verifican 
 * los constructores, la asignación de atributos heredados y propios, y la 
 * consistencia de la jerarquía de clases mediante la comprobación de tipos.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
public class TrabajadorAdministrativoTest {

	/**
	 * Verifica que el constructor vacío inicialice correctamente una instancia no nula.
	 */
	@Test
	public void testAdminConstructorVacioNoNulo() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		Assert.assertNotNull(admin);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre.
	 */
	@Test
	public void testAdminConstructorParametrizadoNombre() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertEquals("Ana Garcia", admin.getNombre());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el número de cédula.
	 */
	@Test
	public void testAdminConstructorParametrizadoCedula() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertEquals(1234567890L, admin.getCedula());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el teléfono de contacto.
	 */
	@Test
	public void testAdminConstructorParametrizadoTelefono() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertEquals(3001234567L, admin.getTelefono());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el correo electrónico.
	 */
	@Test
	public void testAdminConstructorParametrizadoEmail() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertEquals("ana@correo.com", admin.getEmail());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el nombre completo.
	 */
	@Test
	public void testAdminSetYGetNombre() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		admin.setNombre("Laura Perez");
		Assert.assertEquals("Laura Perez", admin.getNombre());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el número de cédula.
	 */
	@Test
	public void testAdminSetYGetCedula() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		admin.setCedula(9876543210L);
		Assert.assertEquals(9876543210L, admin.getCedula());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el teléfono.
	 */
	@Test
	public void testAdminSetYGetTelefono() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		admin.setTelefono(3119876543L);
		Assert.assertEquals(3119876543L, admin.getTelefono());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el email institucional.
	 */
	@Test
	public void testAdminSetYGetEmail() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		admin.setEmail("nuevo@correo.com");
		Assert.assertEquals("nuevo@correo.com", admin.getEmail());
	}

	/**
	 * Verifica la asignación y obtención del identificador de base de datos.
	 */
	@Test
	public void testAdminSetYGetId() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		admin.setId(1L);
		Assert.assertEquals(1L, admin.getId());
	}

	/**
	 * Comprueba la jerarquía de herencia, asegurando que un TrabajadorAdministrativo
	 * sea reconocido como una instancia de la clase base {@link Trabajador}.
	 */
	@Test
	public void testAdminEsInstanciaDeTrabajador() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo();
		Assert.assertTrue(admin instanceof Trabajador);
	}

	/**
	 * Verifica que la representación textual de la entidad no sea nula y contenga datos.
	 */
	@Test
	public void testAdminToStringNoNulo() {
		TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
		Assert.assertNotNull(admin.toString());
	}

}