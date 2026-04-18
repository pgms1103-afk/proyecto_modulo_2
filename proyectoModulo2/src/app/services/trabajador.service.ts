import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajorModel } from '../models/trabajor.model';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/trabajador';

  getTrabajadores(){
    return this.cliente.get<{data: TrabajorModel[]}>(this.urlbase + "/mostrartrabajadores");
  }

  postCrearTrabajadores(nombre: String, cedula: number, telefono: number, email: String, cargo: String) {
    return this.cliente.post(
      this.urlbase + "/creartrabajador?nombre=" + nombre + "&cedula=" + cedula + "&telefono=" + telefono + "&email=" + email + "&cargo=" + cargo, null,
   {responseType: 'text' },
    );
  }


}
