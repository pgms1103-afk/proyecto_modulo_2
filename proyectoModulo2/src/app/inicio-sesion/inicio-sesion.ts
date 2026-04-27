import { Component, inject, ChangeDetectorRef  } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';

/**
 * @description
 * Componente encargado de la gestión de acceso al sistema.
 * Proporciona una interfaz dual que permite a los usuarios autenticarse (Login)
 * o registrarse (Sign up) como nuevos clientes, comunicándose directamente
 * con el servicio de sesión para validar credenciales o crear cuentas.
 */
@Component({
  selector: 'app-inicio-sesion',
  standalone: false,
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

  private sesionService = inject(SesionService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  /**
   * @description
   * Determina la vista activa en la interfaz.
   * 'login' muestra el acceso y 'signup' el formulario de registro.
   */
  modo: 'login' | 'signup' = 'login';

  /**
   * @description Objeto que enlaza los campos de entrada para el inicio de sesión.
   */
  loginForm = { correo: '', pass: '' };

  /**
   * @description Objeto que centraliza los datos capturados para el registro de un nuevo usuario.
   */
  regForm = {
    cedula: 0,
    nombre: '',
    apellido: '',
    correo: '',
    pass: '',
    tipo: 'Normal'
  };

  /**
   * @description
   * Envía las credenciales de acceso al servicio de sesión. Si la respuesta es exitosa,
   * muestra un mensaje de bienvenida y el servicio se encarga de la redirección.
   * En caso de error, notifica al usuario sobre el fallo en la autenticación.
   * @returns {void}
   */
  ejecutarLogin() {
    this.sesionService.login(this.loginForm.correo, this.loginForm.pass).subscribe({
      next: (user) => {
        this.toastr.success('Bienvenido, ' + user.nombre, 'Éxito');
      },
      error: (e) => {
        this.toastr.error(e.error || 'Credenciales inválidas', 'Error');
      }
    });
  }

  /**
   * @description
   * Procesa la creación de una nueva cuenta enviando los datos del formulario al backend.
   * Tras un registro exitoso, cambia automáticamente el modo a 'login', fuerza la
   * detección de cambios para actualizar la vista y notifica el éxito mediante Toastr.
   * @returns {void}
   */
  ejecutarRegistro() {
    this.sesionService.registro(
      this.regForm.cedula,
      this.regForm.nombre,
      this.regForm.apellido,
      this.regForm.correo,
      this.regForm.pass,
      this.regForm.tipo
    ).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.modo = 'login';
          this.cdr.detectChanges();
          this.toastr.success(res, 'Registro exitoso');
        }, 0);
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error en el registro');
      }
    });
  }

  /**
   * @description
   * Alterna la visibilidad entre el formulario de ingreso y el de registro de manera asíncrona
   * para asegurar que la transición de estados en la interfaz sea fluida.
   * @param modo - El estado de la vista al que se desea cambiar ('login' o 'signup').
   * @returns {void}
   */
  cambiarModo(modo: 'login' | 'signup') {
    setTimeout(() => this.modo = modo, 0);
  }
}
