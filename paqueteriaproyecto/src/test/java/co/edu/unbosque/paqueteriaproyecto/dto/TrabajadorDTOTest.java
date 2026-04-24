package co.edu.unbosque.paqueteriaproyecto.dto;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * Pruebas unitarias para el objeto de transferencia de datos {@link TrabajadorDTO}.
 * <p>
 * Esta clase valida la integridad de los datos dentro del DTO de trabajadores,
 * asegurando que los constructores inicialicen los valores correctamente,
 * que los métodos de acceso funcionen de manera esperada y que los métodos
 * de comparación y representación (equals, hashCode y toString) sean consistentes.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
public class TrabajadorDTOTest {

	/** Instancia base del DTO de trabajador para realizar las comparaciones y validaciones. */
	private TrabajadorDTO dto;

	/**
	 * Configuración previa a la ejecución de cada prueba.
	 * Se encarga de instanciar un objeto {@link TrabajadorDTO} con datos de prueba
	 * consistentes (Juan Perez, Conductor).
	 */
	@Before
	public void setUp() {
		dto = new TrabajadorDTO("Juan Perez", 1234567890L, 3001234567L, "juan@correo.com", "Conductor");
	}

	/**
	 * Verifica que el constructor vacío cree una instancia válida y no nula del objeto.
	 */
	@Test
	public void testConstructorVacioNoNulo() {
		TrabajadorDTO vacio = new TrabajadorDTO();
		Assert.assertNotNull(vacio);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre del trabajador.
	 */
	@Test
	public void testConstructorNombre() {
		Assert.assertEquals("Juan Perez", dto.getNombre());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el número de cédula.
	 */
	@Test
	public void testConstructorCedula() {
		Assert.assertEquals(1234567890L, dto.getCedula());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el número telefónico.
	 */
	@Test
	public void testConstructorTelefono() {
		Assert.assertEquals(3001234567L, dto.getTelefono());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el correo electrónico.
	 */
	@Test
	public void testConstructorEmail() {
		Assert.assertEquals("juan@correo.com", dto.getEmail());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el cargo asignado.
	 */
	@Test
	public void testConstructorCargo() {
		Assert.assertEquals("Conductor", dto.getCargo());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el identificador único.
	 */
	@Test
	public void testSetYGetId() {
		dto.setId(10L);
		Assert.assertEquals(10L, dto.getId());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el nombre completo.
	 */
	@Test
	public void testSetYGetNombre() {
		dto.setNombre("Maria Lopez");
		Assert.assertEquals("Maria Lopez", dto.getNombre());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para la cédula.
	 */
	@Test
	public void testSetYGetCedula() {
		dto.setCedula(9876543210L);
		Assert.assertEquals(9876543210L, dto.getCedula());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el teléfono.
	 */
	@Test
	public void testSetYGetTelefono() {
		dto.setTelefono(3109876543L);
		Assert.assertEquals(3109876543L, dto.getTelefono());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el email.
	 */
	@Test
	public void testSetYGetEmail() {
		dto.setEmail("nuevo@correo.com");
		Assert.assertEquals("nuevo@correo.com", dto.getEmail());
	}

	/**
	 * Verifica el funcionamiento de los métodos setter y getter para el cargo laboral.
	 */
	@Test
	public void testSetYGetCargo() {
		dto.setCargo("Administrador");
		Assert.assertEquals("Administrador", dto.getCargo());
	}

	/**
	 * Comprueba que la comparación del objeto consigo mismo resulte exitosa.
	 */
	@Test
	public void testEqualsConSiMismo() {
		Assert.assertTrue(dto.equals(dto));
	}

	/**
	 * Comprueba que el método equals retorne falso al comparar con un objeto nulo.
	 */
	@Test
	public void testEqualsConNull() {
		Assert.assertFalse(dto.equals(null));
	}

	/**
	 * Comprueba que el método equals retorne falso al comparar con un tipo de dato diferente.
	 */
	@Test
	public void testEqualsConOtraClase() {
		Assert.assertFalse(dto.equals(42));
	}

	/**
	 * Valida que dos objetos con los mismos atributos sean considerados iguales por el método equals.
	 */
	@Test
	public void testEqualsConObjetoIgual() {
		TrabajadorDTO copia = new TrabajadorDTO("Juan Perez", 1234567890L, 3001234567L, "juan@correo.com", "Conductor");
		Assert.assertTrue(dto.equals(copia));
	}

	/**
	 * Valida que dos objetos con atributos diferentes sean reconocidos como distintos.
	 */
	@Test
	public void testEqualsConObjetoDiferente() {
		TrabajadorDTO otro = new TrabajadorDTO("Ana Gomez", 1111111111L, 3009999999L, "ana@correo.com", "Manipulador");
		Assert.assertFalse(dto.equals(otro));
	}

	/**
	 * Verifica que el valor hash generado sea idéntico para dos objetos con los mismos datos.
	 */
	@Test
	public void testHashCodeIgualParaObjetosIguales() {
		TrabajadorDTO copia = new TrabajadorDTO("Juan Perez", 1234567890L, 3001234567L, "juan@correo.com", "Conductor");
		Assert.assertEquals(dto.hashCode(), copia.hashCode());
	}

	/**
	 * Comprueba que el método toString no retorne un valor nulo.
	 */
	@Test
	public void testToStringNoNulo() {
		Assert.assertNotNull(dto.toString());
	}

	/**
	 * Valida que la representación textual del objeto incluya información clave como el nombre.
	 */
	@Test
	public void testToStringContieneNombre() {
		Assert.assertTrue(dto.toString().contains("Juan Perez"));
	}
}