package co.edu.unbosque.paqueteriaproyecto.service;

import co.edu.unbosque.paqueteriaproyecto.dto.EnvioDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.Envio;
import co.edu.unbosque.paqueteriaproyecto.exception.*;
import co.edu.unbosque.paqueteriaproyecto.repository.EnvioRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Clase de pruebas unitarias de alta precisión para {@link EnvioService}.
 * <p>
 * Esta suite de pruebas verifica de manera exhaustiva la lógica de negocio 
 * del sistema de paquetería, asegurando que las restricciones de seguridad, 
 * logística y tiempos de entrega se cumplan estrictamente antes de persistir 
 * cualquier dato en el repositorio.
 * </p>
 * * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.1
 * @since 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class EnvioServiceTest {

    @Mock
    private EnvioRepository repo;

    @Mock
    private ModelMapper mapper;

    @InjectMocks
    private EnvioService service;

    private LocalDateTime fechaEnvio;
    private LocalDateTime fechaEntrega;
    private EnvioDTO dtoCorrecto;

    /**
     * Inicializa el entorno de pruebas con datos de referencia válidos.
     * Se establece una ventana de tiempo de 4 horas para un envío alimenticio estándar.
     */
    @Before
    public void setUp() {
        fechaEnvio   = LocalDateTime.of(2025, 6, 1, 8, 0);
        fechaEntrega = LocalDateTime.of(2025, 6, 1, 12, 0);
        dtoCorrecto  = new EnvioDTO("Alimenticio", "Frutas frescas", 5.0, "Calle 45 #12-30", fechaEnvio, fechaEntrega);
    }

    /**
     * Prueba la validación de integridad del tipo de paquete.
     * @throws TipoPaqueteInvalidoException Si el tipo es null, vacío o no pertenece al catálogo permitido.
     */
    @Test(expected = TipoPaqueteInvalidoException.class)
    public void testCreateTipoPaqueteInvalido() {
        EnvioDTO dto = new EnvioDTO("Explosivo", "Desc", 1.0, "Calle 1 #1-1", fechaEnvio, fechaEntrega);
        service.create(dto);
    }

    /**
     * Verifica que la descripción no contenga caracteres especiales que puedan 
     * comprometer la seguridad o claridad del registro.
     * @throws DescripcionInvalidaException Si se detectan símbolos no alfanuméricos.
     */
    @Test(expected = DescripcionInvalidaException.class)
    public void testCreateDescripcionConCaracteresEspeciales() {
        EnvioDTO dto = new EnvioDTO("Carta", "Desc@#!", 1.0, "Calle 1 #1-1", fechaEnvio, fechaEntrega);
        service.create(dto);
    }

    /**
     * Valida el límite superior de peso para envíos individuales (1000kg).
     * @throws PesoInvalidoException Si el peso excede la capacidad de la flota estándar.
     */
    @Test(expected = PesoInvalidoException.class)
    public void testCreatePesoMayorA1000() {
        EnvioDTO dto = new EnvioDTO("Carta", "Documentos", 1001.0, "Calle 1 #1-1", fechaEnvio, fechaEntrega);
        service.create(dto);
    }

    /**
     * Comprueba que la dirección de entrega cumpla con un formato mínimo 
     * para asegurar la viabilidad de la logística de última milla.
     * @throws DireccionInvalidaException Si la dirección es demasiado corta o ambigua.
     */
    @Test(expected = DireccionInvalidaException.class)
    public void testCreateDireccionInvalida() {
        EnvioDTO dto = new EnvioDTO("Carta", "Documentos", 1.0, "abc", fechaEnvio, fechaEntrega);
        service.create(dto);
    }

    /**
     * Regla de Negocio: La fecha de entrega no puede ser cronológicamente 
     * anterior a la fecha en que se recibe el paquete.
     * @throws FechaInvalidaException Si el flujo temporal es inconsistente.
     */
    @Test(expected = FechaInvalidaException.class)
    public void testCreateFechaEntregaAntesDeEnvio() {
        LocalDateTime entregaAntes = fechaEnvio.minusHours(2);
        EnvioDTO dto = new EnvioDTO("Carta", "Documentos", 1.0, "Calle 45 #12-30", fechaEnvio, entregaAntes);
        service.create(dto);
    }

    /**
     * Regla de Negocio: Los productos alimenticios deben entregarse 
     * el mismo día para garantizar la cadena de frío y frescura.
     * @throws FechaInvalidaException Si la entrega se programa para un día posterior.
     */
    @Test(expected = FechaInvalidaException.class)
    public void testCreateAlimenticioEnDiaDiferente() {
        LocalDateTime envio = LocalDateTime.of(2025, 6, 1, 10, 0);
        LocalDateTime entregaOtroDia = LocalDateTime.of(2025, 6, 2, 10, 0); 
        EnvioDTO dto = new EnvioDTO("Alimenticio", "Frutas", 1.0, "Calle 45 #12-30", envio, entregaOtroDia);
        
        Envio entidadSimulada = new Envio();
        entidadSimulada.setTipoPaquete("Alimenticio");
        entidadSimulada.setFechaEnvio(envio);
        entidadSimulada.setFechaEntrega(entregaOtroDia);
        
        when(mapper.map(any(EnvioDTO.class), eq(Envio.class))).thenReturn(entidadSimulada);
        service.create(dto);
    }

    /**
     * Regla de Negocio: Los envíos alimenticios tienen un tiempo 
     * máximo de tránsito de 6 horas.
     * @throws FechaInvalidaException Si el tiempo de transporte supera el límite de seguridad alimentaria.
     */
    @Test(expected = FechaInvalidaException.class)
    public void testCreateAlimenticioMasDe6Horas() {
        LocalDateTime envio = LocalDateTime.of(2025, 6, 1, 8, 0);
        LocalDateTime entregaTarde = LocalDateTime.of(2025, 6, 1, 20, 0);
        EnvioDTO dto = new EnvioDTO("Alimenticio", "Frutas", 1.0, "Calle 45 #12-30", envio, entregaTarde);
        
        Envio entidadSimulada = new Envio();
        entidadSimulada.setTipoPaquete("Alimenticio");
        entidadSimulada.setFechaEnvio(envio);
        entidadSimulada.setFechaEntrega(entregaTarde);
        
        when(mapper.map(any(EnvioDTO.class), eq(Envio.class))).thenReturn(entidadSimulada);
        service.create(dto);
    }

    /**
     * Valida el flujo exitoso de creación cuando todas las reglas se cumplen.
     * Verifica que el repositorio reciba la orden de guardado exactamente una vez.
     */
    @Test
    public void testCreateExitoso() {
        Envio entidadMock = new Envio();
        entidadMock.setTipoPaquete("Alimenticio");
        entidadMock.setFechaEnvio(fechaEnvio);
        entidadMock.setFechaEntrega(fechaEntrega);
        entidadMock.setPeso(5.0);

        when(mapper.map(any(EnvioDTO.class), eq(Envio.class))).thenReturn(entidadMock);

        int resultado = service.create(dtoCorrecto);
        Assert.assertEquals("El código de retorno debe ser 0 para éxito", 0, resultado);
        verify(repo, times(1)).save(entidadMock);
    }

    /**
     * Verifica que el sistema no permita eliminar registros que no existen en la base de datos.
     * @throws IdExistException Si el ID proporcionado no corresponde a ningún envío activo.
     */
    @Test(expected = IdExistException.class)
    public void testDeleteByIdNoExiste() {
        when(repo.existsById(99L)).thenReturn(false);
        service.delateById(99L);
    }

    /**
     * Valida la funcionalidad de filtrado por fecha de envío.
     * Asegura que no se puedan realizar consultas con fechas que aún no han ocurrido.
     * @throws FechaInvalidaException Si la fecha de consulta es posterior a la fecha actual.
     */
    @Test(expected = FechaInvalidaException.class)
    public void testFindByFechaEnvioFutura() {
        service.findByFechaEnvio(LocalDateTime.now().plusDays(1));
    }
}