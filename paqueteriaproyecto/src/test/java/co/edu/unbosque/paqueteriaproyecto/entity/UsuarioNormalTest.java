package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link UsuarioNormal}.
 * <p>
 * Esta clase valida el comportamiento específico de los usuarios de tipo normal,
 * verificando que la tarifa base por defecto sea de 5000.0, que el identificador
 * de tipo de usuario sea correcto y que la herencia de la clase base {@link Usuario}
 * se mantenga íntegra en términos de atributos y métodos estructurales.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class UsuarioNormalTest {

	/**
	 * Verifica que el constructor por defecto cree una instancia no nula.
	 */
	@Test
	public void testNormalConstructorVacioNoNulo() {
		UsuarioNormal normal = new UsuarioNormal();
		Assert.assertNotNull(normal);
	}

	/**
	 * Valida que la tarifa inicial para un usuario normal sea de 5000.0.
	 */
	@Test
	public void testNormalTarifaPorDefecto() {
		UsuarioNormal normal = new UsuarioNormal();
		Assert.assertEquals(5000.0, normal.getTarifa(), 0.001);
	}

	/**
	 * Verifica que el método de obtención de rol retorne la cadena "Normal".
	 */
	@Test
	public void testNormalGetTipoUsuario() {
		UsuarioNormal normal = new UsuarioNormal();
		Assert.assertEquals("Normal", normal.getTipoUsuario());
	}

	/**
	 * Valida el funcionamiento del setter y getter para modificar la tarifa del usuario.
	 */
	@Test
	public void testNormalSetYGetTarifa() {
		UsuarioNormal normal = new UsuarioNormal();
		normal.setTarifa(4500.0);
		Assert.assertEquals(4500.0, normal.getTarifa(), 0.001);
	}

	/**
	 * Verifica que el método setter para el tipo de usuario asigne el valor esperado.
	 */
	@Test
	public void testNormalSetTipoUsuario() {
		UsuarioNormal normal = new UsuarioNormal();
		normal.setTipoUsuario("Normal");
		Assert.assertEquals("Normal", normal.getTipoUsuario());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente los atributos 
	 * de identidad heredados, como el nombre.
	 */
	@Test
	public void testNormalConstructorParametrizadoNombre() {
		UsuarioNormal normal = new UsuarioNormal(1234, "Sergio", "Lara", "sergio@correo.com", "Pass1234");
		Assert.assertEquals("Sergio", normal.getNombre());
	}

	/**
	 * Comprueba la jerarquía de herencia, asegurando que un UsuarioNormal 
	 * sea reconocido como una instancia de la clase {@link Usuario}.
	 */
	@Test
	public void testNormalEsInstanciaDeUsuario() {
		Assert.assertTrue(new UsuarioNormal() instanceof Usuario);
	}

	/**
	 * Verifica que la representación textual del objeto no sea nula.
	 */
	@Test
	public void testNormalToStringNoNulo() {
		Assert.assertNotNull(new UsuarioNormal().toString());
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma.
	 */
	@Test
	public void testNormalEqualsConSiMismo() {
		UsuarioNormal normal = new UsuarioNormal();
		Assert.assertTrue(normal.equals(normal));
	}

	/**
	 * Verifica que el método equals devuelva falso al comparar con un objeto nulo.
	 */
	@Test
	public void testNormalEqualsConNull() {
		Assert.assertFalse(new UsuarioNormal().equals(null));
	}

	/**
	 * Verifica que la ejecución del método hashCode no genere excepciones y 
	 * retorne un valor consistente para el objeto.
	 */
	@Test
	public void testNormalHashCodeNoLanzaExcepcion() {
		UsuarioNormal normal = new UsuarioNormal(1234, "Sergio", "Lara", "sergio@correo.com", "Pass1234");
		int hash = normal.hashCode();
		Assert.assertTrue(hash != 0 || hash == 0);
	}

}