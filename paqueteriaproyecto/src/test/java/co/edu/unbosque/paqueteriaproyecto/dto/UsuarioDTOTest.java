package co.edu.unbosque.paqueteriaproyecto.dto;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * Pruebas unitarias para el objeto de transferencia de datos {@link UsuarioDTO}.
 * <p>
 * Esta clase se encarga de validar el correcto funcionamiento de los constructores,
 * métodos de acceso (getters/setters) y la consistencia de los métodos estructurales
 * como equals, hashCode y toString dentro del POJO de Usuarios.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
public class UsuarioDTOTest {

	/** Instancia del DTO de usuario para la ejecución de pruebas. */
	private UsuarioDTO dto;

	/**
	 * Configuración inicial antes de cada caso de prueba.
	 * Crea un objeto {@link UsuarioDTO} con datos predefinidos para validar
	 * la asignación de atributos y comportamiento de los métodos.
	 */
	@Before
	public void setUp() {
		dto = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 5000.0);
	}

	/**
	 * Verifica que el constructor sin parámetros inicialice el objeto correctamente.
	 */
	@Test
	public void testConstructorVacioNoNulo() {
		UsuarioDTO vacio = new UsuarioDTO();
		Assert.assertNotNull(vacio);
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la cédula.
	 */
	@Test
	public void testConstructorCedula() {
		Assert.assertEquals(1234567890L, dto.getCedula());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el nombre.
	 */
	@Test
	public void testConstructorNombre() {
		Assert.assertEquals("Carlos", dto.getNombre());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el apellido.
	 */
	@Test
	public void testConstructorApellido() {
		Assert.assertEquals("Ramirez", dto.getApellido());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el correo electrónico.
	 */
	@Test
	public void testConstructorCorreo() {
		Assert.assertEquals("carlos@correo.com", dto.getCorreo());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la contraseña.
	 */
	@Test
	public void testConstructorContrasena() {
		Assert.assertEquals("Segura1234", dto.getContrasena());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente el tipo de usuario.
	 */
	@Test
	public void testConstructorTipoUsuario() {
		Assert.assertEquals("Normal", dto.getTipoUsuario());
	}

	/**
	 * Valida que el constructor parametrizado asigne correctamente la tarifa aplicada.
	 */
	@Test
	public void testConstructorTarifa() {
		Assert.assertEquals(5000.0, dto.getTarifa(), 0.001);
	}

	/**
	 * Verifica la asignación y obtención del identificador único del usuario.
	 */
	@Test
	public void testSetYGetId() {
		dto.setId(1L);
		Assert.assertEquals(1L, dto.getId());
	}

	/**
	 * Verifica la asignación y obtención del número de cédula.
	 */
	@Test
	public void testSetYGetCedula() {
		dto.setCedula(9876543210L);
		Assert.assertEquals(9876543210L, dto.getCedula());
	}

	/**
	 * Verifica la asignación y obtención del nombre del usuario.
	 */
	@Test
	public void testSetYGetNombre() {
		dto.setNombre("Luis");
		Assert.assertEquals("Luis", dto.getNombre());
	}

	/**
	 * Verifica la asignación y obtención del apellido del usuario.
	 */
	@Test
	public void testSetYGetApellido() {
		dto.setApellido("Torres");
		Assert.assertEquals("Torres", dto.getApellido());
	}

	/**
	 * Verifica la asignación y obtención del correo electrónico.
	 */
	@Test
	public void testSetYGetCorreo() {
		dto.setCorreo("nuevo@ejemplo.com");
		Assert.assertEquals("nuevo@ejemplo.com", dto.getCorreo());
	}

	/**
	 * Verifica la asignación y obtención de la contraseña de acceso.
	 */
	@Test
	public void testSetYGetContrasena() {
		dto.setContrasena("NuevaPass1");
		Assert.assertEquals("NuevaPass1", dto.getContrasena());
	}

	/**
	 * Verifica la asignación y obtención del rol o tipo de usuario.
	 */
	@Test
	public void testSetYGetTipoUsuario() {
		dto.setTipoUsuario("Premium");
		Assert.assertEquals("Premium", dto.getTipoUsuario());
	}

	/**
	 * Verifica la asignación y obtención del valor de la tarifa.
	 */
	@Test
	public void testSetYGetTarifa() {
		dto.setTarifa(3500.0);
		Assert.assertEquals(3500.0, dto.getTarifa(), 0.001);
	}

	/**
	 * Comprueba que el método equals reconozca la identidad de la misma instancia.
	 */
	@Test
	public void testEqualsConSiMismo() {
		Assert.assertTrue(dto.equals(dto));
	}

	/**
	 * Valida que la comparación con un objeto nulo resulte en falso.
	 */
	@Test
	public void testEqualsConNull() {
		Assert.assertFalse(dto.equals(null));
	}

	/**
	 * Valida que la comparación con un tipo de dato incompatible resulte en falso.
	 */
	@Test
	public void testEqualsConOtraClase() {
		Assert.assertFalse(dto.equals("texto"));
	}

	/**
	 * Verifica que dos objetos con los mismos valores de atributos sean considerados iguales.
	 */
	@Test
	public void testEqualsConObjetoIgual() {
		UsuarioDTO copia = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 5000.0);
		Assert.assertTrue(dto.equals(copia));
	}

	/**
	 * Verifica que dos objetos con atributos distintos sean considerados diferentes.
	 */
	@Test
	public void testEqualsConObjetoDiferente() {
		UsuarioDTO otro = new UsuarioDTO(9999999999L, "Pedro", "Diaz", "pedro@correo.com", "OtraPass1", "Premium", 3500.0);
		Assert.assertFalse(dto.equals(otro));
	}

	/**
	 * Asegura que el valor de hashCode sea idéntico para dos objetos iguales en contenido.
	 */
	@Test
	public void testHashCodeIgualParaObjetosIguales() {
		UsuarioDTO copia = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 5000.0);
		Assert.assertEquals(dto.hashCode(), copia.hashCode());
	}

	/**
	 * Verifica que el método toString no retorne una cadena nula.
	 */
	@Test
	public void testToStringNoNulo() {
		Assert.assertNotNull(dto.toString());
	}

	/**
	 * Comprueba que la representación textual contenga datos clave como el nombre del usuario.
	 */
	@Test
	public void testToStringContieneNombre() {
		Assert.assertTrue(dto.toString().contains("Carlos"));
	}
}