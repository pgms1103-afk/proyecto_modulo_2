import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvioModel } from '../models/envio.model';
import { Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EnvioService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/envio';

  private estadoFiltro = new Subject<string>();
  estadoFiltro$ = this.estadoFiltro.asObservable();
  private refrescarTabla = new Subject<void>();
  refrescarTabla$ = this.refrescarTabla.asObservable();

  private tipoFiltro = new Subject<string>();
  tipoFiltro$ = this.tipoFiltro.asObservable();

  private listaEnvios = new Subject<EnvioModel[]>();
  listaEnvios$ = this.listaEnvios.asObservable();


  notificarRefresco() {
    this.refrescarTabla.next();
  }

  filtrarPorTipo(tipo: string) {
    this.tipoFiltro.next(tipo);
  }

  actualizarEnvios(envios: EnvioModel[]) {
    this.listaEnvios.next(envios);
  }

  getEnvios() {
    return this.cliente.get<EnvioModel[]>(this.urlbase + '/mostrarpaquetes', {
      observe: 'response'
    });
  }



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

  deleteEnvio(id: number) {
    return this.cliente.delete(
      this.urlbase + '/eliminarpaquete?id=' + id,
      { responseType: 'text' }
    );
  }

  getEnviosPorTipo(tipo: string) {
    return this.cliente.get<EnvioModel[]>(
      this.urlbase + '/buscarpaqueteportipo?tipo=' + tipo,
      { observe: 'response' }
    );
  }

  getEnviosPorEstado(entregaATiempo: boolean) {
    return this.cliente.get<EnvioModel[]>(
      this.urlbase + '/buscaratiempo?estado=' + entregaATiempo,
      { observe: 'response' }
    );
  }

  filtrarPorEstado(texto: string) {
    this.estadoFiltro.next(texto);
  }
}
