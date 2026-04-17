import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrabajorModel } from '../models/trabajor.model';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/trabajador";

  getTrabajadores(){
    return this.cliente.get<{data: TrabajorModel[]}>(this.url + "/mostrartrabajadores");
  }

}
