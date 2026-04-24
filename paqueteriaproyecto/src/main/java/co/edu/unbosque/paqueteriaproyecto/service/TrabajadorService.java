package co.edu.unbosque.paqueteriaproyecto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.unbosque.paqueteriaproyecto.dto.TrabajadorDTO;
import co.edu.unbosque.paqueteriaproyecto.entity.Trabajador;
import co.edu.unbosque.paqueteriaproyecto.entity.TrabajadorAdministrativo;
import co.edu.unbosque.paqueteriaproyecto.entity.TrabajadorConductor;
import co.edu.unbosque.paqueteriaproyecto.entity.TrabajadorManipuladorPaquete;
import co.edu.unbosque.paqueteriaproyecto.exception.CargoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.CedulaInvalidaException;
import co.edu.unbosque.paqueteriaproyecto.exception.CorreoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.IdExistException;
import co.edu.unbosque.paqueteriaproyecto.exception.NombreInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.exception.NumeroTelefonoInvalidoException;
import co.edu.unbosque.paqueteriaproyecto.repository.TrabajadorRepository;
import jakarta.transaction.Transactional;

/**
 * Servicio Spring que implementa la lógica de negocio para la gestión de trabajadores.
 * <p>
 * Implementa la interfaz {@link CRUDoperation} para las operaciones básicas sobre
 * {@link TrabajadorDTO}, e incorpora métodos adicionales para asignar cargo y realizar
 * búsquedas por nombre y por nombre combinado con correo electrónico.
 * </p>
 * <p>
 * Aplica las siguientes reglas de negocio en la creación y actualización de trabajadores:
 * <ul>
 *   <li>El nombre debe contener al menos nombre y apellido, solo letras y sin espacios dobles</li>
 *   <li>La cédula debe tener exactamente 10 dígitos y no puede estar duplicada en el sistema</li>
 *   <li>El teléfono debe tener exactamente 10 dígitos y no puede estar duplicado en el sistema</li>
 *   <li>El correo debe cumplir el formato estándar y no puede estar duplicado en el sistema</li>
 *   <li>El cargo debe ser uno de los siguientes: {@code Administrador}, {@code Conductor} o {@code Manipulador}</li>
 * </ul>
 * </p>
 * <p>
 * Según el cargo indicado, se instancia la subclase correspondiente de {@link Trabajador}:
 * {@link TrabajadorAdministrativo}, {@link TrabajadorConductor} o {@link TrabajadorManipuladorPaquete}.
 * </p>
 *
 * @author David Alejandro Velasquez Salamanca
 * @author Martin Santiago Peña Guitierrez
 * @version 1.0
 * @since 1.0
 * @see TrabajadorRepository
 * @see TrabajadorDTO
 * @see Trabajador
 */
@Service
public class TrabajadorService implements CRUDoperation<TrabajadorDTO> {

	/**
	 * Repositorio para la persistencia de entidades {@link Trabajador}.
	 */
	@Autowired
	private TrabajadorRepository trabajadorRepo;

	/**
	 * Mapeador utilizado para convertir entre entidades {@link Trabajador} y {@link TrabajadorDTO}.
	 */
	@Autowired
	private ModelMapper mapper;

