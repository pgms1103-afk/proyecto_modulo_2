package co.edu.unbosque.paqueteriaproyecto.entity;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

/**
 * Pruebas unitarias para la entidad {@link Envio}.
 * <p>
 * Esta clase se encarga de validar el comportamiento de la entidad que representa
 * un envío en el sistema de persistencia. Verifica que los constructores, métodos
 * de acceso y métodos de objeto (equals, hashCode, toString) funcionen correctamente
 * para asegurar la integridad de los datos almacenados.
 * </p>
 * * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 */
public class EnvioTest {

	/** Instancia de la entidad Envio utilizada para las pruebas. */
	private Envio envio;
	
	/** Fecha de envío de referencia. */
	private LocalDateTime fechaEnvio;
	
	/** Fecha de entrega de referencia. */
	private LocalDateTime fechaEntrega;

	/**
	 * Configuración inicial antes de cada prueba.
	 * Inicializa un objeto {@link Envio} con datos válidos de tipo Alimenticio.
	 */
	@Before
	public void setUp() {
		fechaEnvio   = LocalDateTime.of(2025, 6, 1, 8, 0);
		fechaEntrega = LocalDateTime.of(2025, 6, 1, 12, 0);
		envio = new Envio("Alimenticio", "Frutas", 3.0, "Calle 10 #20-30", 15000.0, fechaEnvio, fechaEntrega);
	}

	/**
	 * Verifica que el constructor vacío no retorne una instancia nula.
	 */
	@Test
	public void testConstructorVacioNoNulo() {
		Assert.assertNotNull(new Envio());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el tipo de paquete.
	 */
	@Test
	public void testConstructorParametrizadoTipo() {
		Assert.assertEquals("Alimenticio", envio.getTipoPaquete());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la descripción.
	 */
	@Test
	public void testConstructorParametrizadoDescripcion() {
		Assert.assertEquals("Frutas", envio.getDescripcion());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el peso.
	 */
	@Test
	public void testConstructorParametrizadoPeso() {
		Assert.assertEquals(3.0, envio.getPeso(), 0.001);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la dirección de destino.
	 */
	@Test
	public void testConstructorParametrizadoDireccion() {
		Assert.assertEquals("Calle 10 #20-30", envio.getDireccionDestino());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el costo del envío.
	 */
	@Test
	public void testConstructorParametrizadoCosto() {
		Assert.assertEquals(15000.0, envio.getCosto(), 0.001);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la fecha de envío.
	 */
	@Test
	public void testConstructorParametrizadoFechaEnvio() {
		Assert.assertEquals(fechaEnvio, envio.getFechaEnvio());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la fecha de entrega.
	 */
	@Test
	public void testConstructorParametrizadoFechaEntrega() {
		Assert.assertEquals(fechaEntrega, envio.getFechaEntrega());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el identificador de la entidad.
	 */
	@Test
	public void testSetYGetId() {
		envio.setId(5L);
		Assert.assertEquals(Long.valueOf(5L), envio.getId());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el tipo de paquete.
	 */
	@Test
	public void testSetYGetTipoPaquete() {
		envio.setTipoPaquete("Carta");
		Assert.assertEquals("Carta", envio.getTipoPaquete());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para la descripción.
	 */
	@Test
	public void testSetYGetDescripcion() {
		envio.setDescripcion("Documentos");
		Assert.assertEquals("Documentos", envio.getDescripcion());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el peso.
	 */
	@Test
	public void testSetYGetPeso() {
		envio.setPeso(10.0);
		Assert.assertEquals(10.0, envio.getPeso(), 0.001);
	}

	/**
	 * Verifica el funcionamiento del setter y getter para la dirección de destino.
	 */
	@Test
	public void testSetYGetDireccionDestino() {
		envio.setDireccionDestino("Av 30 #5-10");
		Assert.assertEquals("Av 30 #5-10", envio.getDireccionDestino());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para el costo.
	 */
	@Test
	public void testSetYGetCosto() {
		envio.setCosto(5000.0);
		Assert.assertEquals(5000.0, envio.getCosto(), 0.001);
	}

	/**
	 * Verifica el funcionamiento del setter y getter para la fecha de envío.
	 */
	@Test
	public void testSetYGetFechaEnvio() {
		LocalDateTime nueva = LocalDateTime.of(2025, 8, 1, 9, 0);
		envio.setFechaEnvio(nueva);
		Assert.assertEquals(nueva, envio.getFechaEnvio());
	}

	/**
	 * Verifica el funcionamiento del setter y getter para la fecha de entrega.
	 */
	@Test
	public void testSetYGetFechaEntrega() {
		LocalDateTime nueva = LocalDateTime.of(2025, 8, 2, 9, 0);
		envio.setFechaEntrega(nueva);
		Assert.assertEquals(nueva, envio.getFechaEntrega());
	}

	/**
	 * Verifica la correcta asignación del estado de entrega a tiempo.
	 */
	@Test
	public void testSetYGetEntregaATiempo() {
		envio.setEntregaATiempo(true);
		Assert.assertTrue(envio.isEntregaATiempo());
	}

	/**
	 * Comprueba que un objeto nuevo tenga el estado de entrega a tiempo en falso por defecto.
	 */
	@Test
	public void testEntregaATiempoFalsePorDefecto() {
		Envio nuevo = new Envio();
		Assert.assertFalse(nuevo.isEntregaATiempo());
	}

	/**
	 * Evalúa el método equals comparando la instancia consigo misma.
	 */
	@Test
	public void testEqualsConSiMismo() {
		Assert.assertTrue(envio.equals(envio));
	}

	/**
	 * Evalúa el método equals comparando con un objeto nulo.
	 */
	@Test
	public void testEqualsConNull() {
		Assert.assertFalse(envio.equals(null));
	}

	/**
	 * Evalúa el método equals comparando con una clase distinta.
	 */
	@Test
	public void testEqualsConOtraClase() {
		Assert.assertFalse(envio.equals("cadena"));
	}

	/**
	 * Evalúa que dos entidades con los mismos datos sean consideradas iguales.
	 */
	@Test
	public void testEqualsConObjetoIgual() {
		Envio copia = new Envio("Alimenticio", "Frutas", 3.0, "Calle 10 #20-30", 15000.0, fechaEnvio, fechaEntrega);
		Assert.assertTrue(envio.equals(copia));
	}

	/**
	 * Evalúa que dos entidades con datos distintos sean consideradas diferentes.
	 */
	@Test
	public void testEqualsConObjetoDiferente() {
		Envio otro = new Envio("Carta", "Otro", 1.0, "Otra calle 1 #1-1", 2000.0, fechaEnvio, fechaEntrega);
		Assert.assertFalse(envio.equals(otro));
	}

	/**
	 * Asegura que el valor hash sea el mismo para dos objetos iguales en contenido.
	 */
	@Test
	public void testHashCodeIgualParaObjetosIguales() {
		Envio copia = new Envio("Alimenticio", "Frutas", 3.0, "Calle 10 #20-30", 15000.0, fechaEnvio, fechaEntrega);
		Assert.assertEquals(envio.hashCode(), copia.hashCode());
	}

	/**
	 * Verifica que la representación en cadena no sea nula.
	 */
	@Test
	public void testToStringNoNulo() {
		Assert.assertNotNull(envio.toString());
	}

	/**
	 * Verifica que la representación en cadena contenga información clave del envío.
	 */
	@Test
	public void testToStringContieneTipo() {
		Assert.assertTrue(envio.toString().contains("Alimenticio"));
	}
}