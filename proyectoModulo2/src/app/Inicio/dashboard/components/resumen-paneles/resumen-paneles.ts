import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioModel } from '../../../../models/envio.model';
import { EnvioService } from '../../../../services/envio.service';

@Component({
  selector: 'app-resumen-paneles',
  standalone: false,
  templateUrl: './resumen-paneles.html',
  styleUrls: ['../../dashboard.css'],
})
export class ResumenPaneles implements OnInit, OnDestroy {
  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private subTrabajadores: Subscription = new Subscription();
  private porcentaje: number = 0;
  usuarios: UsuarioModel[] = [];
  usuariosService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();
  envios: EnvioModel[] = [];
  enviosService = inject(EnvioService);
  private subEnvios: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatosTrabajadores();
    this.cargarDatosUsuarios();
    this.cargarDatosEnvios();
    this.subTrabajadores = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatosTrabajadores();
    });
    this.subUsuarios = this.usuariosService.refrescarTabla$.subscribe(() => {
      this.cargarDatosUsuarios();
    });
    this.subEnvios = this.enviosService.refrescarTabla$.subscribe(() => {
      this.cargarDatosEnvios();
    });
  }

  ngOnDestroy() {
    this.subTrabajadores.unsubscribe();
    this.subUsuarios.unsubscribe();
    this.subEnvios.unsubscribe();
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
      error: () => (this.trabajadores = []),
    });
  }

  get totalTrabajadores(): number {
    return this.trabajadores.length;
  }

  get totalAdministradores(): number {
    return this.trabajadores.filter((cadaTrabajador) => cadaTrabajador.cargo === 'Administrador')
      .length;
  }

  get totalConductores(): number {
    return this.trabajadores.filter((cadaTrabajador) => cadaTrabajador.cargo === 'Conductor')
      .length;
  }

  get totalManipuladoresPaquetes(): number {
    return this.trabajadores.filter((cadaTrabajador) => cadaTrabajador.cargo === 'Manipulador')
      .length;
  }

  get porcentajeAdmins(): number {
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalAdministradores / this.totalTrabajadores) * 100);
  }

  get porcentajeConductores(): number {
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalConductores / this.totalTrabajadores) * 100);
  }

  get porcentajeManipuladores(): number {
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
      error: () => (this.usuarios = []),
    });
  }

  get totalUsuarios(): number {
    return this.usuarios.length;
  }

  get totalUsuariosAdmins(): number {
    return this.usuarios.filter((cadaUsuario) => cadaUsuario.tipoUsuario === 'Admin').length;
  }

  get totalUsuariosNormales(): number {
    return this.usuarios.filter((cadaUsuario) => cadaUsuario.tipoUsuario === 'Normal').length;
  }

  get totalUsuariosPremium(): number {
    return this.usuarios.filter((cadaUsuario) => cadaUsuario.tipoUsuario === 'Premium').length;
  }

  get totalUsuariosConcurrentes(): number {
    return this.usuarios.filter((cadaUsuario) => cadaUsuario.tipoUsuario === 'Concurrente').length;
  }

  get porcentajeUsuariosAdmins(): number {
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosAdmins / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosNormales(): number {
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosNormales / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosPremium(): number {
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosPremium / this.totalUsuarios) * 100);
  }

  get porcentajeUsuariosConcurrentes(): number {
    if (this.totalUsuarios === 0) return 0;
    return Math.round((this.totalUsuariosConcurrentes / this.totalUsuarios) * 100);
  }

  //--------------------------------------------------------------------------------------------
  //ENVIOS:

  cargarDatosEnvios() {
    this.enviosService.getEnvios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        }
      },
      error: () => (this.envios = []),
    });
  }

  get totalEnvios(): number {
    return this.envios.length;
  }

  get totalEnviosAlimenticios(): number {
    return this.envios.filter((cadaEnvio) => cadaEnvio.tipoPaquete === 'Alimenticio').length;
  }

  get totalEnviosNoalimenticios(): number {
    return this.envios.filter((cadaEnvio) => cadaEnvio.tipoPaquete === 'No Alimenticio').length;
  }

  get totalEnviosCartas(): number {
    return this.envios.filter((cadaEnvio) => cadaEnvio.tipoPaquete === 'Carta').length;
  }

  get totalEnviosAtiempo(): number {
    return this.envios.filter((cadaEnvio) => cadaEnvio.entregaATiempo === true).length;
  }

  get totalEnviosRestraso(): number {
    return this.envios.filter((cadaEnvio) => cadaEnvio.entregaATiempo === false).length;
  }

  get porsentajeEnviosAlimenticios (): number {
    if(this.totalEnvios === 0) return 0;
    return Math.round((this.totalEnviosAlimenticios / this.totalEnvios) * 100);
  }

  get porsentajeEnviosNoalimenticios (): number {
    if(this.totalEnvios === 0) return 0;
    return Math.round((this.totalEnviosNoalimenticios / this.totalEnvios) * 100);
  }

  get porsentajeEnviosCartas (): number {
    if(this.totalEnvios === 0) return 0;
    return Math.round((this.totalEnviosCartas / this.totalEnvios) * 100);
  }

  get porsentajeEnviosAtiempo (): number {
    if(this.totalEnvios === 0) return 0;
    return Math.round((this.totalEnviosAtiempo / this.totalEnvios) * 100);
  }

  get porsentajeEnviosRetraso ():number {
    if(this.totalEnvios === 0) return 0;
    return 100 - this.porsentajeEnviosAtiempo;
  }
}
