import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvioModel } from '../models/envio.model';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

/**
 * @description
 * Servicio principal para la gestión de envíos y paquetes.
 * Actúa como intermediario para realizar las peticiones HTTP hacia la
 * API de Spring Boot y maneja el estado global de la aplicación a través
 * de observables (RxJS), permitiendo la comunicación reactiva entre componentes.
 */
@Injectable({
  providedIn: 'root',
})
export class EnvioService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/envio';

  /**
   * @description
   * Subject de RxJS utilizado para emitir y escuchar cambios en el filtro
   * de estado de entrega (ej. 'A tiempo' vs 'Retrasado').
   */
  private estadoFiltro = new Subject<string>();
  estadoFiltro$ = this.estadoFiltro.asObservable();

  /**
   * @description
   * Subject de RxJS que funciona como un disparador (trigger) global para
   * indicar a los componentes que deben volver a recargar sus datos.
   */
  private refrescarTabla = new Subject<void>();
  refrescarTabla$ = this.refrescarTabla.asObservable();

  /**
   * @description
   * Subject de RxJS para gestionar el filtro por tipo de paquete (ej. 'Carta').
   */
  private tipoFiltro = new Subject<string>();
  tipoFiltro$ = this.tipoFiltro.asObservable();

  /**
   * @description
   * Subject de RxJS que emite una lista de envíos modificada o filtrada
   * para actualizar directamente la vista de la tabla.
   */
  private listaEnvios = new Subject<EnvioModel[]>();
  listaEnvios$ = this.listaEnvios.asObservable();

  /**
   * @description
   * Emite un evento vacío para notificar a los componentes suscritos
   * (como la tabla principal) que deben volver a consultar los datos del servidor.
   * @returns {void}
   */
  notificarRefresco() {
    this.refrescarTabla.next();
  }

  /**
   * @description
   * Emite el tipo de paquete seleccionado para que los componentes
   * correspondientes apliquen el filtro visual.
   * @param tipo - El tipo de paquete a filtrar.
   * @returns {void}
   */
  filtrarPorTipo(tipo: string) {
    this.tipoFiltro.next(tipo);
  }

  /**
   * @description
   * Emite un nuevo arreglo de envíos hacia el observable `listaEnvios$`.
   * Generalmente utilizado después de obtener los resultados de una búsqueda específica.
   * @param envios - Arreglo con los modelos de envío actualizados.
   * @returns {void}
   */
  actualizarEnvios(envios: EnvioModel[]) {
    this.listaEnvios.next(envios);
  }

  /**
   * @description
   * Realiza una petición GET al backend para obtener todos los paquetes registrados.
   * @returns Un observable que contiene la respuesta HTTP con el arreglo de `EnvioModel`.
   */
  getEnvios() {
    return this.cliente.get<EnvioModel[]>(this.urlbase + '/mostrarpaquetes', {
      observe: 'response'
    });
  }

  /**
   * @description
   * Envía una petición POST al backend mediante Query Params para registrar
   * un nuevo paquete en el sistema.
   * @param tipoPaquete - Categoría del envío.
   * @param descripcion - Detalles breves del contenido.
   * @param peso - Peso total del paquete (kg).
   * @param destino - Dirección física a la que llegará.
   * @param fechaEnvio - Fecha y hora en la que el paquete inicia su viaje.
   * @param fechaEntrega - Fecha y hora límite o estimada de llegada.
   * @returns Un observable con un mensaje de texto confirmando la creación.
   */
  postCrearEnvio(
    tipoPaquete: string,
    descripcion: string,
    peso: number,
    destino: string,
    fechaEnvio: string,
    fechaEntrega: string
  ) {
    const params = new HttpParams()
      .set('tipoPaquete', tipoPaquete)
      .set('descripcion', descripcion)
      .set('peso', peso.toString())
      .set('destino', destino)
      .set('fechaEnvio', fechaEnvio)
      .set('fechaEntrega', fechaEntrega);

    return this.cliente.post(
      this.urlbase + '/crearpaquete',
      null,
      { params, responseType: 'text' }
    );
  }

  /**
   * @description
   * Envía una petición PUT al backend para modificar los datos de un paquete existente.
   * @param id - Identificador único del envío a actualizar.
   * @param tipoPaquete - Nueva categoría del envío.
   * @param descripcion - Nueva descripción del contenido.
   * @param peso - Nuevo peso (kg).
   * @param destino - Nueva dirección.
   * @param fechaEnvio - Nueva fecha de salida.
   * @param fechaEntrega - Nueva fecha de entrega.
   * @returns Un observable con un mensaje de texto confirmando la actualización.
   */
  putActualizarEnvio(
    id: number,
    tipoPaquete: string,
    descripcion: string,
    peso: number,
    destino: string,
    fechaEnvio: string,
    fechaEntrega: string
  ) {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('tipoPaquete', tipoPaquete)
      .set('descripcion', descripcion)
      .set('peso', peso.toString())
      .set('destino', destino)
      .set('fechaEnvio', fechaEnvio)
      .set('fechaEntrega', fechaEntrega);

    return this.cliente.put(
      this.urlbase + '/actualizarpaquete',
      null,
      { params, responseType: 'text' }
    );
  }

  /**
   * @description
   * Ejecuta una petición DELETE para remover permanentemente un paquete del sistema.
   * @param id - Identificador único del paquete a eliminar.
   * @returns Un observable con un texto de confirmación tras el borrado.
   */
  deleteEnvio(id: number) {
    return this.cliente.delete(
      this.urlbase + '/eliminarpaquete?id=' + id,
      { responseType: 'text' }
    );
  }

  /**
   * @description
   * Ejecuta una petición GET para buscar paquetes según su categoría/tipo.
   * @param tipo - El tipo de paquete a buscar en la base de datos.
   * @returns Un observable con la respuesta HTTP y el arreglo de paquetes filtrados.
   */
  getEnviosPorTipo(tipo: string) {
    return this.cliente.get<EnvioModel[]>(
      this.urlbase + '/buscarpaqueteportipo?tipo=' + tipo,
      { observe: 'response' }
    );
  }

  /**
   * @description
   * Ejecuta una petición GET para buscar paquetes dependiendo de si fueron
   * entregados a tiempo o no.
   * @param entregaATiempo - Valor booleano (`true` para exitoso, `false` para retrasado).
   * @returns Un observable con la respuesta HTTP y el arreglo de paquetes filtrados.
   */
  getEnviosPorEstado(entregaATiempo: boolean) {
    return this.cliente.get<EnvioModel[]>(
      this.urlbase + '/buscaratiempo?estado=' + entregaATiempo,
      { observe: 'response' }
    );
  }

  /**
   * @description
   * Emite una notificación al estado global para aplicar un filtro local
   * sobre los envíos según su texto de estado.
   * @param texto - Texto del estado a filtrar.
   * @returns {void}
   */
  filtrarPorEstado(texto: string) {
    this.estadoFiltro.next(texto);
  }
}
