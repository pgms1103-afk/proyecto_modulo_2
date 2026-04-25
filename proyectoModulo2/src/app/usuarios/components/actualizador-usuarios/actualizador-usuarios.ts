import {Component, Input, Output, EventEmitter, inject, OnChanges} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {UsuarioService} from '../../../services/usuario.service';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {UsuarioModel} from '../../../models/usuario.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-actualizador-usuarios',
  standalone: false,
  templateUrl: './actualizador-usuarios.html',
  styleUrl: './actualizador-usuarios.css',
})
export class ActualizadorUsuarios implements OnChanges{

  public usuarioService = inject(UsuarioService);
  public toastr: ToastrService = inject(ToastrService);
  public id: number = 0;
  public cedula: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public correo: string = '';
  public contrasena: string = '';
  public tipoUsuario: string = '';


  @Input() esVisible: boolean = false;
  @Input() usuario: UsuarioModel | null = null;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnChanges() {
    if (this.usuario) {
      this.cedula = this.usuario.cedula;
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.correo = this.usuario.correo;
      this.contrasena = '';
    }
  }

  actualizarUsuario() {
    this.usuarioService.putActualizarUsuario(
      this.usuario!.id,
      this.cedula,
      this.nombre,
      this.apellido,
      this.correo,
      this.contrasena
    ).subscribe({
      next: (res) => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.usuarioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar usuario');
      }
    });
  }

  actualizarTipoUsuario(){
    this.usuarioService.putActualizarTipo(
      this.usuario!.id,
      this.tipoUsuario
    ).subscribe({
      next: (res) => {
        this.toastr.success('Tipo de usuario actualizado correctamente', 'Éxito');
        this.usuarioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar tipo de usuario');
      }
    });
  }

  cerrar() {
    this.alCerrar.emit();
  }

}
