import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioModel } from '../../../../models/envio.model';
import { EnvioService } from '../../../../services/envio.service';

/**
 * @description
 * Componente encargado de mostrar el resumen ejecutivo del Dashboard mediante tarjetas informativas.
 * Centraliza y visualiza los indicadores clave de rendimiento (KPIs) combinando datos de
 * trabajadores, usuarios y envíos, manteniendo la información sincronizada en tiempo real.
 */
@Component({
  selector: 'app-resumen-tarjetas',
  standalone: false,
  templateUrl: './resumen-tarjetas.html',
  styleUrls: ['../../dashboard.css']
})
export class ResumenTarjetas implements OnInit, OnDestroy {

  // Propiedades para Gestión de Trabajadores
  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private subTrabajadores: Subscription = new Subscription();
  private cdr = inject(ChangeDetectorRef);

  // Propiedades para Gestión de Usuarios
  usuarios: UsuarioModel[] = [];
  usuarioService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();

  // Propiedades para Gestión de Envíos
  envios: EnvioModel[] = [];
  envioService = inject(EnvioService);
  private subEnvios: Subscription = new Subscription();

  /**
   * @description
   * Inicializa el componente cargando todos los datos necesarios y estableciendo
   * suscripciones a los flujos de "refresco" de cada servicio para actualizar
   * las tarjetas automáticamente ante cualquier cambio.
   * @returns {void}
   */
  ngOnInit() {
    this.cargarDatosTrabajadores();
    this.cargarDatosUsuarios();
    this.cargarDatosEnvios();

    this.subTrabajadores = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatosTrabajadores();
    });
    this.subUsuarios = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.cargarDatosUsuarios();
    });
    this.subEnvios = this.envioService.refrescarTabla$.subscribe(() => {
      this.cargarDatosEnvios();
    });
  }

  /**
   * @description
   * Cancela todas las suscripciones activas (Trabajadores, Usuarios, Envíos)
   * al destruir el componente para liberar recursos.
   * @returns {void}
   */
  ngOnDestroy() {
    this.subTrabajadores.unsubscribe();
    this.subUsuarios.unsubscribe();
    this.subEnvios.unsubscribe();
  }

  /**
   * @description
   * Consulta el servicio de trabajadores para obtener el listado actual y
   * actualizar los contadores del dashboard.
   * @returns {void}
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
      error: () => this.trabajadores = []
    });
  }

  /**
   * @description
   * Consulta el servicio de usuarios para obtener el listado y filtrar
   * estadísticas de cuentas y administradores.
   * @returns {void}
   */
  cargarDatosUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => this.usuarios = []
    });
  }

  /**
   * @description
   * Consulta el servicio de envíos para obtener el estado de la logística
   * y los paquetes.
   * @returns {void}
   */
  cargarDatosEnvios() {
    this.envioService.getEnvios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => this.envios = []
    });
  }

  /**
   * @description Retorna la cantidad total de trabajadores registrados.
   */
  get totalTrabajadores(): number {
    return this.trabajadores.length;
  }

  /**
   * @description Retorna la cantidad total de usuarios (clientes) registrados.
   */
  get totalUsuarios(): number {
    return this.usuarios.length;
  }

  /**
   * @description Retorna la cantidad de usuarios con privilegios de administrador.
   */
  get totalAdmins(): number {
    return this.usuarios.filter(u => u.tipoUsuario === 'Admin').length;
  }

  /**
   * @description Retorna el volumen total de envíos procesados por el sistema.
   */
  get totalEnvios(): number {
    return this.envios.length;
  }

  /**
   * @description Retorna el total de envíos cuya entrega fue exitosa dentro del plazo.
   */
  get totalEnviosATiempo(): number {
    return this.envios.filter(e => e.entregaATiempo === true).length;
  }

  /**
   * @description Retorna el total de envíos que presentan retrasos en la entrega.
   */
  get totalEnviosConRetraso(): number {
    return this.envios.filter(e => e.entregaATiempo === false).length;
  }
}
