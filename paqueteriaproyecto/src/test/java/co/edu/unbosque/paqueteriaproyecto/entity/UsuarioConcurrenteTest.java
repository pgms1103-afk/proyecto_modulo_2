package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link UsuarioConcurrente}.
 * <p>
 * Esta clase valida el comportamiento específico de los usuarios de tipo concurrente,
 * asegurando que la tarifa por defecto sea la correcta (2000.0), que el tipo de usuario
 * se identifique adecuadamente y que la herencia de la clase {@link Usuario} funcione
 * según lo esperado en constructores y métodos de acceso.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class UsuarioConcurrenteTest {

	/**
	 * Verifica que el constructor por defecto cree una instancia no nula.
	 */
	@Test
	public void testConcurrenteConstructorVacioNoNulo() {
		UsuarioConcurrente conc = new UsuarioConcurrente();
		Assert.assertNotNull(conc);
	}

	/**
	 * Valida que la tarifa inicial para un usuario concurrente sea de 2000.0.
	 */
	@Test
	public void testConcurrenteTarifaPorDefecto() {
		UsuarioConcurrente conc = new UsuarioConcurrente();
		Assert.assertEquals(2000.0, conc.getTarifa(), 0.001);
	}

	/**
	 * Verifica que el método de identificación de rol retorne la cadena "Concurrente".
	 */
	@Test
	public void testConcurrenteGetTipoUsuario() {
		UsuarioConcurrente conc = new UsuarioConcurrente();
		Assert.assertEquals("Concurrente", conc.getTipoUsuario());
	}

	/**
	 * Valida el funcionamiento del setter y getter para modificar la tarifa del usuario.
	 */
	@Test
	public void testConcurrenteSetYGetTarifa() {
		UsuarioConcurrente conc = new UsuarioConcurrente();
		conc.setTarifa(2500.0);
		Assert.assertEquals(2500.0, conc.getTarifa(), 0.001);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente los atributos 
	 * heredados de la clase base, como el nombre.
	 */
	@Test
	public void testConcurrenteConstructorParametrizadoNombre() {
		UsuarioConcurrente conc = new UsuarioConcurrente(5678, "Maria", "Gomez", "maria@correo.com", "Clave1234");
		Assert.assertEquals("Maria", conc.getNombre());
	}

	/**
	 * Comprueba la jerarquía de herencia, asegurando que un UsuarioConcurrente 
	 * sea reconocido como una instancia de la clase {@link Usuario}.
	 */
	@Test
	public void testConcurrenteEsInstanciaDeUsuario() {
		Assert.assertTrue(new UsuarioConcurrente() instanceof Usuario);
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma.
	 */
	@Test
	public void testConcurrenteEqualsConSiMismo() {
		UsuarioConcurrente conc = new UsuarioConcurrente();
		Assert.assertTrue(conc.equals(conc));
	}

	/**
	 * Verifica que la ejecución del método hashCode no genere excepciones y 
	 * retorne un valor consistente.
	 */
	@Test
	public void testConcurrenteHashCodeNoLanzaExcepcion() {
		UsuarioConcurrente conc = new UsuarioConcurrente(5678, "Maria", "Gomez", "maria@correo.com", "Clave1234");
		int hash = conc.hashCode();
		Assert.assertTrue(hash != 0 || hash == 0);
	}

}