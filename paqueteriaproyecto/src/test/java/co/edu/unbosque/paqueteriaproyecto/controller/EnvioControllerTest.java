package co.edu.unbosque.paqueteriaproyecto.controller;

import static org.mockito.ArgumentMatchers.any;
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

import co.edu.unbosque.paqueteriaproyecto.dto.EnvioDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.TipoPaqueteInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.service.EnvioService;

/**
 * Pruebas unitarias para el controlador {@link EnvioController}.
 * <p>
 * Utiliza MockMvc para simular peticiones HTTP y Mockito para suplantar
 * el comportamiento de la capa de servicio, permitiendo validar los códigos
 * de estado y las respuestas de los endpoints de envíos.
 * </p>
 * * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.Silent.class)
public class EnvioControllerTest {

	/** Punto de entrada principal para las pruebas de Spring MVC del lado del servidor. */
	private MockMvc mockMvc;

	/** Mock del servicio de envíos para simular la lógica de negocio. */
	@Mock
	private EnvioService service;

	/** Controlador donde se inyectarán los mocks creados. */
	@InjectMocks
	private EnvioController controller;

	/**
	 * Configuración inicial antes de cada prueba.
	 * Inicializa el entorno de MockMvc en modo standalone.
	 */
	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
	}

	/**
	 * Valida que el endpoint de creación de paquetes retorne un estado 201 Created
	 * cuando todos los parámetros enviados son válidos.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testCrearPaqueteExitoso() throws Exception {
		mockMvc.perform(post("/envio/crearpaquete")
				.param("tipoPaquete", "Alimenticio")
				.param("descripcion", "Caja de manzanas")
				.param("peso", "10.5")
				.param("destino", "Calle 100")
				.param("fechaEnvio", "2026-03-24T10:00:00")
				.param("fechaEntrega", "2026-03-25T10:00:00"))
				.andExpect(status().isCreated())
				.andExpect(content().string("Envío creado correctamente"));
	}

	/**
	 * Verifica que el sistema retorne un estado 400 Bad Request cuando el servicio
	 * detecta que el tipo de paquete no es permitido.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testCrearPaqueteErrorValidacion() throws Exception {
		doThrow(new TipoPaqueteInvalidoException("Tipo de paquete no permitido"))
			.when(service).create(any(EnvioDTO.class));

		mockMvc.perform(post("/envio/crearpaquete")
				.param("tipoPaquete", "Invalido")
				.param("descripcion", "...")
				.param("peso", "1")
				.param("destino", "...")
				.param("fechaEnvio", "2026-03-24T10:00:00")
				.param("fechaEntrega", "2026-03-25T10:00:00"))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("Tipo de paquete no permitido"));
	}

	/**
	 * Evalúa la obtención de la lista de paquetes, esperando un estado 202 Accepted
	 * y un formato de arreglo JSON cuando existen registros en el sistema.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testMostrarPaquetesConContenido() throws Exception {
		List<EnvioDTO> lista = Arrays.asList(new EnvioDTO());
		when(service.getAll()).thenReturn(lista);

		mockMvc.perform(get("/envio/mostrarpaquetes"))
				.andExpect(status().isAccepted())
				.andExpect(jsonPath("$").isArray());
	}

	/**
	 * Comprueba que el endpoint retorne un estado 204 No Content cuando no hay
	 * envíos registrados en la base de datos.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testMostrarPaquetesVacio() throws Exception {
		when(service.getAll()).thenReturn(new ArrayList<>());

		mockMvc.perform(get("/envio/mostrarpaquetes"))
				.andExpect(status().isNoContent());
	}

	/**
	 * Valida que la eliminación de un paquete por su identificador único retorne
	 * un estado 202 Accepted tras una operación exitosa.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testEliminarPaqueteExitoso() throws Exception {
		mockMvc.perform(delete("/envio/eliminarpaquete")
				.param("id", "1"))
				.andExpect(status().isAccepted())
				.andExpect(content().string("Eliminado correctamente"));
	}

	/**
	 * Verifica que al buscar paquetes por un tipo inexistente, el controlador
	 * responda correctamente con un estado 204 No Content.
	 * * @throws Exception si ocurre un error durante la ejecución de la petición mock
	 */
	@Test
	public void testBuscarPaquetePorTipoNoEncontrado() throws Exception {
		when(service.findByTipoPaquete("Raro")).thenReturn(new ArrayList<>());

		mockMvc.perform(get("/envio/buscarpaqueteportipo")
				.param("tipo", "Raro"))
				.andExpect(status().isNoContent());
	}
}