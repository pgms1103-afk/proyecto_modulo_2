import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { tap } from 'rxjs';

/**
 * @description
 * Servicio encargado de gestionar la sesión y autenticación en la aplicación.
 * Controla los procesos de inicio de sesión, registro de nuevas cuentas,
 * cierre de sesión y la persistencia de los datos del usuario en el LocalStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class SesionService {
  private cliente: HttpClient = inject(HttpClient);
  private readonly urlbase: string = 'http://localhost:8080/usuario';
  private router: Router = inject(Router);

  /**
   * @description
   * Autentica a un usuario en el sistema verificando sus credenciales contra el backend.
   * Si es exitoso, utiliza el operador `tap` de RxJS para interceptar la respuesta,
   * guardar la información del usuario en el `localStorage` de manera segura,
   * y ejecutar la redirección correspondiente a su rol.
   * @param correo - Correo electrónico registrado del usuario.
   * @param contrasena - Contraseña de la cuenta.
   * @returns Un observable que contiene el modelo del usuario (`UsuarioModel`) tras un login exitoso.
   */
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

  /**
   * @description
   * Registra un nuevo usuario en la base de datos enviando sus datos personales y credenciales.
   * @param cedula - Número de identificación único del usuario.
   * @param nombre - Nombre(s) del cliente.
   * @param apellido - Apellido(s) del cliente.
   * @param correo - Correo electrónico a registrar.
   * @param contrasena - Contraseña elegida para la cuenta.
   * @param tipo - Tipo o rango asignado al usuario (generalmente 'Normal' por defecto).
   * @returns Un observable con un texto plano confirmando la creación de la cuenta.
   */
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

  /**
   * @description
   * Finaliza la sesión actual del usuario. Elimina sus credenciales y datos
   * almacenados en el `localStorage`, protegiendo su cuenta, y lo redirige
   * inmediatamente a la página pública de inicio.
   * @returns {void}
   */
  cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    this.router.navigate(['/']);
  }

  /**
   * @description
   * Método privado de enrutamiento que evalúa el rol del usuario que acaba
   * de iniciar sesión y lo dirige a la vista que le corresponde.
   * @param tipo - Rol del usuario ('Admin' para administradores, cualquier otro valor para clientes).
   * @returns {void}
   */
  private redireccion(tipo: string) {
    if (tipo === 'Admin') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }
}
