import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajadorModel } from '../models/trabajor.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/trabajador';
  private refrescarTabla = new Subject<void>();
  refrescarTabla$ = this.refrescarTabla.asObservable();

  getTrabajadores(){
    return this.cliente.get<TrabajadorModel[]>(this.urlbase + '/mostrartrabajadores',{
      observe: 'response',
    });
  }
  notificarRefresco() {
    this.refrescarTabla.next();
  }

  postCrearTrabajadores(nombre: String, cedula: number, telefono: number, email: String, cargo: String) {
    return this.cliente.post(
      this.urlbase + "/creartrabajador?nombre=" + nombre + "&cedula=" + cedula + "&telefono=" + telefono + "&email=" + email + "&cargo=" + cargo, null,
   {responseType: 'text' },
    );
  }


}
