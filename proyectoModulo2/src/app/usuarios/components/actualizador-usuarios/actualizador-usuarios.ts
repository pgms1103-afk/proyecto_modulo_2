import {Component, Input, Output, EventEmitter, inject, OnChanges} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {UsuarioService} from '../../../services/usuario.service';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {UsuarioModel} from '../../../models/usuario.model';

@Component({
  selector: 'app-actualizador-usuarios',
  standalone: false,
  templateUrl: './actualizador-usuarios.html',
  styleUrl: './actualizador-usuarios.css',
})
export class ActualizadorUsuarios implements OnChanges{

  usuarioService = inject(UsuarioService);
  id: number = 0;
  cedula: number = 0;
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  tipoUsuario: string = '';


  @Input() esVisible: boolean = false;
  @Input() usuario: UsuarioModel | null = null;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnChanges() {
    if (this.usuario) {
      this.cedula = this.usuario.cedula;
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.correo = this.usuario.correo;
      this.contrasena = this.usuario.contrasena;
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
      next: (res) => console.log('Actualizado:', res),
      error: (e) => console.error('Mensaje backend:', e.error)
    });
  }

  actualizarTipoUsuario(){
    this.usuarioService.putActualizarTipo(
      this.usuario!.id,
      this.tipoUsuario
    ).subscribe();
  }

  cerrar() {
    this.alCerrar.emit();
  }

}
