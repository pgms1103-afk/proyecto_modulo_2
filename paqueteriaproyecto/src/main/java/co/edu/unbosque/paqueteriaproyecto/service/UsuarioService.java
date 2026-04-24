package co.edu.unbosque.paqueteriaproyecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unbosque.paqueteriaproyecto.dto.UsuarioDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.Usuario;
import co.edu.unbosque.paqueteriaproyecto.entity.UsuarioAdmin;
import co.edu.unbosque.paqueteriaproyecto.entity.UsuarioConcurrente;
import co.edu.unbosque.paqueteriaproyecto.entity.UsuarioNormal;
import co.edu.unbosque.paqueteriaproyecto.entity.UsuarioPremium;
import co.edu.unbosque.paqueteriaproyecto.exception.ApellidoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.ContrasenaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.CorreoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.NombreInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.TipoUsuarioInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

/**
 * Servicio principal para la gestión de usuarios en el sistema de paquetería.
 * <p>
 * Implementa las operaciones CRUD básicas a través de {@link CRUDoperation} y agrega
 * funcionalidades específicas como creación de administradores, asignación de tipos de usuario
 * (cambio de rol/tarifa), búsqueda por cédula y obtención de administradores.
 * </p>
 * <p>
 * Realiza validaciones exhaustivas de negocio en todos los campos sensibles (cédula, nombre,
 * apellido, correo, contraseña) antes de persistir o actualizar datos.
 * Utiliza {@link ModelMapper} para conversiones automáticas entre {@link UsuarioDTO} y entidades JPA.
 * </p>
 * <p>
 * Nota: Las operaciones {@link #count()} y {@link #exist(Long)} están implementadas como placeholders
 * (retornan 0/false). Se recomienda completarlas si son necesarias en el futuro.
 * </p>
 *
 * @author Jose Manuel Cipagauta Toro
 * @since 1.0
 * @see CRUDoperation
 * @see UsuarioRepository
 * @see UsuarioDTO
 * @see Usuario
 * @see ModelMapper
 */
@Service
public class UsuarioService implements CRUDoperation<UsuarioDTO> {

    @Autowired
    private UsuarioRepository usuarioRep;

    @Autowired
    private ModelMapper mapper;

    public UsuarioService() {
    }

