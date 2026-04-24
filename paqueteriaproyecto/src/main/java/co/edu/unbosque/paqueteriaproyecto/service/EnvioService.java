package co.edu.unbosque.paqueteriaproyecto.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unbosque.paqueteriaproyecto.dto.EnvioDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.Envio;
import co.edu.unbosque.paqueteriaproyecto.exception.DescripcionInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.DireccionInvalidaException;

import co.edu.unbosque.paqueteriaproyecto.exception.FechaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.PesoInvalidoException;

import co.edu.unbosque.paqueteriaproyecto.exception.TipoPaqueteInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.repository.EnvioRepository;

/**
 * Servicio encargado de la lógica de negocio para la gestión de envíos.
 * <p>
 * Implementa operaciones CRUD sobre {@link EnvioDTO} y aplica validaciones,
 * transformaciones y reglas de negocio antes de interactuar con la capa de persistencia.
 * </p>
 * <p>
 * Se encarga de calcular el costo del envío y determinar si fue entregado a tiempo,
 * según el tipo de paquete y las fechas proporcionadas.
 * </p>
 *
 * <h3>Reglas de negocio:</h3>
 * <ul>
 *   <li>Tipos válidos: {@code Alimenticio}, {@code No Alimenticio}, {@code Carta}</li>
 *   <li>Alimenticio: mismo día y máximo 6 horas</li>
 *   <li>No Alimenticio: máximo 24 horas</li>
 *   <li>Carta: máximo 72 horas</li>
 *   <li>Costo:
 *     <ul>
 *       <li>Alimenticio → peso × 5000</li>
 *       <li>No Alimenticio → peso × 3000</li>
 *       <li>Carta → 2000</li>
 *     </ul>
 *   </li>
 * </ul>
 *
 * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @version 1.0
 * @since 1.0
 */
@Service
public class EnvioService implements CRUDoperation<EnvioDTO> {

    /**
     * Repositorio para la persistencia de entidades {@link Envio}.
     */
    @Autowired
    private EnvioRepository repo;

    /**
     * Componente para mapear entre {@link Envio} y {@link EnvioDTO}.
     */
    @Autowired
    private ModelMapper mapper;

    /**
     * Constructor por defecto requerido por Spring.
     */
    public EnvioService() {
    }

