package co.edu.unbosque.paqueteriaproyecto.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import co.edu.unbosque.paqueteriaproyecto.entity.Envio;

/**
 * Repositorio Spring Data para la gestión de la persistencia de la entidad {@link Envio}.
 * <p>
 * Extiende {@link CrudRepository} para proporcionar operaciones CRUD básicas,
 * además de métodos de consulta derivados que son implementados automáticamente
 * por Spring Data JPA a partir de sus nombres.
 * </p>
 *
 * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 * @see Envio
 * @see CrudRepository
 */
public interface EnvioRepository extends CrudRepository<Envio, Long> {

    /**
     * Obtiene los envíos que coinciden con el tipo de paquete especificado.
     *
     * @param tipoPaquete tipo de paquete utilizado como criterio de búsqueda
     * @return {@link Optional} que contiene una lista de {@link Envio} que cumplen
     *         el criterio, o vacío si no se encuentran resultados
     */
    public Optional<List<Envio>> findByTipoPaquete(String tipoPaquete);

    /**
     * Obtiene los envíos que coinciden con la fecha de envío especificada.
     *
     * @param fechaEnvio fecha y hora de envío utilizada como criterio de búsqueda
     * @return {@link Optional} que contiene una lista de {@link Envio} que cumplen
     *         el criterio, o vacío si no se encuentran resultados
     */
    public Optional<List<Envio>> findByFechaEnvio(LocalDateTime fechaEnvio);

    /**
     * Obtiene los envíos que coinciden con la fecha de entrega especificada.
     *
     * @param fechaEntrega fecha y hora de entrega utilizada como criterio de búsqueda
     * @return {@link Optional} que contiene una lista de {@link Envio} que cumplen
     *         el criterio, o vacío si no se encuentran resultados
     */
    public Optional<List<Envio>> findByFechaEntrega(LocalDateTime fechaEntrega);

    /**
     * Obtiene los envíos según su estado de entrega a tiempo.
     *
     * @param entregaATiempo {@code true} para envíos entregados a tiempo;
     *                       {@code false} para envíos fuera de tiempo
     * @return {@link Optional} que contiene una lista de {@link Envio} que cumplen
     *         el criterio, o vacío si no se encuentran resultados
     */
    public Optional<List<Envio>> findByEntregaATiempo(boolean entregaATiempo);
    
}