	/**
	 * Construye una nueva instancia de {@code TrabajadorService}.
	 */
	public TrabajadorService() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Crea y persiste un nuevo trabajador en el sistema a partir del DTO recibido.
	 * <p>
	 * Valida todos los campos del {@link TrabajadorDTO} antes de persistir. Según el
	 * cargo indicado, instancia la subclase correspondiente de {@link Trabajador}:
	 * {@link TrabajadorAdministrativo}, {@link TrabajadorConductor} o
	 * {@link TrabajadorManipuladorPaquete}.
	 * </p>
	 *
	 * @param data {@link TrabajadorDTO} con los datos del trabajador a crear
	 * @return {@code 0} si el trabajador fue creado correctamente
	 * @throws NombreInvalidoException          si el nombre es nulo, vacío, contiene caracteres
	 *                                          inválidos, espacios dobles o no incluye apellido
	 * @throws CedulaInvalidaException          si la cédula es negativa, no tiene 10 dígitos
	 *                                          o ya está registrada en el sistema
	 * @throws NumeroTelefonoInvalidoException  si el teléfono no tiene 10 dígitos o ya está
	 *                                          registrado en el sistema
	 * @throws CorreoInvalidoException          si el correo no cumple el formato válido o ya
	 *                                          está registrado en el sistema
	 * @throws CargoInvalidoException           si el cargo es nulo, vacío o no corresponde a
	 *                                          ninguno de los valores permitidos
	 */
	@Override
	public int create(TrabajadorDTO data) {

		if (data.getNombre() == null || data.getNombre().isBlank()) {
			throw new NombreInvalidoException("El nombre no puede estar vacío");
		}

		if (data.getNombre().contains("  ")) {
			throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
		}
		if (!data.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
			throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
		}
		String[] palabras = data.getNombre().trim().split("\\s+");
		if (palabras.length < 2) {
			throw new NombreInvalidoException("El nombre debe tener Nombre y Apellido");
		}

		if (data.getCedula() <= 0) {
			throw new CedulaInvalidaException("La cedula no puede ser negativa");
		}

		if (String.valueOf(data.getCedula()).length() != 10) {
			throw new CedulaInvalidaException("Numero de cedula invalido, debe tener 10 digitos y no empezar por 0");
		}

		if (!String.valueOf(data.getCedula()).matches("\\d+")) {
			throw new CedulaInvalidaException("Numero de cedula invalido, ingrese solo numeros");
		}

		if (trabajadorRepo.existsByCedula(data.getCedula())) {
			throw new CedulaInvalidaException("Cedula ya existente");
		}

		if (String.valueOf(data.getTelefono()).length() <= 0) {
			throw new NumeroTelefonoInvalidoException("El teléfono no puede ser negativo");
		}

		if (String.valueOf(data.getTelefono()).length() != 10) {
			throw new NumeroTelefonoInvalidoException("Número de teléfono inválido. Ej: 3001234567");
		}

		if (!String.valueOf(data.getTelefono()).matches("\\d+")) {
			throw new NumeroTelefonoInvalidoException("Numero invalido, ingrese solo numeros");
		}

		if (trabajadorRepo.existsByTelefono(data.getTelefono())) {
			throw new NumeroTelefonoInvalidoException("Numero de telefono ya existente");
		}

		if (!data.getEmail().matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }

		if (trabajadorRepo.existsByEmail(data.getEmail())) {
			throw new CorreoInvalidoException("Correo ya existente");
		}
		
		if (!data.getCargo().matches("Administrador|Conductor|Manipulador")) {
		    throw new CargoInvalidoException("El cargo debe ser alguno de los siguientes : \n Administrador \n Conductor \n Manipulador" 
		                                     +"\n"+"La primera letra debe ir en mayuscula y lo demas en minuscula.");
		}
		
		if(!data.getCargo().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
			throw new CargoInvalidoException("El cargo solo debe tener cargos y espacios");
		}

		Trabajador entity = null;
		switch (data.getCargo().toLowerCase()) {
		case "administrador":
			entity = new TrabajadorAdministrativo();
		break;
		case "conductor":
			entity = new TrabajadorConductor();
			break;
		case "manipulador":
			entity = new TrabajadorManipuladorPaquete();
			break;
		}
		
		mapper.map(data, entity);
		trabajadorRepo.save(entity);
		return 0;
	}

	/**
	 * Recupera todos los trabajadores registrados en el sistema y los retorna como
	 * lista de {@link TrabajadorDTO}.
	 * <p>
	 * Determina el cargo de cada trabajador mediante inspección de instancia
	 * ({@code instanceof}) y lo asigna manualmente al DTO, dado que la columna
	 * discriminadora no es mapeada automáticamente por {@link ModelMapper}.
	 * </p>
	 *
	 * @return lista de {@link TrabajadorDTO} con todos los trabajadores registrados;
	 *         lista vacía si no hay registros
	 */
	@Override
	public List<TrabajadorDTO> getAll() {
		List<Trabajador> entityList = (List<Trabajador>) trabajadorRepo.findAll();
		List<TrabajadorDTO> dtoList = new ArrayList<>();
		entityList.forEach((entity) -> {
			TrabajadorDTO dto = mapper.map(entity, TrabajadorDTO.class);
	        if (entity instanceof TrabajadorAdministrativo) {
	            dto.setCargo("Administrador");
	        } else if (entity instanceof TrabajadorConductor) {
	            dto.setCargo("Conductor");
	        } else if (entity instanceof TrabajadorManipuladorPaquete) {
	            dto.setCargo("Manipulador");
	        }
			dtoList.add(dto);
		});
		return dtoList;
	}

