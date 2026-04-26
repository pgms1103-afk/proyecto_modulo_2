import { Component, inject } from '@angular/core';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio-sesion',
  standalone: false,
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

  private sesionService = inject(SesionService);
  private toastr = inject(ToastrService);

  modo: 'login' | 'signup' = 'login';

  loginForm = { correo: '', pass: '' };

  regForm = {
    cedula: 0,
    nombre: '',
    apellido: '',
    correo: '',
    pass: '',
    tipo: 'Normal'
  };

  ejecutarLogin() {
    this.sesionService.login(this.loginForm.correo, this.loginForm.pass).subscribe({
      next: (user) => {
        this.toastr.success('Bienvenido, ' + user.nombre, 'Éxito');
      },
      error: (e) => {
        // Manejo de errores siguiendo tu patrón actual
        this.toastr.error(e.error || 'Credenciales inválidas', 'Error');
      }
    });
  }

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
        this.toastr.success(res, 'Registro exitoso');
        this.modo = 'login';
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error en el registro');
      }
    });
  }
}
