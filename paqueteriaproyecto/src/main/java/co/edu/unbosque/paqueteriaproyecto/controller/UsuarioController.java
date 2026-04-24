package co.edu.unbosque.paqueteriaproyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.paqueteriaproyecto.dto.UsuarioDTO;
import co.edu.unbosque.paqueteriaproyecto.exception.ApellidoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.ContrasenaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.CorreoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.NombreInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.TipoUsuarioInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.service.UsuarioService;

/**
 * Controlador REST para la gestión de usuarios en el sistema de paquetería.
 *
 * <p>Proporciona endpoints para crear, eliminar, actualizar y consultar usuarios,
 * así como buscar por cédula, asignar tipo de usuario y gestionar administradores.
 * Todos los métodos retornan respuestas HTTP con mensajes descriptivos o listas
 * de {@link UsuarioDTO}.</p>
 *
 * <p>Los parámetros se reciben mediante {@code @RequestParam} y las validaciones
 * de negocio se delegan a la capa de servicio, la cual lanza excepciones personalizadas
 * que son capturadas aquí para retornar los códigos de estado HTTP correspondientes.</p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @version 1.0
 * @since 1.0
 * @see UsuarioService
 * @see UsuarioDTO
 */
@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = { "http://localhost:8080", "*" })
public class UsuarioController {

    /** Servicio que contiene la lógica de negocio para la gestión de usuarios. */
    @Autowired
    private UsuarioService usuarioSer;

    /**
     * Constructor por defecto de {@code UsuarioController}.
     * La inyección de dependencias es gestionada por Spring mediante {@code @Autowired}.
     */
    public UsuarioController() {
    }