    /**
     * Crea un nuevo usuario de tipo NORMAL con tarifa predeterminada de 5000.0.
     * <p>
     * Realiza validaciones completas de cédula (10 dígitos, rango, unicidad),
     * nombre y apellido (solo letras y espacios, sin dobles), correo (formato y unicidad)
     * y contraseña (mínimo 8 caracteres, al menos 1 mayúscula y 1 número).
     * </p>
     *
     * @param data DTO con los datos del nuevo usuario
     * @return 0 (convención de éxito en esta implementación)
     * @throws CedulaInvalidaException    si la cédula es inválida o ya existe
     * @throws NombreInvalidoException    si el nombre es inválido
     * @throws ApellidoInvalidoException  si el apellido es inválido
     * @throws CorreoInvalidoException    si el correo es inválido o ya existe
     * @throws ContrasenaInvalidaException si la contraseña no cumple requisitos
     */
    @Override
    public int create(UsuarioDTO data) {
        if (data.getCedula() <= 0) {
            throw new CedulaInvalidaException("La cedula no puede ser negativa o cero");
        }
        if (String.valueOf(data.getCedula()).length() != 10) {
            throw new CedulaInvalidaException("Numero de cedula invalido, debe tener 10 digitos y no empezar por 0");
        }
        if (usuarioRep.existsByCedula(data.getCedula())) {
            throw new CedulaInvalidaException("La cedula ya esta registrada");
        }
        if (data.getNombre() == null || data.getNombre().isBlank()) {
            throw new NombreInvalidoException("El nombre no puede estar vacio");
        }
        if (!data.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
        }
        if (data.getNombre().contains(" ")) {
            throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
        }
        if (data.getApellido() == null || data.getApellido().isBlank()) {
            throw new ApellidoInvalidoException("El apellido no puede estar vacio");
        }
        if (!data.getApellido().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new ApellidoInvalidoException("El apellido solo debe contener letras y espacios");
        }
        if (data.getApellido().contains(" ")) {
            throw new ApellidoInvalidoException("El apellido no puede contener espacios dobles");
        }
        if (data.getCorreo() == null || data.getCorreo().isBlank()) {
            throw new CorreoInvalidoException("El correo no puede estar vacio");
        }
        if (!data.getCorreo().matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }
        if (usuarioRep.existsByCorreo(data.getCorreo())) {
            throw new CorreoInvalidoException("El correo ya esta registrado");
        }
        if (data.getContrasena() == null || data.getContrasena().isBlank()) {
            throw new ContrasenaInvalidaException("La contrasena no puede estar vacia");
        }
        if (data.getContrasena().length() < 8) {
            throw new ContrasenaInvalidaException("La contrasena debe tener minimo 8 caracteres");
        }
        if (!data.getContrasena().matches(".*[A-Z].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos una letra mayuscula");
        }
        if (!data.getContrasena().matches(".*[0-9].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos un numero");
        }
        if (data.getTipoUsuario() == null || data.getTipoUsuario().isBlank()) {
            throw new TipoUsuarioInvalidoException("El tipo de usuario no puede estar vacio");
        }
        if (!data.getTipoUsuario().matches("Normal|Premium|Concurrente")) {
            throw new TipoUsuarioInvalidoException("El tipo debe ser exactamente: Normal, Premium, Concurrente" 
                                                    +" \n La primera letra debe ir en mayuscula y lo demas en minuscula.");
        }

        if(!data.getTipoUsuario().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new TipoUsuarioInvalidoException("El tipo de de usuario solo debe tener letras y espacios");
        }
        Usuario entity = null;
        switch (data.getTipoUsuario().toLowerCase()) {
        case "normal":
            entity = new UsuarioNormal();
            break;
        case "concurrente":
            entity = new UsuarioConcurrente();
            break;
        case "premium":
            entity = new UsuarioPremium();
            break;
        }

        mapper.map(data, entity);

        if (entity instanceof UsuarioNormal) {
            ((UsuarioNormal) entity).setTarifa(5000.0);
        } else if (entity instanceof UsuarioConcurrente) {
            ((UsuarioConcurrente) entity).setTarifa(2000.0);
        } else if (entity instanceof UsuarioPremium) {
            ((UsuarioPremium) entity).setTarifa(3500.0);
        }

        usuarioRep.save(entity);
        return 0;
    }
    /**
     * Obtiene todos los usuarios registrados, excluyendo administradores.
     * <p>
     * Convierte las entidades JPA a DTOs usando ModelMapper.
     * </p>
     *
     * @return lista de {@link UsuarioDTO} (excluye usuarios ADMIN)
     */
    @Override
    public List<UsuarioDTO> getAll() {
        List<Usuario> entityList = (List<Usuario>) usuarioRep.findAll();
        List<UsuarioDTO> dtoList = new ArrayList<>();
        entityList.forEach((entity) -> {
            if (entity instanceof UsuarioAdmin) {
                return;
            }
            UsuarioDTO dto = mapper.map(entity, UsuarioDTO.class);
            if (entity instanceof UsuarioNormal) {
                dto.setTipoUsuario("Normal");
                dto.setTarifa(((UsuarioNormal) entity).getTarifa());
            } else if (entity instanceof UsuarioConcurrente) {
                dto.setTipoUsuario("Concurrente");
                dto.setTarifa(((UsuarioConcurrente) entity).getTarifa());
            } else if (entity instanceof UsuarioPremium) {
                dto.setTipoUsuario("Premium");
                dto.setTarifa(((UsuarioPremium) entity).getTarifa());
            }
            dtoList.add(dto);
        });
        return dtoList;
    }

    /**
     * Elimina un usuario por su ID.
     * <p>
     * Realiza validaciones básicas de ID y existencia antes de eliminar.
     * </p>
     *
     * @param id identificador del usuario a eliminar
     * @return 0 si se eliminó con éxito, 1 si no se encontró (aunque lanza excepción en la mayoría de casos)
     * @throws IdExistException si el ID es inválido o no existe
     */
    @Override
    public int delateById(Long id) {
    	
    	if(!usuarioRep.existsById(id)) {
			throw new IdExistException("El id no existe"); 
		}
    	usuarioRep.deleteById(id);
			return 0;
    }

