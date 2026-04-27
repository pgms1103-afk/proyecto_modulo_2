import { Component, inject, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioModel } from '../../../../models/envio.model';
import { EnvioService } from '../../../../services/envio.service';

/**
 * @description
 * Componente encargado de procesar y visualizar los paneles detallados de métricas en el Dashboard.
 * Realiza cálculos estadísticos avanzados, como porcentajes de distribución de cargos,
 * tipos de usuarios y estados de envíos, proporcionando una visión analítica del sistema.
 */
@Component({
  selector: 'app-resumen-paneles',
  standalone: false,
  templateUrl: './resumen-paneles.html',
  styleUrls: ['../../dashboard.css'],
})
export class ResumenPaneles implements OnInit, OnDestroy {

  // Gestión de datos de Trabajadores
  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private subTrabajadores: Subscription = new Subscription();

  // Gestión de datos de Usuarios
  usuarios: UsuarioModel[] = [];
  usuariosService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();

  // Gestión de datos de Envíos
  envios: EnvioModel[] = [];
  enviosService = inject(EnvioService);
  private subEnvios: Subscription = new Subscription();

  private cdr = inject(ChangeDetectorRef);

  /**
   * @description
   * Inicializa el componente ejecutando la carga masiva de datos y estableciendo
   * las suscripciones reactivas para actualizar los paneles cuando ocurran cambios
   * en las tablas de trabajadores, usuarios o envíos.
   */
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

  /**
   * @description
   * Libera los recursos de memoria cancelando todas las suscripciones activas
   * antes de destruir el componente.
   */
  ngOnDestroy() {
    this.subTrabajadores.unsubscribe();
    this.subUsuarios.unsubscribe();
    this.subEnvios.unsubscribe();
  }

  // --- MÉTODOS DE CARGA DE DATOS ---

  /**
   * @description Obtiene la lista de trabajadores y dispara la detección de cambios.
   */
  cargarDatosTrabajadores() {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => (this.trabajadores = []),
    });
  }

  /**
   * @description Obtiene la lista de usuarios y dispara la detección de cambios.
   */
  cargarDatosUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => (this.usuarios = []),
    });
  }

  /**
   * @description Obtiene la lista de envíos y dispara la detección de cambios.
   */
  cargarDatosEnvios() {
    this.enviosService.getEnvios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => (this.envios = []),
    });
  }

  // --- GETTERS DE ESTADÍSTICAS: TRABAJADORES ---

  get totalTrabajadores(): number { return this.trabajadores.length; }

  get totalAdministradores(): number {
    return this.trabajadores.filter((t) => t.cargo === 'Administrador').length;
  }

  get totalConductores(): number {
    return this.trabajadores.filter((t) => t.cargo === 'Conductor').length;
  }

  get totalManipuladoresPaquetes(): number {
    return this.trabajadores.filter((t) => t.cargo === 'Manipulador').length;
  }

  /** @description Porcentaje de trabajadores que son Administradores. */
  get porcentajeAdmins(): number {
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalAdministradores / this.totalTrabajadores) * 100);
  }

  /** @description Porcentaje de trabajadores que son Conductores. */
  get porcentajeConductores(): number {
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalConductores / this.totalTrabajadores) * 100);
  }

  /** @description Porcentaje de trabajadores que son Manipuladores. */
  get porcentajeManipuladores(): number {
    if (this.totalTrabajadores === 0) return 0;
    return Math.round((this.totalManipuladoresPaquetes / this.totalTrabajadores) * 100);
  }

  // --- GETTERS DE ESTADÍSTICAS: USUARIOS ---

  get totalUsuarios(): number { return this.usuarios.length; }

  get totalUsuariosAdmins(): number {
    return this.usuarios.filter((u) => u.tipoUsuario === 'Admin').length;
  }

  get totalUsuariosNormales(): number {
    return this.usuarios.filter((u) => u.tipoUsuario === 'Normal').length;
  }

  get totalUsuariosPremium(): number {
    return this.usuarios.filter((u) => u.tipoUsuario === 'Premium').length;
  }

  get totalUsuariosConcurrentes(): number {
    return this.usuarios.filter((u) => u.tipoUsuario === 'Concurrente').length;
  }

  /** @description Porcentaje de distribución para cada tipo de usuario. */
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

  // --- GETTERS DE ESTADÍSTICAS: ENVÍOS ---

  get totalEnvios(): number { return this.envios.length; }

  get totalEnviosAlimenticios(): number {
    return this.envios.filter((e) => e.tipoPaquete === 'Alimenticio').length;
  }

  get totalEnviosNoalimenticios(): number {
    return this.envios.filter((e) => e.tipoPaquete === 'No Alimenticio').length;
  }

  get totalEnviosCartas(): number {
    return this.envios.filter((e) => e.tipoPaquete === 'Carta').length;
  }

  get totalEnviosAtiempo(): number {
    return this.envios.filter((e) => e.entregaATiempo === true).length;
  }

  get totalEnviosRestraso(): number {
    return this.envios.filter((e) => e.entregaATiempo === false).length;
  }

  /** @description Cálculo de porcentajes para la logística de envíos. */
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

  /** @description Calcula el porcentaje de retraso como el complemento de los envíos a tiempo. */
  get porsentajeEnviosRetraso (): number {
    if(this.totalEnvios === 0) return 0;
    return 100 - this.porsentajeEnviosAtiempo;
  }
}
