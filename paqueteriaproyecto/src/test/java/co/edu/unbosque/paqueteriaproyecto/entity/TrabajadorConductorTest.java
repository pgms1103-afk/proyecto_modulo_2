package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Test;

/**
 * Pruebas unitarias para la entidad {@link TrabajadorConductor}.
 * <p>
 * Esta clase valida el comportamiento de la entidad que representa al personal
 * de conducción dentro del sistema. Se enfoca en verificar la correcta inicialización
 * de atributos mediante constructores, el funcionamiento de los métodos de acceso 
 * heredados y la integridad de la jerarquía de herencia con la clase base.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
public class TrabajadorConductorTest {

	/**
	 * Verifica que el constructor por defecto cree una instancia válida y no nula.
	 */
	@Test
	public void testConductorConstructorVacioNoNulo() {
		TrabajadorConductor conductor = new TrabajadorConductor();
		Assert.assertNotNull(conductor);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre 
	 * del conductor.
	 */
	@Test
	public void testConductorConstructorParametrizadoNombre() {
		TrabajadorConductor conductor = new TrabajadorConductor("Pedro Lopez", 9876543210L, 3109876543L, "pedro@correo.com");
		Assert.assertEquals("Pedro Lopez", conductor.getNombre());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el número de cédula.
	 */
	@Test
	public void testConductorConstructorParametrizadoCedula() {
		TrabajadorConductor conductor = new TrabajadorConductor("Pedro Lopez", 9876543210L, 3109876543L, "pedro@correo.com");
		Assert.assertEquals(9876543210L, conductor.getCedula());
	}

	/**
	 * Comprueba la jerarquía de clases, asegurando que un TrabajadorConductor 
	 * sea reconocido como una instancia de la clase {@link Trabajador}.
	 */
	@Test
	public void testConductorEsInstanciaDeTrabajador() {
		TrabajadorConductor conductor = new TrabajadorConductor();
		Assert.assertTrue(conductor instanceof Trabajador);
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el nombre completo.
	 */
	@Test
	public void testConductorSetYGetNombre() {
		TrabajadorConductor conductor = new TrabajadorConductor();
		conductor.setNombre("Miguel Torres");
		Assert.assertEquals("Miguel Torres", conductor.getNombre());
	}

	/**
	 * Verifica que el método toString no devuelva un valor nulo y represente 
	 * correctamente la entidad.
	 */
	@Test
	public void testConductorToStringNoNulo() {
		TrabajadorConductor conductor = new TrabajadorConductor("Pedro Lopez", 9876543210L, 3109876543L, "pedro@correo.com");
		Assert.assertNotNull(conductor.toString());
	}

}