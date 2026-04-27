import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Subject } from 'rxjs';
import {UsuariosModule} from '../usuarios/usuarios.module';
import {Usuarios} from '../usuarios/usuarios';

/**
 * @description
 * Servicio principal encargado de la gestión de los usuarios (clientes y administradores).
 * Funciona como el puente de comunicación HTTP entre la aplicación Angular y
 * la API REST en Spring Boot. Además, utiliza RxJS para manejar el estado global,
 * permitiendo sincronizar tablas, listas y filtros entre múltiples componentes.
 */
@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/usuario';

  /**
   * @description Subject interno utilizado como disparador para indicar que la tabla debe recargarse.
   */
  private refrescarTabla = new Subject<void>();

  /**
   * @description Subject que almacena y emite arreglos de usuarios para actualizar la vista de la tabla.
   */
  public listaUsuarios = new Subject<UsuarioModel[]>();
  listaUsuarios$ = this.listaUsuarios.asObservable();

  /**
   * @description Subject interno para manejar el estado del filtro por tipo de usuario.
   */
  private tipoFiltro = new Subject<string>();
  tipoFiltro$ = this.tipoFiltro.asObservable();

  /**
   * @description
   * Envía una petición POST al backend mediante Query Params para registrar
   * una nueva cuenta de usuario en el sistema.
   * @param cedula - Número de documento de identidad del usuario.
   * @param nombre - Nombre(s) del usuario.
   * @param apellido - Apellido(s) del usuario.
   * @param correo - Correo electrónico a vincular con la cuenta.
   * @param contrasena - Contraseña de acceso.
   * @param tipoUsuario - Nivel de suscripción o rol (ej. 'Normal', 'Premium', 'Admin').
   * @returns Un observable con un mensaje de texto confirmando la creación exitosa.
   */
  postCrearUsuarios(cedula:number,
                    nombre: string,
                    apellido: string,
                    correo: string,
                    contrasena: string,
                    tipoUsuario: string) {
    return this.cliente.post(
      this.urlbase + "/crearUsuario?cedula=" + cedula +
      "&nombre=" + nombre +
      "&apellido=" + apellido +
      "&correo=" + correo +
      "&contrasena=" + contrasena +
      "&tipoUsuario=" + tipoUsuario,
      null,
      { responseType: 'text' }
    );
  }

  /**
   * @description Observable expuesto para que los componentes escuchen las peticiones de refresco de tabla.
   */
  refrescarTabla$ = this.refrescarTabla.asObservable();

  /**
   * @description
   * Emite un evento a través del Subject `refrescarTabla` para notificar
   * a los componentes suscritos que deben recargar los datos del backend.
   * @returns {void}
   */
  notificarRefresco() {
    this.refrescarTabla.next();
  }

  /**
   * @description
   * Realiza una petición GET al servidor para obtener la lista completa de usuarios registrados.
   * @returns Un observable que contiene la respuesta HTTP con el arreglo de `UsuarioModel`.
   */
  getUsuarios(){
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/mostrarUsuarios',{
      observe: 'response',
    });
  }

  /**
   * @description
   * Ejecuta una petición DELETE para eliminar de forma permanente la cuenta
   * de un usuario mediante su ID.
   * @param id - Identificador numérico único del usuario.
   * @returns Un observable con un mensaje de texto confirmando la eliminación.
   */
  deleteUsuarios(id: number) {
    return this.cliente.delete(
      this.urlbase + "/eliminarUsuario?id=" + id,
      {responseType: 'text'}
    );
  }

  /**
   * @description
   * Envía una petición PUT al backend para actualizar los datos personales
   * y las credenciales de acceso de un usuario específico.
   * @param id - Identificador único del usuario a actualizar.
   * @param cedula - Nuevo número de documento de identidad.
   * @param nombre - Nuevo nombre.
   * @param apellido - Nuevo apellido.
   * @param correo - Nuevo correo electrónico.
   * @param contrasena - Nueva contraseña de acceso.
   * @returns Un observable con un mensaje de confirmación tras la actualización.
   */
  putActualizarUsuario(id: number,
                       cedula:number,
                       nombre: string,
                       apellido: string,
                       correo: string,
                       contrasena: string,
  ) {
    return this.cliente.put(
      this.urlbase + "/actualizarUsuario?id=" + id +
      "&cedula=" + cedula +
      "&nombre=" + nombre +
      "&apellido=" + apellido +
      "&correo=" + correo +
      "&contrasena=" + contrasena,
      null,
      { responseType: 'text' }
    );
  }

  /**
   * @description
   * Ejecuta una petición PUT dedicada a modificar únicamente el rango,
   * rol o nivel de suscripción de un usuario.
   * @param id - Identificador único del usuario.
   * @param tipoUsuario - El nuevo tipo o nivel a asignar.
   * @returns Un observable con el mensaje de éxito de la operación.
   */
  putActualizarTipo(id:number, tipoUsuario:String) {
    return this.cliente.put(
      this.urlbase + "/actualizartipo?id=" + id+ "&tipoUsuario=" + tipoUsuario, null,
      { responseType: 'text' }
    );
  }

  /**
   * @description
   * Realiza una petición GET para buscar usuarios en la base de datos
   * que coincidan con un nombre o un fragmento de este.
   * @param nombre - Texto a buscar.
   * @returns Un observable con la respuesta HTTP y los usuarios coincidentes.
   */
  getBuscarPorNombre(nombre: string) {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/buscarpornombre?nombre=' + nombre,
      {observe: 'response'});
  }

  /**
   * @description
   * Emite un arreglo de usuarios actualizado hacia el Subject `listaUsuarios`,
   * lo cual actualiza automáticamente las vistas de los componentes que lo estén escuchando.
   * @param usuarios - El nuevo arreglo de usuarios a mostrar.
   * @returns {void}
   */
  actualizarUsuarios(usuarios: UsuarioModel[]) {
    this.listaUsuarios.next(usuarios);
  }

  /**
   * @description
   * Emite el tipo de usuario seleccionado hacia el observable `tipoFiltro$`
   * para que la tabla principal aplique el filtro visual correspondiente.
   * @param tipo - El tipo de usuario a filtrar (ej. 'Premium', 'Normal').
   * @returns {void}
   */
  filtrarPorTipo(tipo: string) {
    this.tipoFiltro.next(tipo);
  }

}
