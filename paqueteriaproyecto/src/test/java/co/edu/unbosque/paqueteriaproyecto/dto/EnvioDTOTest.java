package co.edu.unbosque.paqueteriaproyecto.dto;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.time.LocalDateTime;

/**
 * Pruebas unitarias para el objeto de transferencia de datos {@link EnvioDTO}.
 * <p>
 * Esta clase verifica el correcto funcionamiento de los constructores (vacío y parametrizado),
 * los métodos de acceso (getters y setters), así como los métodos sobrescritos 
 * {@code equals}, {@code hashCode} y {@code toString}.
 * </p>
 * * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 */
public class EnvioDTOTest {

	/** Instancia del DTO de envío utilizada para las pruebas. */
	private EnvioDTO dto;
	
	/** Fecha de envío de referencia para las pruebas. */
	private LocalDateTime fechaEnvio;
	
	/** Fecha de entrega de referencia para las pruebas. */
	private LocalDateTime fechaEntrega;

	/**
	 * Configuración inicial antes de cada caso de prueba.
	 * Inicializa las fechas y crea una instancia de {@link EnvioDTO} con datos válidos.
	 */
	@Before
	public void setUp() {
		fechaEnvio = LocalDateTime.of(2025, 6, 1, 8, 0);
		fechaEntrega = LocalDateTime.of(2025, 6, 1, 12, 0);
		dto = new EnvioDTO("Alimenticio", "Frutas frescas", 5.0, "Calle 45 #12-30", fechaEnvio, fechaEntrega);
	}

