import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';
import {Subscription} from 'rxjs';
import {UsuarioModel} from '../../../models/usuario.model';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-estadisticas-usuarios',
  standalone: false,
  templateUrl: './estadisticas-usuarios.html',
  styleUrl: './estadisticas-usuarios.css',
})
export class EstadisticasUsuarios implements OnInit, OnDestroy {

  usuarios: UsuarioModel[] = [];
  usuarioService = inject(UsuarioService);
  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatos();

    // Se actualiza cuando la tabla se refresca
    this.sub = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cargarDatos() {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = body;
        }
      },
      error: () => this.usuarios = []
    });
  }

  get totalUsuarios():number{
    return this.usuarios.length;
  }

  get totalAdmins():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Admin').length;
  }

  get totalUsuariosNormal():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Normal').length;
  }

  get totalUsuariosPremium():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Premium').length;
  }

  get totalUsuariosConcurrentes():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Concurrente').length;
  }

}
