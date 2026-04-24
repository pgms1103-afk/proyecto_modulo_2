package co.edu.unbosque.paqueteriaproyecto.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
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

import co.edu.unbosque.paqueteriaproyecto.dto.UsuarioDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.service.UsuarioService;

/**
 * Pruebas unitarias para el controlador {@link UsuarioController}.
 * <p>
 * Esta clase contiene los casos de prueba para validar el comportamiento de los
 * endpoints de gestión de usuarios, incluyendo la creación de usuarios normales 
 * y administradores, eliminación, consultas y actualización de tipos de usuario.
 * Se utiliza MockMvc para el testeo de la capa web sin levantar el servidor completo.
 * </p>
 * * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.Silent.class)
public class UsuarioControllerTest {

	/** Punto de entrada para las pruebas de Spring MVC que permite ejecutar peticiones mock. */
	private MockMvc mockMvc;

	/** Mock del servicio de usuarios para aislar las pruebas de la lógica de persistencia. */
	@Mock
	private UsuarioService usuarioSer;

	/** Instancia del controlador donde se inyectarán los mocks automáticamente. */
	@InjectMocks
	private UsuarioController usuarioController;

	/**
	 * Prepara el contexto de las pruebas antes de cada ejecución.
	 * Configura MockMvc en modo standalone para el controlador de usuarios.
	 */
	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(usuarioController).build();
	}

	/**
	 * Prueba la creación exitosa de un usuario convencional.
	 * Verifica que se retorne el estado HTTP 201 Created y el mensaje de confirmación.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testCrearUsuarioExitoso() throws Exception {
		mockMvc.perform(post("/usuario/crearUsuario")
				.param("cedula", "1234567890")
				.param("nombre", "Jose")
				.param("apellido", "Cipagauta")
				.param("correo", "jose@mail.com")
				.param("contrasena", "Segura123")
				.param("tipoUsuario", "Normal"))
				.andExpect(status().isCreated())
				.andExpect(content().string("Usuario creado con exito"));
	}

	/**
	 * Valida el manejo de excepciones cuando los datos de entrada son incorrectos.
	 * Comprueba que el controlador responda con 400 Bad Request ante una cédula inválida.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testCrearUsuarioErrorValidacion() throws Exception {
		doThrow(new CedulaInvalidaException("Cédula inválida"))
			.when(usuarioSer).create(any(UsuarioDTO.class));

		mockMvc.perform(post("/usuario/crearUsuario")
				.param("cedula", "0")
				.param("nombre", "Jose")
				.param("apellido", "Cipagauta")
				.param("correo", "jose@mail.com")
				.param("contrasena", "123")
				.param("tipoUsuario", "Normal"))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("Cédula inválida"));
	}

	/**
	 * Verifica que la eliminación de un usuario por ID funcione correctamente.
	 * Se espera un estado HTTP 202 Accepted.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testEliminarUsuarioExitoso() throws Exception {
		mockMvc.perform(delete("/usuario/eliminarUsuario")
				.param("id", "1"))
				.andExpect(status().isAccepted())
				.andExpect(content().string("Usuario eliminado con exito"));
	}

	/**
	 * Evalúa el comportamiento del sistema cuando se intenta eliminar un ID inexistente.
	 * Debe retornar 400 Bad Request capturando la excepción lanzada por el servicio.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testEliminarUsuarioNoExistente() throws Exception {
		doThrow(new IdExistException("ID no encontrado"))
			.when(usuarioSer).delateById(anyLong());

		mockMvc.perform(delete("/usuario/eliminarUsuario")
				.param("id", "99"))
				.andExpect(status().isBadRequest())
				.andExpect(content().string("ID no encontrado"));
	}

	/**
	 * Valida que la obtención de todos los usuarios retorne una lista válida
	 * con estado 202 Accepted cuando hay registros.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testMostrarUsuariosConDatos() throws Exception {
		List<UsuarioDTO> lista = Arrays.asList(new UsuarioDTO());
		when(usuarioSer.getAll()).thenReturn(lista);

		mockMvc.perform(get("/usuario/mostrarUsuarios"))
				.andExpect(status().isAccepted())
				.andExpect(jsonPath("$.length()").value(1));
	}

//	/**
//	 * Comprueba que la búsqueda por cédula retorne 204 No Content cuando no 
//	 * hay coincidencias en la base de datos.
//	 * @throws Exception si ocurre un error en la petición simulada
//	 */
//	@Test
//	public void testBuscarPorCedulaVacio() throws Exception {
//		when(usuarioSer.findByCedula(anyLong())).thenReturn(new ArrayList<>());
//
//		mockMvc.perform(get("/usuario/buscarporcedula")
//				.param("cedula", "111111"))
//				.andExpect(status().isNoContent());
//	}

	/**
	 * Verifica la creación exitosa de un perfil de administrador.
	 * Asegura que se retorne el estado HTTP 201 Created.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testCrearAdminExitoso() throws Exception {
		mockMvc.perform(post("/usuario/crearadmin")
				.param("cedula", "9876543210")
				.param("nombre", "Admin")
				.param("apellido", "Sistema")
				.param("correo", "admin@mail.com")
				.param("contrasena", "Admin123"))
				.andExpect(status().isCreated())
				.andExpect(content().string("Usuario administrador creado con exito"));
	}

	/**
	 * Valida el cambio de rol o tipo de usuario para un ID existente.
	 * Se espera recibir un estado 202 Accepted tras la actualización.
	 * @throws Exception si ocurre un error en la petición simulada
	 */
	@Test
	public void testActualizarTipoExitoso() throws Exception {
		mockMvc.perform(put("/usuario/actualizartipo")
				.param("id", "1")
				.param("tipoUsuario", "Premium"))
				.andExpect(status().isAccepted())
				.andExpect(content().string("Tipo de usuario asignado con exito"));
	}
}