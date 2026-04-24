package co.edu.unbosque.paqueteriaproyecto.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.paqueteriaproyecto.dto.TrabajadorDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.CargoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.CorreoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.NombreInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.NumeroTelefonoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.service.TrabajadorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

/**
 * Controlador REST para la gestión de trabajadores en el sistema de paquetería.
 * <p>
 * Expone los endpoints HTTP para crear, consultar, actualizar, asignar cargo
 * y eliminar trabajadores, así como para realizar búsquedas por nombre y por
 * nombre combinado con correo electrónico.
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @since 1.0
 */
@RestController
@RequestMapping("/trabajador")
@CrossOrigin(origins = {"http://localhost:8080", "*"})
public class TrabajadorController {

	@Autowired
	private TrabajadorService trabajadorSer;

	public TrabajadorController() {
	}

	/**
	 * Crea un nuevo trabajador en el sistema a partir de los parámetros recibidos.
	 *
	 * @param nombre   nombre completo del trabajador
	 * @param cedula   número de cédula del trabajador
	 * @param telefono número de teléfono del trabajador
	 * @param email    correo electrónico del trabajador
	 * @param cargo    cargo o rol que desempeña el trabajador
	 * @return {@code 201 Created} si el trabajador fue creado correctamente,
	 *         {@code 400 Bad Request} si algún parámetro es inválido
	 */
	@PostMapping("/creartrabajador")
	public ResponseEntity<String> crearTrabajador(@RequestParam String nombre, @RequestParam long cedula,
			@RequestParam long telefono, @RequestParam String email, @RequestParam String cargo) {
		try {
		TrabajadorDTO nuevo = new TrabajadorDTO(nombre, cedula, telefono, email, cargo);
		trabajadorSer.create(nuevo);
		return new ResponseEntity<>("Empleado creado con éxito", HttpStatus.CREATED); 																			
		
		
		}catch(NombreInvalidoException | CedulaInvalidaException | NumeroTelefonoInvalidoException 
			| CorreoInvalidoException | CargoInvalidoException | IdExistException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Recupera la lista completa de trabajadores registrados en el sistema.
	 *
	 * @return {@code 202 Accepted} con la lista de {@link TrabajadorDTO} si existen registros,
	 *         {@code 204 No Content} si la lista está vacía
	 */
	@GetMapping("/mostrartrabajadores")
	public ResponseEntity<List<TrabajadorDTO>> mostrarTrabajador() {
		List<TrabajadorDTO> trabajadores = trabajadorSer.getAll();
		if (trabajadores.isEmpty()) {
			return new ResponseEntity<List<TrabajadorDTO>>(trabajadores, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<TrabajadorDTO>>(trabajadores, HttpStatus.ACCEPTED);
		}
	}

	/**
	 * Actualiza los datos personales de un trabajador existente identificado por su ID.
	 * <p>
	 * El cargo del trabajador no se modifica mediante este endpoint; para ello
	 * debe usarse el endpoint {@code /asignarcargo}.
	 * </p>
	 *
	 * @param id       identificador único del trabajador a actualizar
	 * @param nombre   nuevo nombre completo del trabajador
	 * @param cedula   nuevo número de cédula del trabajador
	 * @param telefono nuevo número de teléfono del trabajador
	 * @param email    nuevo correo electrónico del trabajador
	 * @return {@code 202 Accepted} si la actualización fue exitosa,
	 *         {@code 400 Bad Request} si algún parámetro es inválido o el ID no existe
	 */
	@PutMapping("/actualizartrabajador")
	public ResponseEntity<String> actualizarTrabajador(@RequestParam Long id, @RequestParam String nombre, @RequestParam long cedula,
			@RequestParam long telefono, @RequestParam String email) {
        try {
        	 TrabajadorDTO data = new TrabajadorDTO(nombre, cedula, telefono, email, null);
             trabajadorSer.updateById(id, data);
		return new ResponseEntity<>("Trabajador actualizado correctamente", HttpStatus.ACCEPTED);
        }catch(NombreInvalidoException | CedulaInvalidaException | NumeroTelefonoInvalidoException 
				   | CorreoInvalidoException | IdExistException e) {
        	return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
	}

	/**
	 * Asigna o actualiza el cargo de un trabajador existente identificado por su ID.
	 *
	 * @param id    identificador único del trabajador al que se le asignará el cargo
	 * @param cargo nuevo cargo a asignar al trabajador
	 * @return {@code 202 Accepted} si el cargo fue actualizado correctamente,
	 *         {@code 400 Bad Request} si el ID no existe o el cargo es inválido
	 */
	@PutMapping("/actualizarcargo")
	public ResponseEntity<String> actualizarCargo(@RequestParam Long id, @RequestParam String cargo) {
	    try {
	        trabajadorSer.asignarCargo(id, cargo);
	         return new ResponseEntity<>("Cargo actualizado correctamente", HttpStatus.ACCEPTED);
	    } catch (IdExistException | CargoInvalidoException e) {
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}

	/**
	 * Elimina un trabajador del sistema según su identificador único.
	 *
	 * @param id identificador único del trabajador a eliminar
	 * @return {@code 202 Accepted} si el trabajador fue eliminado correctamente,
	 *         {@code 404 Not Found} si el ID no existe
	 */
	@DeleteMapping("/eliminartrabajador")
	public ResponseEntity<String> eliminarTrabajador(@RequestParam Long id) {
		
		try {
				
		trabajadorSer.delateById(id);
		return new ResponseEntity<>("Trabajador eliminado correctamente", HttpStatus.ACCEPTED);
		
		}catch(IdExistException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * Busca y retorna los trabajadores cuyo nombre coincida con el indicado.
	 *
	 * @param nombre nombre del trabajador por el cual se desea filtrar
	 * @return {@code 202 Accepted} con la lista filtrada de {@link TrabajadorDTO} si hay resultados,
	 *         {@code 204 No Content} si no hay coincidencias o el nombre es inválido
	 */
	@GetMapping("/buscartrabajadorpornombre")
	public ResponseEntity<List<TrabajadorDTO>> buscarPorNombre(@RequestParam String nombre) {
		
		try {
		List<TrabajadorDTO> trabajadores = trabajadorSer.findByNombre(nombre);
		if (trabajadores.isEmpty()) {
			return new ResponseEntity<List<TrabajadorDTO>>(trabajadores, HttpStatus.NO_CONTENT);
		} 
		
		return new ResponseEntity<List<TrabajadorDTO>>(trabajadores, HttpStatus.ACCEPTED);
		
		}catch(NombreInvalidoException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

}