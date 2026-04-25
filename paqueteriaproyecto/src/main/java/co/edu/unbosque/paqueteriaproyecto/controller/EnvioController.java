package co.edu.unbosque.paqueteriaproyecto.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import co.edu.unbosque.paqueteriaproyecto.dto.EnvioDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.DescripcionInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.DireccionInvalidaException;

import co.edu.unbosque.paqueteriaproyecto.exception.FechaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.PesoInvalidoException;

import co.edu.unbosque.paqueteriaproyecto.exception.TipoPaqueteInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.service.EnvioService;

/**
 * Controlador REST para la gestión de envíos en el sistema de paquetería.
 * <p>
 * Expone los endpoints HTTP para crear, consultar, actualizar y eliminar
 * envíos, así como para realizar búsquedas por tipo de paquete, fecha de
 * envío, fecha de entrega y estado de entrega a tiempo.
 * </p>
 *
 * @author Kevyn Yoel Cardenas Mendez
 * @author Laura Catalina Soto Vasquez
 * @since 1.0
 */
@RestController
@RequestMapping("/envio")
@CrossOrigin(origins = { "http://localhost:8080", "*" })
public class EnvioController {

    @Autowired
    private EnvioService service;

    public EnvioController() {
    }

    /**
     * Crea un nuevo envío en el sistema a partir de los parámetros recibidos.
     *
     * @param tipoPaquete  tipo de paquete a enviar
     * @param descripcion  descripción del contenido del paquete
     * @param peso         peso del paquete en kilogramos
     * @param destino      dirección de destino del envío
     * @param fechaEnvio   fecha y hora programada para el envío
     * @param fechaEntrega fecha y hora estimada de entrega
     * @return {@code 201 Created} si el envío se creó correctamente,
     *         {@code 400 Bad Request} si algún parámetro es inválido
     */
    @PostMapping("/crearpaquete")
    public ResponseEntity<String> crearPaquete(@RequestParam String tipoPaquete, @RequestParam String descripcion,
            @RequestParam double peso, @RequestParam String destino,
            @RequestParam LocalDateTime fechaEnvio, @RequestParam LocalDateTime fechaEntrega) {
        try {
            EnvioDTO dto = new EnvioDTO(tipoPaquete, descripcion, peso, destino, fechaEnvio, fechaEntrega);
            service.create(dto);
            return new ResponseEntity<>("Envío creado correctamente", HttpStatus.CREATED);

        } catch (TipoPaqueteInvalidoException | PesoInvalidoException |
                 DescripcionInvalidaException | DireccionInvalidaException |
                 FechaInvalidaException | IdExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Recupera la lista completa de envíos registrados en el sistema.
     *
     * @return {@code 202 Accepted} con la lista de {@link EnvioDTO} si existen registros,
     *         {@code 204 No Content} si la lista está vacía
     */
    @GetMapping("/mostrarpaquetes")
    public ResponseEntity<List<EnvioDTO>> mostrarPaquetes() {

		List<EnvioDTO> lista = service.getAll();
		if (lista.isEmpty()) {
			return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.ACCEPTED);
		}

    }

    /**
     * Actualiza los datos de un envío existente identificado por su ID.
     *
     * @param id           identificador único del envío a actualizar
     * @param tipoPaquete  nuevo tipo de paquete
     * @param descripcion  nueva descripción del contenido del paquete
     * @param peso         nuevo peso del paquete en kilogramos
     * @param destino      nueva dirección de destino del envío
     * @param fechaEnvio   nueva fecha y hora programada para el envío
     * @param fechaEntrega nueva fecha y hora estimada de entrega
     * @return {@code 202 Accepted} si la actualización fue exitosa,
     *         {@code 400 Bad Request} si algún parámetro es inválido
     */
    @PutMapping("/actualizarpaquete")
    public ResponseEntity<String> actualizarPaquete(@RequestParam Long id, @RequestParam String tipoPaquete, @RequestParam String descripcion,
            @RequestParam double peso, @RequestParam String destino,
            @RequestParam LocalDateTime fechaEnvio, @RequestParam LocalDateTime fechaEntrega) {
    	
        try {
        	EnvioDTO data = new EnvioDTO(tipoPaquete,descripcion,peso,destino,fechaEnvio,fechaEntrega);
            service.updateById(id, data);
            return new ResponseEntity<>("Actualizado correctamente", HttpStatus.ACCEPTED);

        } catch (TipoPaqueteInvalidoException | PesoInvalidoException |
                 DescripcionInvalidaException | DireccionInvalidaException |
                 FechaInvalidaException | IdExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);

        } 
    }