    /**
     * Crea un nuevo envío aplicando validaciones y reglas de negocio.
     *
     * @param data datos del envío a crear
     * @return {@code 0} si la operación se realiza correctamente
     *
     * @throws TipoPaqueteInvalidoException si el tipo de paquete es inválido
     * @throws DescripcionInvalidaException si la descripción es inválida
     * @throws PesoInvalidoException si el peso es inválido
     * @throws DireccionInvalidaException si la dirección es inválida
     * @throws FechaInvalidaException si las fechas no cumplen las reglas
     */
    @Override
    public int create(EnvioDTO data) {

        if (data.getTipoPaquete() == null || data.getTipoPaquete().isBlank()) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete no puede estar vacío");
        }
        if (!data.getTipoPaquete().matches("(?i)Alimenticio|(?i)No Alimenticio|(?i)Carta")) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete debe ser: Alimenticio, No Alimenticio o Carta");
        }

        if (data.getDescripcion() == null || data.getDescripcion().isBlank()) {
            throw new DescripcionInvalidaException("La descripción no puede estar vacía");
        }
        if (!data.getDescripcion().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$")) {
            throw new DescripcionInvalidaException("La descripción no puede contener caracteres especiales");
        }

        if (Double.isNaN(data.getPeso()) || Double.isInfinite(data.getPeso())) {
            throw new PesoInvalidoException("El peso debe ser un número válido");
        }
        if (data.getPeso() <= 0) {
            throw new PesoInvalidoException("El peso debe ser mayor a 0");
        }
        if (data.getPeso() > 1000) {
            throw new PesoInvalidoException("El peso no puede ser mayor a 1000 kg");
        }
        if (!String.valueOf(data.getPeso()).matches("\\d+(\\.\\d+)?")) {
            throw new PesoInvalidoException("El peso debe ser un número válido, ejemplo: 10 o 10.5");
        }

        if (data.getDireccionDestino() == null || data.getDireccionDestino().isBlank()) {
            throw new DireccionInvalidaException("La dirección de destino no puede estar vacía");
        }
        if (!data.getDireccionDestino().matches("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z0-9#-\\.\\s]{8,100}$")) {
            throw new DireccionInvalidaException("Dirección inválida. Ingrese una dirección real (ej: Calle 45 #12-30)");
        }

        if (data.getFechaEnvio() == null) {
            throw new FechaInvalidaException("La fecha de envío no puede ser nula");
        }
        if (data.getFechaEntrega() == null) {
            throw new FechaInvalidaException("La fecha de entrega no puede ser nula");
        }
        if (data.getFechaEntrega().isBefore(data.getFechaEnvio())) {
            throw new FechaInvalidaException("La fecha de entrega no puede ser anterior a la fecha de envío");
        }

        Envio entity = mapper.map(data, Envio.class);

        long horas = Duration.between(entity.getFechaEnvio(), entity.getFechaEntrega()).toHours();
        int diaEnvio = entity.getFechaEnvio().getDayOfYear();
        int diaEntrega = entity.getFechaEntrega().getDayOfYear();

        boolean aTiempo = false;
        double costo = 0;

        if (entity.getTipoPaquete().equalsIgnoreCase("Alimenticio")) {
            boolean mismoDia = diaEnvio == diaEntrega;
            if (!mismoDia) {
                throw new FechaInvalidaException("Un paquete Alimenticio debe entregarse el mismo día del envío");
            }
            if (horas > 6) {
                throw new FechaInvalidaException("Un paquete Alimenticio debe entregarse en máximo 6 horas");
            }
            aTiempo = true;
            costo = entity.getPeso() * 5000;

        } else if (entity.getTipoPaquete().equalsIgnoreCase("No Alimenticio")) {
            aTiempo = horas <= 24;
            costo = entity.getPeso() * 3000;

        } else if (entity.getTipoPaquete().equalsIgnoreCase("Carta")) {
            aTiempo = horas <= 72;
            costo = 2000;
        }

        entity.setEntregaATiempo(aTiempo);
        entity.setCosto(costo);
        repo.save(entity);
        return 0;
    }

    /**
     * Obtiene todos los envíos registrados.
     *
     * @return lista de {@link EnvioDTO}
     */
    @Override
    public List<EnvioDTO> getAll() {
        List<Envio> lista = (List<Envio>) repo.findAll();
        List<EnvioDTO> dtoList = new ArrayList<>();
        lista.forEach(e -> dtoList.add(mapper.map(e, EnvioDTO.class)));
        return dtoList;
    }

    /**
     * Elimina un envío por su ID.
     *
     * @param id identificador del envío
     * @return {@code 0} si se elimina correctamente
     * @throws IdExistException si el ID no existe
     */
    @Override
    public int delateById(Long id) {
        if (!repo.existsById(id)) {
            throw new IdExistException("El id no existe");
        }
        repo.deleteById(id);
        return 0;
    }

    /**
     * Actualiza un envío existente.
     *
     * @param id identificador del envío
     * @param data nuevos datos
     * @return {@code 0} si la operación es exitosa
     *
     * @throws IdExistException si el envío no existe
     * @throws TipoPaqueteInvalidoException si el tipo es inválido
     * @throws DescripcionInvalidaException si la descripción es inválida
     * @throws PesoInvalidoException si el peso es inválido
     * @throws DireccionInvalidaException si la dirección es inválida
     * @throws FechaInvalidaException si las fechas no son válidas
     */
    @Override
    public int updateById(Long id, EnvioDTO data) {

        if (!repo.existsById(id)) {
            throw new IdExistException("El id no existe");
        }

        if (data.getTipoPaquete() == null || data.getTipoPaquete().isBlank()) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete no puede estar vacío");
        }
        if (!data.getTipoPaquete().matches("(?i)Alimenticio|(?i)No Alimenticio|(?i)Carta")) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete debe ser: Alimenticio, No Alimenticio o Carta");
        }

        if (data.getDescripcion() == null || data.getDescripcion().isBlank()) {
            throw new DescripcionInvalidaException("La descripción no puede estar vacía");
        }
        if (!data.getDescripcion().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$")) {
            throw new DescripcionInvalidaException("La descripción no puede contener caracteres especiales");
        }

        if (Double.isNaN(data.getPeso()) || Double.isInfinite(data.getPeso())) {
            throw new PesoInvalidoException("El peso debe ser un número válido");
        }
        if (data.getPeso() <= 0) {
            throw new PesoInvalidoException("El peso debe ser mayor a 0");
        }
        if (data.getPeso() > 1000) {
            throw new PesoInvalidoException("El peso no puede ser mayor a 1000 kg");
        }

        if (data.getDireccionDestino() == null || data.getDireccionDestino().isBlank()) {
            throw new DireccionInvalidaException("La dirección de destino no puede estar vacía");
        }
        if (!data.getDireccionDestino().matches("^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z0-9#-\\.\\s]{8,100}$")) {
            throw new DireccionInvalidaException("Dirección inválida. Ingrese una dirección real (ej: Calle 45 #12-30)");
        }

        if (data.getFechaEnvio() == null) {
            throw new FechaInvalidaException("La fecha de envío no puede ser nula");
        }
        if (data.getFechaEntrega() == null) {
            throw new FechaInvalidaException("La fecha de entrega no puede ser nula");
        }
        if (data.getFechaEntrega().isBefore(data.getFechaEnvio())) {
            throw new FechaInvalidaException("La fecha de entrega no puede ser anterior a la fecha de envío");
        }
       
        Envio e = repo.findById(id).get();
        e.setTipoPaquete(data.getTipoPaquete());
        e.setDescripcion(data.getDescripcion());
        e.setPeso(data.getPeso());
        e.setDireccionDestino(data.getDireccionDestino());
        e.setFechaEnvio(data.getFechaEnvio());
        e.setFechaEntrega(data.getFechaEntrega());

        long horas = java.time.Duration.between(e.getFechaEnvio(), e.getFechaEntrega()).toHours();
        boolean aTiempo = false;
        double costo = 0;

        if (e.getTipoPaquete().equalsIgnoreCase("Alimenticio")) {
            aTiempo = horas <= 6;
            costo = e.getPeso() * 5000;
        } else if (e.getTipoPaquete().equalsIgnoreCase("No Alimenticio")) {
            aTiempo = horas <= 24;
            costo = e.getPeso() * 3000;
        } else if (e.getTipoPaquete().equalsIgnoreCase("Carta")) {
            aTiempo = horas <= 72;
            costo = 2000;
        }

        e.setEntregaATiempo(aTiempo);
        e.setCosto(costo);
        repo.save(e);
        return 0;
    }

    /**
     * Busca envíos por tipo de paquete.
     *
     * @param tipoPaquete tipo a filtrar
     * @return lista de resultados
     */
    public List<EnvioDTO> findByTipoPaquete(String tipoPaquete) {
        if (tipoPaquete == null || tipoPaquete.isBlank()) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete no puede estar vacío");
        }
        if (!tipoPaquete.matches("(?i)Alimenticio|(?i)No Alimenticio|(?i)Carta")) {
            throw new TipoPaqueteInvalidoException("El tipo de paquete debe ser: Alimenticio, No Alimenticioo Carta");
        }
        Optional<List<Envio>> encontrados = repo.findByTipoPaquete(tipoPaquete);
        List<EnvioDTO> dtoList = new ArrayList<>();
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            encontrados.get().forEach(entity -> dtoList.add(mapper.map(entity, EnvioDTO.class)));
        }
        return dtoList;
    }

    /**
     * Busca envíos por fecha de envío.
     *
     * @param fechaEnvio fecha a filtrar
     * @return lista de resultados
     */
    public List<EnvioDTO> findByFechaEnvio(LocalDateTime fechaEnvio) {
        if (fechaEnvio == null) {
            throw new FechaInvalidaException("La fecha de envío no puede ser nula");
        }
        if (fechaEnvio.isAfter(LocalDateTime.now())) {
            throw new FechaInvalidaException("La fecha de envío no puede ser una fecha futura");
        }
        Optional<List<Envio>> encontrados = repo.findByFechaEnvio(fechaEnvio);
        List<EnvioDTO> dtoList = new ArrayList<>();
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            encontrados.get().forEach(entity -> dtoList.add(mapper.map(entity, EnvioDTO.class)));
        }
        return dtoList;
    }

    /**
     * Busca envíos por fecha de entrega.
     *
     * @param fechaEntrega fecha a filtrar
     * @return lista de resultados
     */
    public List<EnvioDTO> findByFechaEntrega(LocalDateTime fechaEntrega) {
        if (fechaEntrega == null) {
            throw new FechaInvalidaException("La fecha de entrega no puede ser nula");
        }
        
        Optional<List<Envio>> encontrados = repo.findByFechaEntrega(fechaEntrega);
        List<EnvioDTO> dtoList = new ArrayList<>();
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            encontrados.get().forEach(entity -> dtoList.add(mapper.map(entity, EnvioDTO.class)));
        }
        return dtoList;
    }

    /**
     * Busca envíos según si fueron entregados a tiempo.
     *
     * @param entregaATiempo estado
     * @return lista de resultados
     */
    public List<EnvioDTO> findByEntregaATiempo(boolean entregaATiempo) {
        Optional<List<Envio>> encontrados = repo.findByEntregaATiempo(entregaATiempo);
        List<EnvioDTO> dtoList = new ArrayList<>();
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            encontrados.get().forEach(entity -> dtoList.add(mapper.map(entity, EnvioDTO.class)));
        }
        return dtoList;
    }
}