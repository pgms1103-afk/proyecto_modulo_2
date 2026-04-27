import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajadorModel } from '../models/trabajor.model';
import { Subject } from 'rxjs';

/**
 * @description
 * Servicio principal encargado de la gestión del personal y los trabajadores.
 * Actúa como intermediario para realizar las peticiones HTTP hacia la
 * API de Spring Boot y maneja el estado global de la aplicación a través
 * de observables (RxJS), permitiendo sincronizar la vista de la tabla,
 * los filtros y los resultados de búsqueda entre distintos componentes.
 */
@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {

  /**
   * @description
   * Subject de RxJS utilizado para emitir y escuchar los cambios en el filtro
   * de cargos (ej. 'Administrador', 'Conductor').
   */
  private cargoFiltro = new Subject<string>();
  cargoFiltro$ = this.cargoFiltro.asObservable();

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/trabajador';

  /**
   * @description
   * Subject de RxJS que funciona como un disparador (trigger) global para
   * indicar a los componentes suscritos que deben volver a recargar sus datos.
   */
  private refrescarTabla = new Subject<void>();
  refrescarTabla$ = this.refrescarTabla.asObservable();

  /**
   * @description
   * Subject de RxJS que emite una lista de trabajadores modificada o filtrada
   * para actualizar directamente la vista de la tabla sin tener que hacer una
   * nueva petición general.
   */
  private listaTrabajadores = new Subject<TrabajadorModel[]>();
  listaTrabajadores$ = this.listaTrabajadores.asObservable();

  /**
   * @description
   * Realiza una petición GET al backend para obtener la lista completa
   * de todos los trabajadores registrados en el sistema.
   * @returns Un observable que contiene la respuesta HTTP con el arreglo de `TrabajadorModel`.
   */
  getTrabajadores() {
    return this.cliente.get<TrabajadorModel[]>(this.urlbase + '/mostrartrabajadores', {
      observe: 'response',
    });
  }

  /**
   * @description
   * Emite un evento vacío para notificar a los componentes suscritos
   * (como la tabla de trabajadores) que deben volver a consultar los datos
   * actualizados desde el servidor.
   * @returns {void}
   */
  notificarRefresco() {
    this.refrescarTabla.next();
  }

  /**
   * @description
   * Envía una petición POST al backend enviando los datos a través de Query Params
   * para registrar a un nuevo trabajador en el sistema.
   * @param nombre - Nombre(s) y apellido(s) del trabajador.
   * @param cedula - Número de documento de identidad.
   * @param telefono - Número de contacto.
   * @param email - Correo electrónico institucional o personal.
   * @param cargo - Rol o posición que desempeñará en la empresa.
   * @returns Un observable con un mensaje de texto confirmando la creación exitosa.
   */
  postCrearTrabajadores(
    nombre: String,
    cedula: number,
    telefono: number,
    email: String,
    cargo: String,
  ) {
    return this.cliente.post(
      this.urlbase +
      '/creartrabajador?nombre=' +
      nombre +
      '&cedula=' +
      cedula +
      '&telefono=' +
      telefono +
      '&email=' +
      email +
      '&cargo=' +
      cargo,
      null,
      { responseType: 'text' },
    );
  }

  /**
   * @description
   * Ejecuta una petición DELETE para remover permanentemente el registro
   * de un trabajador de la base de datos.
   * @param id - Identificador único numérico del trabajador a eliminar.
   * @returns Un observable con un texto de confirmación tras el borrado exitoso.
   */
  deleteTrabajadores(id: number) {
    return this.cliente.delete(this.urlbase + '/eliminartrabajador?id=' + id, {
      responseType: 'text',
    });
  }

  /**
   * @description
   * Emite el nombre del cargo seleccionado hacia el observable `cargoFiltro$`
   * para que los componentes que muestran listas apliquen el filtro visual correspondiente.
   * @param cargo - El nombre del cargo a filtrar (ej. 'Manipulador').
   * @returns {void}
   */
  filtrarPorCargo(cargo: string) {
    this.cargoFiltro.next(cargo);
  }

  /**
   * @description
   * Ejecuta una petición GET para buscar trabajadores cuyo nombre o fragmento de nombre
   * coincida con el término ingresado.
   * @param nombre - Texto o fragmento del nombre a buscar.
   * @returns Un observable con la respuesta HTTP y el arreglo de trabajadores encontrados.
   */
  buscarTrabajadorPorNombre(nombre: string) {
    return this.cliente.get<TrabajadorModel[]>(
      this.urlbase + '/buscartrabajadorpornombre?nombre=' + nombre,
      { observe: 'response' },
    );
  }

  /**
   * @description
   * Actualiza el estado global de la lista de trabajadores emitiendo el nuevo arreglo
   * hacia el observable `listaTrabajadores$`. Es útil tras realizar búsquedas.
   * @param trabajadores - Arreglo actualizado de modelos de trabajadores.
   * @returns {void}
   */
  actualizarTrabajadores(trabajadores: TrabajadorModel[]) {
    this.listaTrabajadores.next(trabajadores);
  }

  /**
   * @description
   * Envía una petición PUT al backend para modificar la información de
   * contacto y los datos personales de un trabajador existente.
   * @param id - Identificador único del trabajador a modificar.
   * @param nombre - Nuevo nombre a registrar.
   * @param cedula - Nuevo documento de identidad.
   * @param telefono - Nuevo número de teléfono.
   * @param email - Nuevo correo electrónico.
   * @param cargo - Cargo actual del trabajador (recibido por firma de método).
   * @returns Un observable con un texto plano confirmando la actualización de los datos.
   */
  putActualizarTrabajador(
    id: number,
    nombre: String,
    cedula: number,
    telefono: number,
    email: String,
    cargo: String,
  ) {
    return this.cliente.put(
      this.urlbase +
      '/actualizartrabajador?id=' +
      id +
      '&nombre=' +
      nombre +
      '&cedula=' +
      cedula +
      '&telefono=' +
      telefono +
      '&email=' +
      email,
      null,
      { responseType: 'text' },
    );
  }

  /**
   * @description
   * Envía una petición PUT específica para modificar exclusivamente
   * el cargo (rol) de un trabajador sin alterar sus demás datos personales.
   * @param id - Identificador único del trabajador.
   * @param cargo - El nuevo cargo que se le asignará.
   * @returns Un observable con un mensaje de confirmación sobre el cambio de cargo.
   */
  putActualizarCargo(id: number, cargo: String) {
    return this.cliente.put(this.urlbase + '/actualizarcargo?id=' + id + '&cargo=' + cargo, null, {
      responseType: 'text',
    });
  }
}