    /**
     * Actualiza los datos de un usuario existente manteniendo su tarifa actual.
     * <p>
     * Valida todos los campos de forma similar a {@link #create(UsuarioDTO)},
     * permite cambio de cédula/correo solo si no están ya registrados.
     * Preserva la tarifa del tipo de usuario actual.
     * </p>
     *
     * @param id   ID del usuario a actualizar
     * @param data DTO con los nuevos datos
     * @return 0 si la actualización fue exitosa
     * @throws IdExistException           si el ID es inválido o no existe
     * @throws CedulaInvalidaException    si la nueva cédula es inválida o ya existe
     * @throws NombreInvalidoException    si el nombre es inválido
     * @throws ApellidoInvalidoException  si el apellido es inválido
     * @throws CorreoInvalidoException    si el correo es inválido o ya existe
     * @throws ContrasenaInvalidaException si la contraseña no cumple requisitos
     */
    @Override
    public int updateById(Long id, UsuarioDTO data) {

        if (!usuarioRep.existsById(id)) {
            throw new IdExistException("El id no existe");
        }

        Usuario temp = usuarioRep.findById(id).get();

        if (data.getCedula() <= 0) {
            throw new CedulaInvalidaException("La cedula no puede ser negativa o cero");
        }
        if (String.valueOf(data.getCedula()).length() != 10) {
            throw new CedulaInvalidaException("Numero de cedula invalido, debe tener 10 digitos y no empezar por 0");
        }
        if (data.getCedula() != temp.getCedula() && usuarioRep.existsByCedula(data.getCedula())) {
            throw new CedulaInvalidaException("La cedula ya esta registrada");
        }

        if (data.getNombre() == null || data.getNombre().isBlank()) {
            throw new NombreInvalidoException("El nombre no puede estar vacio");
        }
        if (!data.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
        }
        if (data.getNombre().contains(" ")) {
            throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
        }

        if (data.getApellido() == null || data.getApellido().isBlank()) {
            throw new ApellidoInvalidoException("El apellido no puede estar vacio");
        }
        if (!data.getApellido().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new ApellidoInvalidoException("El apellido solo debe contener letras y espacios");
        }
        if (data.getApellido().contains(" ")) {
            throw new ApellidoInvalidoException("El apellido no puede contener espacios dobles");
        }

        if (data.getCorreo() == null || data.getCorreo().isBlank()) {
            throw new CorreoInvalidoException("El correo no puede estar vacio");
        }
        if (!data.getCorreo().matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }
        if (!data.getCorreo().equals(temp.getCorreo()) && usuarioRep.existsByCorreo(data.getCorreo())) {
            throw new CorreoInvalidoException("El correo ya esta registrado");
        }

        if (data.getContrasena() == null || data.getContrasena().isBlank()) {
            throw new ContrasenaInvalidaException("La contrasena no puede estar vacia");
        }
        if (data.getContrasena().length() < 8) {
            throw new ContrasenaInvalidaException("La contrasena debe tener minimo 8 caracteres");
        }
        if (!data.getContrasena().matches(".*[A-Z].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos una letra mayuscula");
        }
        if (!data.getContrasena().matches(".*[0-9].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos un numero");
        }

        usuarioRep.actualizarUsuario(id, data.getCedula(), data.getNombre(),
                data.getApellido(), data.getCorreo(), data.getContrasena());
        return 0;
    }