    /**
     * Crea un nuevo usuario en el sistema con el tipo especificado.
     *
     * <p>Construye un {@link UsuarioDTO} con los datos recibidos y lo delega
     * al servicio para su persistencia. Si algún campo no cumple las validaciones
     * de negocio, se retorna un mensaje de error descriptivo.</p>
     *
     * @param cedula      número de cédula del usuario; debe ser un valor numérico válido
     * @param nombre      nombres del usuario; no debe estar vacío ni contener caracteres inválidos
     * @param apellido    apellidos del usuario; no debe estar vacío ni contener caracteres inválidos
     * @param correo      correo electrónico del usuario; debe tener formato válido
     * @param contrasena  contraseña del usuario; debe cumplir los requisitos mínimos de seguridad
     * @param tipoUsuario tipo de usuario a asignar (por ejemplo, {@code "NORMAL"} o {@code "ADMIN"})
     * @return {@link ResponseEntity} con mensaje {@code "Usuario creado con exito"} y estado
     *         {@code 201 Created} si la operación es exitosa, o el mensaje de la excepción
     *         con estado {@code 400 Bad Request} si algún dato es inválido
     * @throws CedulaInvalidaException      si la cédula no cumple el formato esperado
     * @throws NombreInvalidoException      si el nombre contiene caracteres no permitidos o está vacío
     * @throws ApellidoInvalidoException    si el apellido contiene caracteres no permitidos o está vacío
     * @throws CorreoInvalidoException      si el correo no tiene un formato de email válido
     * @throws ContrasenaInvalidaException  si la contraseña no cumple los requisitos mínimos
     */
    @PostMapping("/crearUsuario")
    public ResponseEntity<String> crearUsuario(@RequestParam long cedula, @RequestParam String nombre,
            @RequestParam String apellido, @RequestParam String correo,
            @RequestParam String contrasena, @RequestParam String tipoUsuario ) {
        try {
            UsuarioDTO nuevo = new UsuarioDTO(cedula, nombre, apellido, correo, contrasena, tipoUsuario, 0);
            usuarioSer.create(nuevo);
            return new ResponseEntity<>("Usuario creado con exito", HttpStatus.CREATED);
        } catch (CedulaInvalidaException | NombreInvalidoException | ApellidoInvalidoException
                | CorreoInvalidoException | TipoUsuarioInvalidoException | ContrasenaInvalidaException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Elimina un usuario del sistema por su identificador único.
     *
     * <p>Si el ID no corresponde a ningún usuario registrado, la capa de servicio
     * lanza una {@link IdExistException} que es capturada para retornar un error.</p>
     *
     * @param id identificador único del usuario que se desea eliminar
     * @return {@link ResponseEntity} con mensaje {@code "Usuario eliminado con exito"} y estado
     *         {@code 202 Accepted} si la eliminación es exitosa, o el mensaje de la excepción
     *         con estado {@code 400 Bad Request} si el ID no existe
     * @throws IdExistException si no se encuentra ningún usuario con el ID proporcionado
     */
    @DeleteMapping("/eliminarUsuario")
    public ResponseEntity<String> eliminarUsuario(@RequestParam Long id) {
        try {
            usuarioSer.delateById(id);
            return new ResponseEntity<>("Usuario eliminado con exito", HttpStatus.ACCEPTED);
        } catch (IdExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Actualiza los datos personales de un usuario existente identificado por su ID.
     *
     * <p>Construye un {@link UsuarioDTO} con los nuevos valores y lo pasa al servicio
     * junto con el ID del registro a modificar. El campo {@code tipoUsuario} se envía
     * como {@code null} ya que no se actualiza en esta operación.</p>
     *
     * @param id          identificador único del usuario a actualizar
     * @param cedula      nuevo número de cédula (puede ser el mismo que el actual)
     * @param nombre      nuevos nombres del usuario
     * @param apellido    nuevos apellidos del usuario
     * @param correo      nuevo correo electrónico
     * @param contrasena  nueva contraseña
     * @return {@link ResponseEntity} con mensaje {@code "Usuario actualizado con exito"} y estado
     *         {@code 202 Accepted} si la actualización es exitosa, o el mensaje de la excepción
     *         con estado {@code 400 Bad Request} si algún dato es inválido o el ID no existe
     * @throws CedulaInvalidaException      si la nueva cédula no es válida
     * @throws NombreInvalidoException      si el nuevo nombre no es válido
     * @throws ApellidoInvalidoException    si el nuevo apellido no es válido
     * @throws CorreoInvalidoException      si el nuevo correo no tiene formato válido
     * @throws ContrasenaInvalidaException  si la nueva contraseña no cumple los requisitos
     * @throws IdExistException             si el ID proporcionado no corresponde a ningún usuario
     */
    @PutMapping("/actualizarUsuario")
    public ResponseEntity<String> actualizarUsuario(@RequestParam Long id, @RequestParam long cedula,
            @RequestParam String nombre, @RequestParam String apellido,
            @RequestParam String correo, @RequestParam String contrasena) {
        try {
            UsuarioDTO actualizado = new UsuarioDTO(cedula, nombre, apellido, correo, contrasena, null, 0);
            usuarioSer.updateById(id, actualizado);
            return new ResponseEntity<>("Usuario actualizado con exito", HttpStatus.ACCEPTED);
        } catch (CedulaInvalidaException | NombreInvalidoException | ApellidoInvalidoException
                | CorreoInvalidoException | ContrasenaInvalidaException | IdExistException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Retorna la lista completa de todos los usuarios registrados en el sistema.
     *
     * <p>Si la lista está vacía se retorna el estado {@code 204 No Content}
     * para indicar que la consulta fue exitosa pero no hay datos disponibles.</p>
     *
     * @return {@link ResponseEntity} con la lista de {@link UsuarioDTO} y estado
     *         {@code 202 Accepted} si existen usuarios, o {@code 204 No Content}
     *         si la lista está vacía
     */
    @GetMapping("/mostrarUsuarios")
    public ResponseEntity<List<UsuarioDTO>> mostrarUsuarios() {
        List<UsuarioDTO> usuarios = usuarioSer.getAll();
        if (usuarios.isEmpty()) {
            return new ResponseEntity<List<UsuarioDTO>>(usuarios, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<UsuarioDTO>>(usuarios, HttpStatus.ACCEPTED);
        }
    }

    /**
     * Busca usuarios cuyo nombre contenga el texto indicado, sin distinción de mayúsculas.
     *
     * <p>Este endpoint reemplaza al anterior {@code GET /buscarporcedula}. Permite búsquedas
     * parciales: por ejemplo, buscar {@code "ana"} retornará {@code "Ana"}, {@code "Adriana"},
     * {@code "Juliana"}, etc. La búsqueda no distingue entre mayúsculas y minúsculas.</p>
     *
     * <p><b>URL:</b> {@code GET /usuario/buscarpornombre?nombre=...}</p>
     *
     * @param nombre fragmento de nombre por el cual filtrar los usuarios
     * @return {@link ResponseEntity} con:
     *         <ul>
     *           <li>Lista de {@link UsuarioDTO} que coinciden y estado {@code 202 Accepted}</li>
     *           <li>Lista vacía y estado {@code 204 No Content} si no hay coincidencias</li>
     *         </ul>
     */
    @GetMapping("/buscarpornombre")
    public ResponseEntity<List<UsuarioDTO>> buscarPorNombre(@RequestParam String nombre) {
    	try {
        List<UsuarioDTO> user = usuarioSer.findByNombre(nombre);
        if (user.isEmpty()) {
            return new ResponseEntity<List<UsuarioDTO>>(user, HttpStatus.NO_CONTENT);
        } 
        
        return new ResponseEntity<List<UsuarioDTO>>(user, HttpStatus.ACCEPTED);
        
        
    	}catch(NombreInvalidoException e) {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    }

    /**
     * Asigna o modifica el tipo de usuario de un registro existente.
     *
     * <p>Los valores aceptados para {@code tipoUsuario} dependen de la lógica
     * definida en {@link UsuarioService#asignarTipo(Long, String)}.
     * Si el ID no existe o el tipo es inválido, se retorna un error.</p>
     *
     * @param id          identificador único del usuario al que se le asignará el nuevo tipo
     * @param tipoUsuario nuevo tipo de usuario a asignar (por ejemplo, {@code "NORMAL"} o {@code "ADMIN"})
     * @return {@link ResponseEntity} con mensaje {@code "Tipo de usuario asignado con exito"} y estado
     *         {@code 202 Accepted} si la operación es exitosa, o el mensaje de la excepción
     *         con estado {@code 400 Bad Request} si el ID no existe o el tipo es inválido
     * @throws IdExistException              si no se encuentra ningún usuario con el ID dado
     * @throws TipoUsuarioInvalidoException  si el valor de {@code tipoUsuario} no es reconocido
     */
    @PutMapping("/actualizartipo")
    public ResponseEntity<String> actualizarTipo(@RequestParam Long id,
            @RequestParam String tipoUsuario) {
        try {
            usuarioSer.asignarTipo(id, tipoUsuario);
            return new ResponseEntity<>("Tipo de usuario asignado con exito", HttpStatus.ACCEPTED);
        } catch (IdExistException | TipoUsuarioInvalidoException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    /**
     * Autentica a un usuario y retorna su información si las credenciales son válidas.
     *
     * <p>El frontend usa el campo {@code tipoUsuario} del objeto retornado para decidir
     * a qué página redirigir:</p>
     * <ul>
     *   <li>Si {@code tipoUsuario == "Admin"} → redirige a la página de administración.</li>
     *   <li>Si {@code tipoUsuario == "Normal"}, {@code "Premium"} o {@code "Concurrente"}
     *       → redirige a la página del usuario regular.</li>
     * </ul>
     *
     * <p>Si las credenciales no coinciden con ningún registro, retorna
     * {@code 401 Unauthorized} con el mensaje {@code "Credenciales invalidas"}.</p>
     *
     * <p><b>URL:</b> {@code POST /usuario/login}</p>
     *
     * @param correo     correo electrónico del usuario que intenta iniciar sesión
     * @param contrasena contraseña del usuario que intenta iniciar sesión
     * @return {@link ResponseEntity} con:
     *         <ul>
     *           <li>{@link UsuarioDTO} completo y estado {@code 202 Accepted} si las credenciales son correctas</li>
     *           <li>{@code "Credenciales invalidas"} y estado {@code 401 Unauthorized} si no coinciden</li>
     *         </ul>
     */
    
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String correo, @RequestParam String contrasena){
    	
    	try {
    		UsuarioDTO usuario = usuarioSer.login(correo, contrasena);
    		return new ResponseEntity<>(usuario, HttpStatus.ACCEPTED);
    		
    	}catch(CorreoInvalidoException | ContrasenaInvalidaException e) {
    		
    		return new ResponseEntity<>("Credenciales invalidas",HttpStatus.BAD_REQUEST);
    	}
    	
    }
}