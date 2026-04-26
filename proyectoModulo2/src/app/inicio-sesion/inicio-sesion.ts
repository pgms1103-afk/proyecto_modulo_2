import { Component, inject, ChangeDetectorRef  } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

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

  cambiarModo(modo: 'login' | 'signup') {
    setTimeout(() => this.modo = modo, 0);
  }
}
