package co.edu.unbosque.paqueteriaproyecto.service;

import co.edu.unbosque.paqueteriaproyecto.dto.TrabajadorDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.*;
import co.edu.unbosque.paqueteriaproyecto.exception.*;
import co.edu.unbosque.paqueteriaproyecto.repository.TrabajadorRepository;
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
 * Suite de pruebas unitarias para el servicio {@link TrabajadorService}.
 * <p>
 * Esta clase se encarga de testear la lógica de gestión de talento humano del sistema,
 * asegurando que el registro de trabajadores (Administradores, Conductores y Manipuladores)
 * cumpla con los estándares de integridad de datos y las restricciones de unicidad.
 * </p>
 * * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.2
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class TrabajadorServiceTest {

    @Mock
    private TrabajadorRepository trabajadorRepo;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    private TrabajadorService service;

    private TrabajadorDTO dtoCorrecto;

    /**
     * Configuración previa a cada test. Se inicializa un objeto DTO con datos 
     * que cumplen todas las reglas de validación iniciales.
     */
    @Before
    public void setUp() {
        dtoCorrecto = new TrabajadorDTO("Juan Perez", 1234567890L, 3001234567L, "juan@correo.com", "Conductor");
    }

    /**
     * Verifica que el sistema rechace nombres nulos o vacíos.
     * @throws NombreInvalidoException cuando el campo nombre no tiene contenido.
     */
    @Test(expected = NombreInvalidoException.class)
    public void testCreateNombreNulo() {
        TrabajadorDTO dto = new TrabajadorDTO(null, 1234567890L, 3001234567L, "a@b.com", "Conductor");
        service.create(dto);
    }

    /**
     * Valida la regla de negocio que prohíbe el uso de números en nombres de personas.
     * @throws NombreInvalidoException cuando se detectan caracteres numéricos.
     */
    @Test(expected = NombreInvalidoException.class)
    public void testCreateNombreConNumeros() {
        TrabajadorDTO dto = new TrabajadorDTO("Juan123", 1234567890L, 3001234567L, "a@b.com", "Conductor");
        service.create(dto);
    }

    /**
     * Asegura que el nombre ingresado contenga al menos un apellido para 
     * cumplir con los requisitos legales de contratación.
     * @throws NombreInvalidoException cuando solo se proporciona una palabra.
     */
    @Test(expected = NombreInvalidoException.class)
    public void testCreateNombreSinApellido() {
        TrabajadorDTO dto = new TrabajadorDTO("Juan", 1234567890L, 3001234567L, "a@b.com", "Conductor");
        service.create(dto);
    }


    /**
     * Valida que no se permitan cédulas con formatos de longitud inválidos (mínimo 10 dígitos).
     * @throws CedulaInvalidaException cuando el número es demasiado corto.
     */
    @Test(expected = CedulaInvalidaException.class)
    public void testCreateCedulaMenosDe10Digitos() {
        TrabajadorDTO dto = new TrabajadorDTO("Juan Perez", 12345L, 3001234567L, "a@b.com", "Conductor");
        service.create(dto);
    }

    /**
     * Verifica la restricción de unicidad de identidad en la base de datos.
     * @throws CedulaInvalidaException cuando la cédula ya pertenece a otro trabajador.
     */
    @Test(expected = CedulaInvalidaException.class)
    public void testCreateCedulaDuplicada() {
        when(trabajadorRepo.existsByCedula(1234567890L)).thenReturn(true);
        service.create(dtoCorrecto);
    }

    /**
     * Valida el formato y unicidad del correo electrónico.
     * @throws CorreoInvalidoException cuando el email no tiene formato @ o ya está registrado.
     */
    @Test(expected = CorreoInvalidoException.class)
    public void testCreateCorreoDuplicado() {
        when(trabajadorRepo.existsByCedula(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByTelefono(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByEmail("juan@correo.com")).thenReturn(true);
        service.create(dtoCorrecto);
    }


    /**
     * Asegura que el cargo asignado pertenezca a los roles permitidos por la empresa.
     * @throws CargoInvalidoException cuando el cargo no es Administrador, Conductor o Manipulador.
     */
    @Test(expected = CargoInvalidoException.class)
    public void testCreateCargoInvalido() {
        TrabajadorDTO dto = new TrabajadorDTO("Juan Perez", 1234567890L, 3001234567L, "juan@correo.com", "Gerente");
        when(trabajadorRepo.existsByCedula(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByTelefono(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByEmail(anyString())).thenReturn(false);
        service.create(dto);
    }


    /**
     * Valida el registro exitoso de un Conductor.
     * Verifica que el repositorio llame al método save() una única vez.
     */
    @Test
    public void testCreateConductorExitoso() {
        when(trabajadorRepo.existsByCedula(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByTelefono(anyLong())).thenReturn(false);
        when(trabajadorRepo.existsByEmail(anyString())).thenReturn(false);

        doNothing().when(mapper).map(any(TrabajadorDTO.class), any(Trabajador.class));

        int resultado = service.create(dtoCorrecto);
        Assert.assertEquals(0, resultado);
        verify(trabajadorRepo, times(1)).save(any(Trabajador.class));
    }

    /**
     * Verifica que al obtener todos los trabajadores, el sistema identifique 
     * correctamente el cargo basado en la instancia de la clase (Herencia).
     */
    @Test
    public void testGetAllAsignaCargo() {
        TrabajadorAdministrativo admin = new TrabajadorAdministrativo("Ana Garcia", 1234567890L, 3001234567L, "ana@correo.com");
        when(trabajadorRepo.findAll()).thenReturn(Arrays.asList(admin));
        TrabajadorDTO dtoMock = new TrabajadorDTO();
        when(mapper.map(any(Trabajador.class), eq(TrabajadorDTO.class))).thenReturn(dtoMock);

        List<TrabajadorDTO> resultado = service.getAll();
        Assert.assertEquals(1, resultado.size());
        Assert.assertEquals("Administrador", resultado.get(0).getCargo());
    }

    /**
     * Valida la actualización de cargos en tiempo real para trabajadores activos.
     * Verifica la integridad del ID antes de proceder con el cambio de rol.
     */
    @Test
    public void testAsignarCargoExitoso() {
        when(trabajadorRepo.existsById(1L)).thenReturn(true);
        doNothing().when(trabajadorRepo).actualizarCargo(1L, "Conductor");
        int resultado = service.asignarCargo(1L, "Conductor");
        Assert.assertEquals(0, resultado);
        verify(trabajadorRepo).actualizarCargo(1L, "Conductor");
    }

    /**
     * Verifica que la búsqueda por nombre requiera el formato completo (Nombre y Apellido).
     * @throws NombreInvalidoException si la cadena de búsqueda es insuficiente.
     */
    @Test(expected = NombreInvalidoException.class)
    public void testFindByNombreSinApellido() {
        service.findByNombre("Juan");
    }
}