import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';
import {UsuarioModel} from '../../../../models/usuario.model';
import {UsuarioService} from '../../../../services/usuario.service';

@Component({
  selector: 'app-resumen-tarjetas',
  standalone: false,
  templateUrl: './resumen-tarjetas.html',
  styleUrls: ['../../dashboard.css']
})
export class ResumenTarjetas implements OnInit, OnDestroy {

  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private subTrabajadores: Subscription = new Subscription();
  usuarios: UsuarioModel[] = [];
  usuarioService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatosTrabajadores();
    this.cargarDatosUsuarios();
    this.subTrabajadores = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatosTrabajadores();
    });
    this.subUsuarios = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.cargarDatosUsuarios();
    })
  }

  ngOnDestroy() {
    this.subTrabajadores.unsubscribe();
    this.subUsuarios.unsubscribe();
  }

  cargarDatosTrabajadores() {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = [...body];
        }
      },
      error: () => this.trabajadores = []
    });
  }

  get totalTrabajadores(): number {
    return this.trabajadores.length;
  }

  cargarDatosUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = [...body];
        }
      },
      error: () => this.trabajadores = []
    });
  }

  get totalUsuarios():number {
    return this.usuarios.length;
  }

  get totalAdmins():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Admin').length;
  }
}
