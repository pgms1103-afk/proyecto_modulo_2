package co.edu.unbosque.paqueteriaproyecto.service;

import co.edu.unbosque.paqueteriaproyecto.dto.UsuarioDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.*;
import co.edu.unbosque.paqueteriaproyecto.exception.*;
import co.edu.unbosque.paqueteriaproyecto.repository.UsuarioRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;

import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Suite de pruebas unitarias para {@link UsuarioService}.
 * <p>
 * Se enfoca en la validación de la capa de seguridad, gestión de perfiles de usuario 
 * y políticas de tarificación según el tipo de cliente (Normal, Premium, Concurrente).
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.3
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.Silent.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRep;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    private UsuarioService service;

    private UsuarioDTO dtoCorrecto;

    /**
     * Configuración de un UsuarioDTO estándar que cumple con los requisitos de 
     * longitud de cédula, formato de correo y robustez de contraseña.
     */
    @Before
    public void setUp() {
        dtoCorrecto = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 0);
    }


    /**
     * Valida que la cédula cumpla con el estándar legal de 10 dígitos.
     * @throws CedulaInvalidaException si es menor a 1234567890L o negativa.
     */
    @Test(expected = CedulaInvalidaException.class)
    public void testCreateCedulaMenosDe10Digitos() {
        UsuarioDTO dto = new UsuarioDTO(12345L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 0);
        service.create(dto);
    }

    /**
     * Verifica que el nombre no contenga caracteres numéricos.
     * @throws NombreInvalidoException ante entradas como "Carlos123".
     */
    @Test(expected = NombreInvalidoException.class)
    public void testCreateNombreConNumeros() {
        UsuarioDTO dto = new UsuarioDTO(1234567890L, "Carlos123", "Ramirez", "carlos@correo.com", "Segura1234", "Normal", 0);
        when(usuarioRep.existsByCedula(anyLong())).thenReturn(false);
        service.create(dto);
    }


    /**
     * Valida la política de robustez de contraseñas: Mínimo una mayúscula.
     * @throws ContrasenaInvalidaException si la clave es solo minúsculas.
     */
    @Test(expected = ContrasenaInvalidaException.class)
    public void testCreateContrasenaSinMayuscula() {
        UsuarioDTO dto = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "sinmayus1", "Normal", 0);
        when(usuarioRep.existsByCedula(anyLong())).thenReturn(false);
        when(usuarioRep.existsByCorreo(anyString())).thenReturn(false);
        service.create(dto);
    }

    /**
     * Valida la política de robustez de contraseñas: Mínimo un número.
     * @throws ContrasenaInvalidaException si la clave no contiene dígitos.
     */
    @Test(expected = ContrasenaInvalidaException.class)
    public void testCreateContrasenaSinNumero() {
        UsuarioDTO dto = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "SinNumero", "Normal", 0);
        when(usuarioRep.existsByCedula(anyLong())).thenReturn(false);
        when(usuarioRep.existsByCorreo(anyString())).thenReturn(false);
        service.create(dto);
    }


    /**
     * Verifica que solo se puedan asignar tipos de usuario definidos en el sistema.
     * @throws TipoUsuarioInvalidoException si se intenta asignar un rol inexistente.
     */
    @Test(expected = TipoUsuarioInvalidoException.class)
    public void testCreateTipoUsuarioInvalido() {
        UsuarioDTO dto = new UsuarioDTO(1234567890L, "Carlos", "Ramirez", "carlos@correo.com", "Segura1234", "Superusuario", 0);
        when(usuarioRep.existsByCedula(anyLong())).thenReturn(false);
        when(usuarioRep.existsByCorreo(anyString())).thenReturn(false);
        service.create(dto);
    }

    /**
     * Comprueba que la lista general de usuarios no incluya a los administradores 
     * por razones de seguridad y separación de incumbencias.
     */
    @Test
    public void testGetAllExcluyeAdmins() {
        UsuarioAdmin admin = new UsuarioAdmin();
        when(usuarioRep.findAll()).thenReturn(Arrays.asList(admin));
        List<UsuarioDTO> resultado = service.getAll();
        Assert.assertTrue("Los admins deben ser excluidos del listado de clientes", resultado.isEmpty());
    }

    /**
     * Valida la asignación dinámica de tipos de usuario y actualización de tarifas.
     * Verifica que se llame al repositorio con los parámetros correctos para un cliente 'Premium'.
     */
    @Test
    public void testAsignarTipoPremiumExitoso() {
        when(usuarioRep.existsById(1L)).thenReturn(true);
        doNothing().when(usuarioRep).actualizarTipoYTarifa(anyLong(), anyString(), anyDouble());
        int resultado = service.asignarTipo(1L, "Premium");
        Assert.assertEquals(0, resultado);
        verify(usuarioRep).actualizarTipoYTarifa(eq(1L), eq("Premium"), anyDouble());
    }


    /**
     * Valida el flujo especializado para la creación de cuentas administrativas.
     * Asegura que el objeto sea guardado como instancia de {@link UsuarioAdmin}.
     */
    @Test
    public void testCrearAdminExitoso() {
        when(usuarioRep.existsByCedula(anyLong())).thenReturn(false);
        when(usuarioRep.existsByCorreo(anyString())).thenReturn(false);

        UsuarioAdmin adminMock = new UsuarioAdmin();
        when(mapper.map(any(UsuarioDTO.class), eq(UsuarioAdmin.class))).thenReturn(adminMock);

        int resultado = service.crearAdmin(dtoCorrecto);
        Assert.assertEquals(0, resultado);
        verify(usuarioRep).save(adminMock);
    }

    /**
     * Verifica la funcionalidad de búsqueda específica para cuentas de tipo Administrador.
     */
    @Test
    public void testEncontrarAdminRetornaResultados() {
        UsuarioAdmin admin = new UsuarioAdmin();
        when(usuarioRep.findByTipo("Admin")).thenReturn(Optional.of(Arrays.asList(admin)));
        when(mapper.map(any(Usuario.class), eq(UsuarioDTO.class))).thenReturn(new UsuarioDTO());

        List<UsuarioDTO> result = service.encontrarAdmin();
        Assert.assertEquals(1, result.size());
    }
}