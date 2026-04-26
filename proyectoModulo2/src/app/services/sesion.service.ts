import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/usuario';
  private router: Router = inject(Router);


  login(correo: string, contrasena: string) {
    return this.cliente.post<UsuarioModel>(
      this.urlbase + "/login?correo=" + correo + "&contrasena=" + contrasena,
      null
    ).pipe(
      tap(usuario => {

        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        this.redireccion(usuario.tipoUsuario);
      })
    );
  }

  registro(cedula: number, nombre: string, apellido: string, correo: string, contrasena: string, tipo: string) {
    return this.cliente.post(
      this.urlbase + "/crearUsuario?cedula=" + cedula +
      "&nombre=" + nombre +
      "&apellido=" + apellido +
      "&correo=" + correo +
      "&contrasena=" + contrasena +
      "&tipoUsuario=" + tipo,
      null,
      { responseType: 'text' }
    );
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/']);
  }

  private redireccion(tipo: string) {
    if (tipo === 'Admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }
}