	/**
	 * Elimina un trabajador del sistema según su identificador único.
	 *
	 * @param id identificador único del trabajador a eliminar
	 * @return {@code 0} si el trabajador fue eliminado correctamente
	 * @throws IdExistException si no existe ningún trabajador con el ID indicado
	 */
	@Override
	public int delateById(Long id) {
		
		if(!trabajadorRepo.existsById(id)) {
			throw new IdExistException("El id no existe"); 
		}
			trabajadorRepo.deleteById(id);
			return 0;

	}

	/**
	 * Actualiza los datos personales de un trabajador existente identificado por su ID.
	 * <p>
	 * No modifica el cargo del trabajador; para ello debe usarse el método
	 * {@link #asignarCargo(Long, String)}. Verifica que los nuevos valores de cédula,
	 * teléfono y correo no estén duplicados en el sistema antes de actualizar.
	 * </p>
	 *
	 * @param id   identificador único del trabajador a actualizar
	 * @param data {@link TrabajadorDTO} con los nuevos datos del trabajador
	 * @return {@code 0} si el trabajador fue actualizado correctamente
	 * @throws IdExistException                si no existe ningún trabajador con el ID indicado
	 * @throws NombreInvalidoException         si el nombre es nulo, vacío, contiene caracteres
	 *                                         inválidos, espacios dobles o no incluye apellido
	 * @throws CedulaInvalidaException         si la cédula es negativa, no tiene 10 dígitos
	 *                                         o ya está registrada en el sistema
	 * @throws NumeroTelefonoInvalidoException si el teléfono no tiene 10 dígitos o ya está
	 *                                         registrado en el sistema
	 * @throws CorreoInvalidoException         si el correo no cumple el formato válido o ya
	 *                                         está registrado en el sistema
	 */
	@Transactional
	@Override
	public int updateById(Long id, TrabajadorDTO data) {

	    if (!trabajadorRepo.existsById(id)) {
	        throw new IdExistException("El id no existe");
	    }

	    if (data.getNombre() == null || data.getNombre().isBlank()) {
	        throw new NombreInvalidoException("El nombre no puede estar vacío");
	    }
	    if (data.getNombre().contains("  ")) {
	        throw new NombreInvalidoException("El nombre no puede contener espacios dobles");
	    }
	    if (!data.getNombre().matches("^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$")) {
	        throw new NombreInvalidoException("El nombre solo debe contener letras y espacios");
	    }
	    String[] palabras = data.getNombre().trim().split("\\s+");
	    if (palabras.length < 2) {
	        throw new NombreInvalidoException("El nombre debe tener Nombre y Apellido");
	    }

	    if (data.getCedula() <= 0) {
	        throw new CedulaInvalidaException("La cedula no puede ser negativa");
	    }
	    if (String.valueOf(data.getCedula()).length() != 10) {
	        throw new CedulaInvalidaException("Numero de cedula invalido, debe tener 10 digitos y no empezar por 0");
	    }
	    if (!String.valueOf(data.getCedula()).matches("\\d+")) {
	        throw new CedulaInvalidaException("Numero de cedula invalido, ingrese solo numeros");
	    }

	    if (String.valueOf(data.getTelefono()).length() != 10) {
	        throw new NumeroTelefonoInvalidoException("Número de teléfono inválido. Ej: 3001234567");
	    }
	    if (!String.valueOf(data.getTelefono()).matches("\\d+")) {
	        throw new NumeroTelefonoInvalidoException("Numero invalido, ingrese solo numeros");
	    }

	    if (!data.getEmail().matches("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$")) {
            throw new CorreoInvalidoException("Correo invalido. Debe tener formato ejemplo@correo.com y solo letras minusculas");
        }

	    Optional<Trabajador> encontrado = trabajadorRepo.findById(id);
	    Trabajador temp = encontrado.get();

	    if (data.getCedula() != temp.getCedula() && trabajadorRepo.existsByCedula(data.getCedula())) {
	        throw new CedulaInvalidaException("Cedula ya existente");
	    }
	    if (data.getTelefono() != temp.getTelefono() && trabajadorRepo.existsByTelefono(data.getTelefono())) {
	        throw new NumeroTelefonoInvalidoException("Numero de telefono ya existente");
	    }
	    if (!data.getEmail().equals(temp.getEmail()) && trabajadorRepo.existsByEmail(data.getEmail())) {
	        throw new CorreoInvalidoException("Correo ya existente");
	    }

	    trabajadorRepo.actualizarTrabajador(id, data.getNombre(), data.getCedula(),
	        data.getTelefono(), data.getEmail());
	    return 0;
	}

