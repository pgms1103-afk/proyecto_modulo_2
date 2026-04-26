import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';
import { UsuarioModel } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario.service';
import { EnvioModel } from '../../../../models/envio.model';
import { EnvioService } from '../../../../services/envio.service';

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
  private cdr = inject(ChangeDetectorRef);

  usuarios: UsuarioModel[] = [];
  usuarioService = inject(UsuarioService);
  private subUsuarios: Subscription = new Subscription();

  envios: EnvioModel[] = [];
  envioService = inject(EnvioService);
  private subEnvios: Subscription = new Subscription();

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
        this.cdr.detectChanges();
      },
      error: () => this.trabajadores = []
    });
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
        this.cdr.detectChanges();
      },
      error: () => this.usuarios = []
    });
  }

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

  get totalTrabajadores(): number {
    return this.trabajadores.length;
  }

  get totalUsuarios(): number {
    return this.usuarios.length;
  }

  get totalAdmins(): number {
    return this.usuarios.filter(u => u.tipoUsuario === 'Admin').length;
  }

  get totalEnvios(): number {
    return this.envios.length;
  }

  get totalEnviosATiempo(): number {
    return this.envios.filter(e => e.entregaATiempo === true).length;
  }

  get totalEnviosConRetraso(): number {
    return this.envios.filter(e => e.entregaATiempo === false).length;
  }
}
