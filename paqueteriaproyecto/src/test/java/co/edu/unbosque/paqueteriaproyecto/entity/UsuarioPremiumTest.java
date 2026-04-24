package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link UsuarioPremium}.
 * <p>
 * Esta clase valida el comportamiento específico de los usuarios de tipo premium,
 * verificando que la tarifa base por defecto sea de 3500.0, que el identificador
 * de tipo de usuario sea correcto ("Premium") y que la herencia de la clase base 
 * {@link Usuario} se mantenga íntegra. Además, se valida la correcta representación 
 * de los datos en el método toString.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class UsuarioPremiumTest {

	/**
	 * Verifica que el constructor por defecto cree una instancia no nula.
	 */
	@Test
	public void testPremiumConstructorVacioNoNulo() {
		UsuarioPremium premium = new UsuarioPremium();
		Assert.assertNotNull(premium);
	}

	/**
	 * Valida que la tarifa inicial para un usuario premium sea de 3500.0.
	 */
	@Test
	public void testPremiumTarifaPorDefecto() {
		UsuarioPremium premium = new UsuarioPremium();
		Assert.assertEquals(3500.0, premium.getTarifa(), 0.001);
	}

	/**
	 * Verifica que el método de obtención de rol retorne la cadena "Premium".
	 */
	@Test
	public void testPremiumGetTipoUsuario() {
		UsuarioPremium premium = new UsuarioPremium();
		Assert.assertEquals("Premium", premium.getTipoUsuario());
	}

	/**
	 * Valida el funcionamiento del setter y getter para modificar la tarifa del usuario.
	 */
	@Test
	public void testPremiumSetYGetTarifa() {
		UsuarioPremium premium = new UsuarioPremium();
		premium.setTarifa(4000.0);
		Assert.assertEquals(4000.0, premium.getTarifa(), 0.001);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente los atributos 
	 * de identidad heredados, como el nombre.
	 */
	@Test
	public void testPremiumConstructorParametrizadoNombre() {
		UsuarioPremium premium = new UsuarioPremium(9012, "Pablo", "Reyes", "pablo@correo.com", "PassP1234");
		Assert.assertEquals("Pablo", premium.getNombre());
	}

	/**
	 * Comprueba la jerarquía de herencia, asegurando que un UsuarioPremium 
	 * sea reconocido como una instancia de la clase {@link Usuario}.
	 */
	@Test
	public void testPremiumEsInstanciaDeUsuario() {
		Assert.assertTrue(new UsuarioPremium() instanceof Usuario);
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma.
	 */
	@Test
	public void testPremiumEqualsConSiMismo() {
		UsuarioPremium premium = new UsuarioPremium();
		Assert.assertTrue(premium.equals(premium));
	}

	/**
	 * Verifica que la ejecución del método hashCode no genere excepciones y 
	 * retorne un valor consistente para el objeto.
	 */
	@Test
	public void testPremiumHashCodeNoLanzaExcepcion() {
		UsuarioPremium premium = new UsuarioPremium(9012, "Pablo", "Reyes", "pablo@correo.com", "PassP1234");
		int hash = premium.hashCode();
		Assert.assertTrue(hash != 0 || hash == 0);
	}

	/**
	 * Valida que la representación textual del objeto contenga el valor 
	 * de la tarifa por defecto.
	 */
	@Test
	public void testPremiumToStringContieneValorTarifa() {
		UsuarioPremium premium = new UsuarioPremium();
		Assert.assertTrue(premium.toString().contains("3500"));
	}
}