    /**
     * Busca usuarios cuyo nombre contenga el texto indicado, sin distinción de mayúsculas.
     *
     * <p>Este método reemplaza a {@code findByCedula} como método de búsqueda principal
     * expuesto al frontend. Internamente delega en
     * {@link UsuarioRepository#findByNombreContaining(String)}, que ejecuta una consulta
     * nativa con {@code LIKE '%nombre%'} en minúsculas.</p>
     *
     * <p>Ejemplos: buscar {@code "ana"} retornará usuarios llamados {@code "Ana"},
     * {@code "Adriana"}, {@code "Solange Ana"}, etc.</p>
     *
     * @param nombre fragmento de nombre por el cual filtrar los usuarios
     * @return lista de {@link UsuarioDTO} que coinciden (parcialmente) con el nombre dado;
     *         lista vacía si no hay coincidencias
     */
    public List<UsuarioDTO> findByNombre(String nombre) {
    	
    	if (nombre == null || nombre.isBlank()) {
	        throw new NombreInvalidoException("El nombre no puede estar vacío");
	    }
	    if (nombre.contains("  ")) {
	        throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
	    }
	    if (!nombre.matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
	        throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
	    }
	    String[] palabras = nombre.trim().split("\\s+");
	    if (palabras.length < 2) {
	        throw new NombreInvalidoException("El nombre debe tener Nombre y Apellido");
	    }
    	
        Optional<List<Usuario>> encontrados = usuarioRep.findByNombre(nombre);
        List<Usuario> entityList = encontrados.get();
        List<UsuarioDTO> dtoList = new ArrayList<>();
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            entityList.forEach((entity) -> {
                UsuarioDTO dto = mapper.map(entity, UsuarioDTO.class);
                if(entity instanceof UsuarioAdmin) {
                	dto.setTipoUsuario("Admin");
                }else if(entity instanceof UsuarioConcurrente) {
                	dto.setTipoUsuario("Concurrente");
                }else if(entity instanceof UsuarioNormal) {
                	dto.setTipoUsuario("Normal");
                }else if(entity instanceof UsuarioPremium) {
                	dto.setTipoUsuario("Premium");
                }
                
                dtoList.add(dto);
            });
            return dtoList;
        } else {
            return new ArrayList<UsuarioDTO>();
        }
    }
 
    /**
     * Autentica a un usuario verificando su correo y contraseña contra la base de datos.
     *
     * <p>Si las credenciales son válidas, retorna el {@link UsuarioDTO} del usuario encontrado,
     * incluyendo su campo {@code tipoUsuario} ({@code "Admin"}, {@code "Normal"}, etc.),
     * que el frontend usa para decidir a qué página redirigir al usuario.</p>
     *
     * <p>Si no se encuentra ningún usuario con esas credenciales, retorna {@code null},
     * lo que provoca que el controlador responda con {@code 401 Unauthorized}.</p>
     *
     * <p><b>Nota de seguridad:</b> actualmente las contraseñas se comparan en texto plano.
     * Se recomienda integrar BCrypt antes de desplegar en producción.</p>
     *
     * @param correo     correo electrónico del usuario que intenta iniciar sesión
     * @param contrasena contraseña del usuario que intenta iniciar sesión
     * @return {@link UsuarioDTO} con los datos del usuario si las credenciales son correctas;
     *         {@code null} si no coinciden con ningún registro
     */
    public UsuarioDTO login(String correo, String contrasena) {
    	
    	if (correo == null || correo.isBlank()) {
            throw new CorreoInvalidoException("El correo no puede estar vacio");
        }
        if (!correo.matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }
    
        if (contrasena == null || contrasena.isBlank()) {
            throw new ContrasenaInvalidaException("La contrasena no puede estar vacia");
        }
        if (contrasena.length() < 8) {
            throw new ContrasenaInvalidaException("La contrasena debe tener minimo 8 caracteres");
        }
        if (!contrasena.matches(".*[A-Z].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos una letra mayuscula");
        }
        if (!contrasena.matches(".*[0-9].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos un numero");
        }

    	
        Optional<Usuario> encontrado = usuarioRep.findByCorreoAndContrasena(correo, contrasena);
        if (encontrado.isPresent()) {
            return mapper.map(encontrado.get(), UsuarioDTO.class);
        }
        return null;
    }

    /**
     * Asigna o cambia el tipo de usuario (rol) de un usuario existente.
     * <p>
     * Actualiza el discriminador {@code tipo_usuario} y la tarifa correspondiente
     * usando una query nativa en el repositorio. Solo permite tipos: NORMAL, PREMIUM, CONCURRENTE, ADMIN.
     * </p>
     *
     * @param id          ID del usuario al que se asignará el nuevo tipo
     * @param tipoUsuario nuevo tipo ("NORMAL", "PREMIUM", "CONCURRENTE", "ADMIN")
     * @return 0 si la asignación fue exitosa, 1 en caso de tipo inválido
     * @throws IdExistException           si el ID no existe
     * @throws TipoUsuarioInvalidoException si el tipo proporcionado no es válido
     */
    @Transactional
    public int asignarTipo(Long id, String tipoUsuario) {
        if (!usuarioRep.existsById(id)) {
            throw new IdExistException("El id no existe");
        }
        if (tipoUsuario == null || tipoUsuario.isBlank()) {
            throw new TipoUsuarioInvalidoException("El tipo de usuario no puede estar vacio");
        }
        if (!tipoUsuario.matches("Normal|Premium|Concurrente|Admin")) {
            throw new TipoUsuarioInvalidoException("El tipo debe ser: \nNormal \nPremium \nConcurrente \nAdmin \n"
            		+ "La primera letra debe ir en mayuscula y lo demas en minuscula.");
        }
        switch (tipoUsuario.toLowerCase()) {
            case "normal":
                UsuarioNormal normal = new UsuarioNormal();
                usuarioRep.actualizarTipoYTarifa(id, normal.getTipoUsuario(), normal.getTarifa());
                return 0;
            case "premium":
                UsuarioPremium premium = new UsuarioPremium();
                usuarioRep.actualizarTipoYTarifa(id, premium.getTipoUsuario(), premium.getTarifa());
                return 0;
            case "concurrente":
                UsuarioConcurrente concurrente = new UsuarioConcurrente();
                usuarioRep.actualizarTipoYTarifa(id, concurrente.getTipoUsuario(), concurrente.getTarifa());
                return 0;
            case "admin":
                UsuarioAdmin admin = new UsuarioAdmin();
                usuarioRep.actualizarTipoYTarifa(id, admin.getTipo(), 0.0);
                return 0;
            default:
                return 1;
        }
    }

    /**
     * Crea un nuevo usuario con rol ADMINISTRADOR.
     * <p>
     * Aplica las mismas validaciones estrictas que {@link #create(UsuarioDTO)},
     * pero mapea directamente a {@link UsuarioAdmin}.
     * </p>
     *
     * @param data DTO con los datos del nuevo administrador
     * @return 0 si se creó con éxito
     * @throws CedulaInvalidaException     si la cédula es inválida o ya existe
     * @throws NombreInvalidoException     si el nombre es inválido
     * @throws ApellidoInvalidoException   si el apellido es inválido
     * @throws CorreoInvalidoException     si el correo es inválido o ya existe
     * @throws ContrasenaInvalidaException si la contraseña no cumple requisitos
     */
    public int crearAdmin(UsuarioDTO data) {
        if (data.getCedula() <= 0) {
            throw new CedulaInvalidaException("La cedula no puede ser negativa o cero");
        }
        if (String.valueOf(data.getCedula()).length() != 10) {
            throw new CedulaInvalidaException("Numero de cedula invalido, debe tener 10 digitos");
        }
        if (usuarioRep.existsByCedula(data.getCedula())) {
            throw new CedulaInvalidaException("La cedula ya esta registrada");
        }
        if (data.getNombre() == null || data.getNombre().isBlank()) {
            throw new NombreInvalidoException("El nombre no puede estar vacio");
        }
        if (!data.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
        }
        if (data.getNombre().contains(" ")) {
            throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
        }
        if (data.getApellido() == null || data.getApellido().isBlank()) {
            throw new ApellidoInvalidoException("El apellido no puede estar vacio");
        }
        if (!data.getApellido().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
            throw new ApellidoInvalidoException("El apellido solo debe contener letras y espacios");
        }
        if (data.getApellido().contains(" ")) {
            throw new ApellidoInvalidoException("El apellido no puede contener espacios dobles");
        }
        if (data.getCorreo() == null || data.getCorreo().isBlank()) {
            throw new CorreoInvalidoException("El correo no puede estar vacio");
        }
        if (!data.getCorreo().matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }
        if (usuarioRep.existsByCorreo(data.getCorreo())) {
            throw new CorreoInvalidoException("El correo ya esta registrado");
        }
        if (data.getContrasena() == null || data.getContrasena().isBlank()) {
            throw new ContrasenaInvalidaException("La contrasena no puede estar vacia");
        }
        if (data.getContrasena().length() < 8) {
            throw new ContrasenaInvalidaException("La contrasena debe tener minimo 8 caracteres");
        }
        if (!data.getContrasena().matches(".*[A-Z].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos una letra mayuscula");
        }
        if (!data.getContrasena().matches(".*[0-9].*")) {
            throw new ContrasenaInvalidaException("La contrasena debe tener al menos un numero");
        }
        UsuarioAdmin entity = mapper.map(data, UsuarioAdmin.class);
        usuarioRep.save(entity);
        return 0;
    }

    /**
     * Obtiene la lista de todos los usuarios con rol ADMINISTRADOR.
     *
     * @return lista de {@link UsuarioDTO} que son administradores (vacía si no hay ninguno)
     */
    public List<UsuarioDTO> encontrarAdmin() {
        Optional<List<Usuario>> encontrados = usuarioRep.findByTipo("Admin");
        if (encontrados.isPresent() && !encontrados.get().isEmpty()) {
            List<Usuario> entityList = encontrados.get();
            List<UsuarioDTO> dtoList = new ArrayList<>();
            entityList.forEach((entity) -> {
                UsuarioDTO dto = mapper.map(entity, UsuarioDTO.class);
                dtoList.add(dto);
            });
            return dtoList;
        } else {
            return new ArrayList<UsuarioDTO>();
        }
    }
}