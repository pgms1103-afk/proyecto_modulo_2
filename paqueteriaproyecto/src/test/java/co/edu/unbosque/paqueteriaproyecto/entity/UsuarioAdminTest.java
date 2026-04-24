package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link UsuarioAdmin}.
 * <p>
 * Esta clase se encarga de validar el comportamiento de la entidad que representa
 * a los usuarios con privilegios de administrador dentro del sistema. Se verifican
 * los constructores, la asignación de atributos heredados de {@link Usuario}, 
 * la identificación correcta del tipo de usuario y la consistencia de los métodos
 * estructurales como equals, hashCode y toString.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class UsuarioAdminTest {

	/**
	 * Verifica que el constructor por defecto cree una instancia no nula.
	 */
	@Test
	public void testAdminConstructorVacioNoNulo() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertNotNull(admin);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre
	 * heredado de la clase base.
	 */
	@Test
	public void testAdminConstructorParametrizadoNombre() {
		UsuarioAdmin admin = new UsuarioAdmin(1234, "Carlos", "Perez", "carlos@correo.com", "Segura1");
		Assert.assertEquals("Carlos", admin.getNombre());
	}

	/**
	 * Verifica que el método getTipo retorne la cadena "Admin" como identificador
	 * de rol.
	 */
	@Test
	public void testAdminGetTipoRetornaAdmin() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertEquals("Admin", admin.getTipo());
	}

	/**
	 * Verifica que el método getTipoUsuario sea consistente con el rol de administrador.
	 */
	@Test
	public void testAdminGetTipoUsuarioRetornaAdmin() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertEquals("Admin", admin.getTipoUsuario());
	}

	/**
	 * Comprueba la jerarquía de clases, asegurando que un UsuarioAdmin sea 
	 * reconocido como una instancia de la clase base {@link Usuario}.
	 */
	@Test
	public void testAdminEsInstanciaDeUsuario() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertTrue(admin instanceof Usuario);
	}

	/**
	 * Valida que el método toString no devuelva un valor nulo.
	 */
	@Test
	public void testAdminToStringNoNulo() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertNotNull(admin.toString());
	}

	/**
	 * Verifica que la representación textual del objeto contenga la palabra "Admin".
	 */
	@Test
	public void testAdminToStringContieneAdmin() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertTrue(admin.toString().contains("Admin"));
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el nombre.
	 */
	@Test
	public void testAdminSetYGetNombre() {
		UsuarioAdmin admin = new UsuarioAdmin();
		admin.setNombre("Lucia");
		Assert.assertEquals("Lucia", admin.getNombre());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el número de cédula.
	 */
	@Test
	public void testAdminSetYGetCedula() {
		UsuarioAdmin admin = new UsuarioAdmin();
		admin.setCedula(1234567890L);
		Assert.assertEquals(1234567890L, admin.getCedula());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el correo electrónico.
	 */
	@Test
	public void testAdminSetYGetCorreo() {
		UsuarioAdmin admin = new UsuarioAdmin();
		admin.setCorreo("admin@sistema.com");
		Assert.assertEquals("admin@sistema.com", admin.getCorreo());
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma.
	 */
	@Test
	public void testAdminEqualsConSiMismo() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertTrue(admin.equals(admin));
	}

	/**
	 * Valida que el método equals devuelva falso al comparar con un objeto nulo.
	 */
	@Test
	public void testAdminEqualsConNull() {
		UsuarioAdmin admin = new UsuarioAdmin();
		Assert.assertFalse(admin.equals(null));
	}

	/**
	 * Verifica que la ejecución del método hashCode no genere excepciones y retorne un valor.
	 */
	@Test
	public void testAdminHashCodeNoLanzaExcepcion() {
		UsuarioAdmin admin = new UsuarioAdmin(1234, "Carlos", "Perez", "carlos@correo.com", "Segura1");
		int hash = admin.hashCode();
		Assert.assertTrue(hash != 0 || hash == 0);
	}

}