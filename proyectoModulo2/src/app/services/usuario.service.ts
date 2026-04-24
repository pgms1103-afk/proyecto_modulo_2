import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Subject } from 'rxjs';
import {UsuariosModule} from '../usuarios/usuarios.module';
import {Usuarios} from '../usuarios/usuarios';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {

  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: String = 'http://localhost:8080/usuario';
  private refrescarTabla = new Subject<void>();
  public listaUsuarios = new Subject<UsuarioModel[]>();
  listaUsuarios$ = this.listaUsuarios.asObservable();
  private tipoFiltro = new Subject<string>();
  tipoFiltro$ = this.tipoFiltro.asObservable();

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

  refrescarTabla$ = this.refrescarTabla.asObservable();
  notificarRefresco() {
    this.refrescarTabla.next();
  }

  getUsuarios(){
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/mostrarUsuarios',{
      observe: 'response',
    });
  }

  deleteUsuarios(id: number) {
    return this.cliente.delete(
      this.urlbase + "/eliminarUsuario?id=" + id,
      {responseType: 'text'}
    );
  }

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

  putActualizarTipo(id:number, tipoUsuario:String) {
    return this.cliente.put(
      this.urlbase + "/actualizartipo?id=" + id+ "&tipoUsuario=" + tipoUsuario, null,
      { responseType: 'text' }
    );
  }

  getBuscarPorNombre(nombre: string) {
    return this.cliente.get<UsuarioModel[]>(this.urlbase + '/buscarpornombre?nombre=' + nombre,
      {observe: 'response'});
  }

  actualizarUsuarios(usuarios: UsuarioModel[]) {
    this.listaUsuarios.next(usuarios);
  }

  filtrarPorTipo(tipo: string) {
    this.tipoFiltro.next(tipo);
  }

}
