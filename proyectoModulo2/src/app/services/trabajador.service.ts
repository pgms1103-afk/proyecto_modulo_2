import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajadorModel } from '../models/trabajor.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {
  private cargoFiltro = new Subject<string>();
  cargoFiltro$ = this.cargoFiltro.asObservable();
  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/trabajador';
  private refrescarTabla = new Subject<void>();
  refrescarTabla$ = this.refrescarTabla.asObservable();
  private listaTrabajadores = new Subject<TrabajadorModel[]>();
  listaTrabajadores$ = this.listaTrabajadores.asObservable();

  getTrabajadores() {
    return this.cliente.get<TrabajadorModel[]>(this.urlbase + '/mostrartrabajadores', {
      observe: 'response',
    });
  }
  notificarRefresco() {
    this.refrescarTabla.next();
  }

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

  deleteTrabajadores(id: number) {
    return this.cliente.delete(this.urlbase + '/eliminartrabajador?id=' + id, {
      responseType: 'text',
    });
  }

  filtrarPorCargo(cargo: string) {
    this.cargoFiltro.next(cargo);
  }

  buscarTrabajadorPorNombre(nombre: string) {
    return this.cliente.get<TrabajadorModel[]>(
      this.urlbase + '/buscartrabajadorpornombre?nombre=' + nombre,
      { observe: 'response' },
    );
  }

  actualizarTrabajadores(trabajadores: TrabajadorModel[]) {
    //Para buscar por nombres
    this.listaTrabajadores.next(trabajadores);
  }

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
  putActualizarCargo(id: number, cargo: String) {
    return this.cliente.put(this.urlbase + '/actualizarcargo?id=' + id + '&cargo=' + cargo, null, {
      responseType: 'text',
    });
  }
}
