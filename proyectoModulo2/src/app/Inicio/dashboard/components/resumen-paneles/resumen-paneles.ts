import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../../../models/trabajor.model';
import {TrabajadorService} from '../../../../services/trabajador.service';
import {Subscription} from 'rxjs';
import {UsuarioModel} from '../../../../models/usuario.model';
import {UsuarioService} from '../../../../services/usuario.service';

@Component({
  selector: 'app-resumen-paneles',
  standalone: false,
  templateUrl: './resumen-paneles.html',
  styleUrls: ['../../dashboard.css']
})
export class ResumenPaneles implements OnInit, OnDestroy {

  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private subTrabajadores: Subscription = new Subscription();
  private porcentaje: number = 0;
  usuarios: UsuarioModel[] = [];
  usuariosService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatosTrabajadores();
    this.cargarDatosUsuarios();
    this.subTrabajadores = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatosTrabajadores();
    });
    this.subUsuarios = this.usuariosService.refrescarTabla$.subscribe(() => {
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

  get totalTrabajadores():number{
    return this.trabajadores.length;
  }

  get totalAdministradores():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Administrador').length;
  }

  get totalConductores():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Conductor').length;
  }

  get totalManipuladoresPaquetes():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Manipulador').length;
  }

  get porcentajeAdmins(): number{
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalAdministradores / this.totalTrabajadores) * 100);
  }

  get porcentajeConductores(): number{
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalConductores / this.totalTrabajadores) * 100);
  }

  get porcentajeManipuladores(): number{
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalManipuladoresPaquetes / this.totalTrabajadores) * 100);
  }

  //--------------------------------------------------------------------------------------------
  //USUARIOS:
  cargarDatosUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = [...body];
        }
      },
      error: () => this.usuarios = []
    });
  }

  get totalUsuarios():number{
    return this.usuarios.length;
  }

  get totalUsuariosAdmins():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === "Admin").length;
  }

  get totalUsuariosNormales():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === "Normal").length;
  }

  get totalUsuariosPremium():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === "Premium").length;
  }

  get totalUsuariosConcurrentes():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === "Concurrente").length;
  }

  get porcentajeUsuariosAdmins(): number{
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosAdmins / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosNormales(): number{
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosNormales / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosPremium(): number{
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosPremium / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosConcurrentes(): number{
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosConcurrentes/ this.totalUsuarios) * 100);
  }

}
