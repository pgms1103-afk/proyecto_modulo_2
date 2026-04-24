package co.edu.unbosque.paqueteriaproyecto.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import co.edu.unbosque.paqueteriaproyecto.dto.TrabajadorDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.service.TrabajadorService;

/**
 * Pruebas unitarias para el controlador {@link TrabajadorController}.
 * <p>
 * Esta clase se encarga de testear los endpoints relacionados con la gestión
 * de trabajadores, asegurando que las peticiones HTTP retornen los códigos de
 * estado correctos y que la comunicación con la capa de servicio sea adecuada.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.Silent.class)
public class TrabajadorControllerTest {

	/** Objeto para simular peticiones HTTP hacia el controlador. */
	private MockMvc mockMvc;

	/** Mock del servicio de trabajadores. */
	@Mock
	private TrabajadorService trabajadorSer;

	/** Controlador bajo prueba con inyección de mocks. */
	@InjectMocks
	private TrabajadorController trabajadorController;

	/**
	 * Configura el entorno de pruebas antes de la ejecución de cada método.
	 * Inicializa MockMvc de forma independiente (standalone).
	 */
	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(trabajadorController).build();
	}

	/**
	 * Verifica que un trabajador se cree exitosamente al enviar datos válidos.
	 * Espera un código de respuesta 201 Created.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testCrearTrabajadorExitoso() throws Exception {
		mockMvc.perform(post("/trabajador/creartrabajador")
				.param("nombre", "David Velasquez")
				.param("cedula", "1010101010")
				.param("telefono", "3001234567")
				.param("email", "david@unbosque.edu.co")
				.param("cargo", "Repartidor"))
				.andExpect(status().isCreated())
				.andExpect(content().string("Empleado creado con éxito"));
	}

	/**
	 * Valida que el controlador capture excepciones de negocio, como una cédula inválida,
	 * y retorne un código de respuesta 400 Bad Request con el mensaje de error.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testCrearTrabajadorErrorCedula() throws Exception {
		doThrow(new CedulaInvalidaException("La cédula debe tener 10 dígitos"))
			.when(trabajadorSer).create(any(TrabajadorDTO.class));

		mockMvc.perform(post("/trabajador/creartrabajador")
				.param("nombre", "Martin Peña")
				.param("cedula", "123")
				.param("telefono", "3110000000")
				.param("email", "martin@correo.com")
				.param("cargo", "Admin"))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("La cédula debe tener 10 dígitos"));
	}

	/**
	 * Comprueba que la consulta de todos los trabajadores retorne el estado
	 * 202 Accepted cuando la lista devuelta por el servicio no está vacía.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testMostrarTrabajadoresConDatos() throws Exception {
		List<TrabajadorDTO> lista = Arrays.asList(new TrabajadorDTO("David", 123L, 456L, "d@mail.com", "Chef"));
		when(trabajadorSer.getAll()).thenReturn(lista);

		mockMvc.perform(get("/trabajador/mostrartrabajadores"))
				.andExpect(status().isAccepted())
				.andExpect(jsonPath("$.length()").value(1));
	}

	/**
	 * Verifica que el controlador responda con 204 No Content cuando no existen
	 * trabajadores registrados en el sistema.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testMostrarTrabajadoresVacio() throws Exception {
		when(trabajadorSer.getAll()).thenReturn(new ArrayList<>());

		mockMvc.perform(get("/trabajador/mostrartrabajadores"))
				.andExpect(status().isNoContent());
	}

	/**
	 * Valida la actualización del cargo de un trabajador, esperando que el
	 * controlador retorne un estado 202 Accepted.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testActualizarCargoExitoso() throws Exception {
		mockMvc.perform(put("/trabajador/actualizarcargo")
				.param("id", "1")
				.param("cargo", "Gerente"))
				.andExpect(status().isAccepted())
				.andExpect(content().string("Cargo actualizado correctamente"));
	}

	/**
	 * Verifica que el controlador retorne un 404 Not Found cuando se intenta
	 * eliminar un trabajador con un identificador que no existe.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testEliminarTrabajadorNoEncontrado() throws Exception {
		doThrow(new IdExistException("El ID buscado no existe"))
			.when(trabajadorSer).delateById(anyLong());

		mockMvc.perform(delete("/trabajador/eliminartrabajador")
				.param("id", "99"))
				.andExpect(status().isNotFound())
				.andExpect(content().string("El ID buscado no existe"));
	}

	/**
	 * Evalúa la búsqueda de trabajadores por nombre, asegurando que se retorne
	 * un estado 202 Accepted ante una coincidencia válida.
	 * * @throws Exception si ocurre un error en la simulación de la petición
	 */
	@Test
	public void testBuscarPorNombreExitoso() throws Exception {
		List<TrabajadorDTO> lista = Arrays.asList(new TrabajadorDTO());
		when(trabajadorSer.findByNombre(anyString())).thenReturn(lista);

		mockMvc.perform(get("/trabajador/buscartrabajadorpornombre")
				.param("nombre", "David"))
				.andExpect(status().isAccepted());
	}
}