	/**
	 * Asigna o actualiza el cargo de un trabajador existente identificado por su ID.
	 * <p>
	 * El cargo debe corresponder exactamente a uno de los valores permitidos con la
	 * primera letra en mayúscula: {@code Administrador}, {@code Conductor} o
	 * {@code Manipulador}.
	 * </p>
	 *
	 * @param id    identificador único del trabajador al que se le asignará el cargo
	 * @param cargo nuevo cargo a asignar al trabajador
	 * @return {@code 0} si el cargo fue asignado correctamente
	 * @throws IdExistException       si no existe ningún trabajador con el ID indicado
	 * @throws CargoInvalidoException si el cargo es nulo, vacío o no corresponde a
	 *                                ninguno de los valores permitidos
	 */
	@Transactional
	public int asignarCargo(Long id, String cargo) {
	    if (!trabajadorRepo.existsById(id)) {
	        throw new IdExistException("El id no existe");
	    }
	    if (cargo == null || cargo.isBlank()) {
	        throw new CargoInvalidoException("El cargo no puede estar vacio");
	    }
	    if (!cargo.matches("Administrador|Conductor|Manipulador")) {
	        throw new CargoInvalidoException("El cargo debe ser: \n Administrador \n Conductor  \n Manipulador"
	                                         +"\n"+"La primera letra debe ir en mayuscula y lo demas en minuscula.");
	    }
	    
	    trabajadorRepo.actualizarCargo(id, cargo);
	    return 0;
	}

	/**
	 * Busca y retorna los trabajadores cuyo nombre coincida con el indicado.
	 * <p>
	 * El nombre debe contener al menos nombre y apellido, solo letras y sin espacios
	 * dobles. El cargo de cada resultado es asignado manualmente al DTO mediante
	 * inspección de instancia ({@code instanceof}).
	 * </p>
	 *
	 * @param nombre nombre completo del trabajador por el cual se desea filtrar
	 * @return lista de {@link TrabajadorDTO} que coincidan con el nombre indicado;
	 *         lista vacía si no hay resultados
	 * @throws NombreInvalidoException si el nombre es nulo, vacío, contiene caracteres
	 *                                 inválidos, espacios dobles o no incluye apellido
	 */
	@Transactional
	public List<TrabajadorDTO> findByNombre(String nombre) {
		
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
	    
		Optional<List<Trabajador>> encontrados = trabajadorRepo.findByNombre(nombre);
		List<Trabajador> entityList = encontrados.get();
		List<TrabajadorDTO> dtoList = new ArrayList<>();
		if(encontrados.isPresent() && !encontrados.get().isEmpty()) {
			entityList.forEach((entity) -> {
				TrabajadorDTO dto = mapper.map(entity, TrabajadorDTO.class);
				 if (entity instanceof TrabajadorAdministrativo) {
		                dto.setCargo("Administrador");
		            } else if (entity instanceof TrabajadorConductor) {
		                dto.setCargo("Conductor");
		            } else if (entity instanceof TrabajadorManipuladorPaquete) {
		                dto.setCargo("Manipulador");
		            }

		            dtoList.add(dto);
		        });
			return dtoList;
	    } else {
	    	return new ArrayList<TrabajadorDTO>();
	    }
	}
	
}