    /**
     * Elimina un envío del sistema según su identificador único.
     *
     * @param id identificador único del envío a eliminar
     * @return {@code 202 Accepted} si el envío fue eliminado correctamente,
     *         {@code 404 Not Found} si el ID no existe
     */
    @DeleteMapping("/eliminarpaquete")
    public ResponseEntity<String> eliminarPaquete(@RequestParam Long id) {
        try {
            service.delateById(id);
            return new ResponseEntity<>("Eliminado correctamente", HttpStatus.ACCEPTED);

        } catch (IdExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
      
    }

    /**
     * Busca y retorna los envíos que coincidan con el tipo de paquete indicado.
     *
     * @param tipo tipo de paquete por el cual se desea filtrar
     * @return {@code 202 Accepted} con la lista filtrada de {@link EnvioDTO} si hay resultados,
     *         {@code 204 No Content} si no hay coincidencias,
     *         {@code 400 Bad Request} si el tipo de paquete es inválido
     */
    @GetMapping("/buscarpaqueteportipo")
    public ResponseEntity<List<EnvioDTO>> buscarPaquetePorTipo(@RequestParam String tipo) {
        try {
            List<EnvioDTO> lista = service.findByTipoPaquete(tipo);
            if (lista.isEmpty()) {
                return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.ACCEPTED);

        } catch (TipoPaqueteInvalidoException e) {
            return new ResponseEntity<List<EnvioDTO>>(HttpStatus.BAD_REQUEST);

        }
    }

    /**
     * Busca y retorna los envíos cuya fecha de envío coincida con la indicada.
     *
     * @param fecha fecha y hora de envío por la cual se desea filtrar
     * @return {@code 202 Accepted} con la lista filtrada de {@link EnvioDTO} si hay resultados,
     *         {@code 204 No Content} si no hay coincidencias,
     *         {@code 400 Bad Request} si la fecha es inválida
     */
    @GetMapping("/buscarpaqueteporfechaEnvio")
    public ResponseEntity<List<EnvioDTO>> buscarPaquetePorFechaEnvio(@RequestParam LocalDateTime fecha) {
        try {
            List<EnvioDTO> lista = service.findByFechaEnvio(fecha);
            if (lista.isEmpty()) {
                return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.ACCEPTED);

        } catch (FechaInvalidaException e) {
            return new ResponseEntity<List<EnvioDTO>>(HttpStatus.BAD_REQUEST);

        } 
    }
   

    /**
     * Busca y retorna los envíos filtrados según su estado de entrega a tiempo.
     *
     * @param estado {@code true} para obtener los envíos entregados a tiempo,
     *               {@code false} para los entregados fuera de tiempo
     * @return {@code 202 Accepted} con la lista filtrada de {@link EnvioDTO} si hay resultados,
     *         {@code 204 No Content} si no hay coincidencias
     */
    @GetMapping("/buscaratiempo")
    public ResponseEntity<List<EnvioDTO>> buscarATiempo(@RequestParam boolean estado) {
      
		List<EnvioDTO> lista = service.findByEntregaATiempo(estado);
		if (lista.isEmpty()) {
			return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<EnvioDTO>>(lista, HttpStatus.ACCEPTED);
        
    }
}