	/**
	 * Valida que el constructor por defecto cree una instancia no nula.
	 */
	@Test
	public void testConstructorVacioNoNulo() {
		EnvioDTO vacio = new EnvioDTO();
		Assert.assertNotNull("El constructor vacío no debe retornar null", vacio);
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente el tipo de paquete.
	 */
	@Test
	public void testConstructorParametrizadoTipoPaquete() {
		Assert.assertEquals("Alimenticio", dto.getTipoPaquete());
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente la descripción.
	 */
	@Test
	public void testConstructorParametrizadoDescripcion() {
		Assert.assertEquals("Frutas frescas", dto.getDescripcion());
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente el peso.
	 */
	@Test
	public void testConstructorParametrizadoPeso() {
		Assert.assertEquals(5.0, dto.getPeso(), 0.001);
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente la dirección de destino.
	 */
	@Test
	public void testConstructorParametrizadoDireccion() {
		Assert.assertEquals("Calle 45 #12-30", dto.getDireccionDestino());
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente la fecha de envío.
	 */
	@Test
	public void testConstructorParametrizadoFechaEnvio() {
		Assert.assertEquals(fechaEnvio, dto.getFechaEnvio());
	}

	/**
	 * Verifica que el constructor parametrizado asigne correctamente la fecha de entrega.
	 */
	@Test
	public void testConstructorParametrizadoFechaEntrega() {
		Assert.assertEquals(fechaEntrega, dto.getFechaEntrega());
	}

	/**
	 * Valida el funcionamiento del setter y getter para el identificador único.
	 */
	@Test
	public void testSetYGetId() {
		dto.setId(99L);
		Assert.assertEquals(Long.valueOf(99L), dto.getId());
	}

	/**
	 * Valida el funcionamiento del setter y getter para el tipo de paquete.
	 */
	@Test
	public void testSetYGetTipoPaquete() {
		dto.setTipoPaquete("Carta");
		Assert.assertEquals("Carta", dto.getTipoPaquete());
	}

	/**
	 * Valida el funcionamiento del setter y getter para la descripción.
	 */
	@Test
	public void testSetYGetDescripcion() {
		dto.setDescripcion("Documentos importantes");
		Assert.assertEquals("Documentos importantes", dto.getDescripcion());
	}

	/**
	 * Valida el funcionamiento del setter y getter para el peso.
	 */
	@Test
	public void testSetYGetPeso() {
		dto.setPeso(12.5);
		Assert.assertEquals(12.5, dto.getPeso(), 0.001);
	}

	/**
	 * Valida el funcionamiento del setter y getter para la dirección de destino.
	 */
	@Test
	public void testSetYGetDireccionDestino() {
		dto.setDireccionDestino("Carrera 10 #20-50");
		Assert.assertEquals("Carrera 10 #20-50", dto.getDireccionDestino());
	}

	/**
	 * Valida el funcionamiento del setter y getter para el costo del envío.
	 */
	@Test
	public void testSetYGetCosto() {
		dto.setCosto(25000.0);
		Assert.assertEquals(25000.0, dto.getCosto(), 0.001);
	}

	/**
	 * Valida el funcionamiento del setter y getter para la fecha de envío.
	 */
	@Test
	public void testSetYGetFechaEnvio() {
		LocalDateTime nueva = LocalDateTime.of(2025, 7, 1, 10, 0);
		dto.setFechaEnvio(nueva);
		Assert.assertEquals(nueva, dto.getFechaEnvio());
	}

	/**
	 * Valida el funcionamiento del setter y getter para la fecha de entrega.
	 */
	@Test
	public void testSetYGetFechaEntrega() {
		LocalDateTime nueva = LocalDateTime.of(2025, 7, 2, 10, 0);
		dto.setFechaEntrega(nueva);
		Assert.assertEquals(nueva, dto.getFechaEntrega());
	}

	/**
	 * Valida el funcionamiento del setter y getter para el estado de entrega a tiempo.
	 */
	@Test
	public void testSetYGetEntregaATiempo() {
		dto.setEntregaATiempo(true);
		Assert.assertTrue(dto.isEntregaATiempo());
	}

	/**
	 * Verifica que por defecto la entrega a tiempo sea falsa en un objeto nuevo.
	 */
	@Test
	public void testEntregaATiempoFalsePorDefecto() {
		EnvioDTO nuevo = new EnvioDTO();
		Assert.assertFalse(nuevo.isEntregaATiempo());
	}

	/**
	 * Comprueba que el método {@code equals} devuelva true al comparar con la misma instancia.
	 */
	@Test
	public void testEqualsConSiMismo() {
		Assert.assertTrue(dto.equals(dto));
	}

	/**
	 * Comprueba que el método {@code equals} devuelva false al comparar con null.
	 */
	@Test
	public void testEqualsConNull() {
		Assert.assertFalse(dto.equals(null));
	}

	/**
	 * Comprueba que el método {@code equals} devuelva false al comparar con una clase distinta.
	 */
	@Test
	public void testEqualsConOtraClase() {
		Assert.assertFalse(dto.equals("cadena"));
	}

	/**
	 * Valida que el método {@code equals} reconozca como iguales dos objetos con los mismos datos.
	 */
	@Test
	public void testEqualsConObjetoIgual() {
		EnvioDTO copia = new EnvioDTO("Alimenticio", "Frutas frescas", 5.0, "Calle 45 #12-30", fechaEnvio, fechaEntrega);
		Assert.assertTrue(dto.equals(copia));
	}

	/**
	 * Valida que el método {@code equals} reconozca como diferentes dos objetos con datos distintos.
	 */
	@Test
	public void testEqualsConObjetoDiferente() {
		EnvioDTO otro = new EnvioDTO("Carta", "Otro", 1.0, "Otra dirección 1 #2-3", fechaEnvio, fechaEntrega);
		Assert.assertFalse(dto.equals(otro));
	}

	/**
	 * Verifica que el {@code hashCode} sea idéntico para dos objetos considerados iguales.
	 */
	@Test
	public void testHashCodeIgualParaObjetosIguales() {
		EnvioDTO copia = new EnvioDTO("Alimenticio", "Frutas frescas", 5.0, "Calle 45 #12-30", fechaEnvio, fechaEntrega);
		Assert.assertEquals(dto.hashCode(), copia.hashCode());
	}

	/**
	 * Valida que la representación en cadena incluya información relevante como el tipo de paquete.
	 */
	@Test
	public void testToStringContieneTipoPaquete() {
		Assert.assertTrue(dto.toString().contains("Alimenticio"));
	}

	/**
	 * Verifica que el método {@code toString} no devuelva un valor nulo.
	 */
	@Test
	public void testToStringNoNulo() {
		Assert.assertNotNull(dto.toString());
	}
}