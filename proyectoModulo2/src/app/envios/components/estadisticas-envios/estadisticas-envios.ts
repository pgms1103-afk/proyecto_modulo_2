import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { EnvioModel } from '../../../models/envio.model';
import { EnvioService } from '../../../services/envio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadisticas-envios',
  standalone: false,
  templateUrl: './estadisticas-envios.html',
  styleUrl: './estadisticas-envios.css',
})
export class EstadisticasEnvios implements OnInit, OnDestroy {

  envios: EnvioModel[] = [];
  envioService = inject(EnvioService);
  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatos();

    this.sub = this.envioService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cargarDatos() {
    this.envioService.getEnvios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        }
      },
      error: () => this.envios = []
    });
  }

  get totalEnvios(): number {
    return this.envios.length;
  }

  get totalAlimenticios(): number {
    return this.envios.filter(e => e.tipoPaquete === 'Alimenticio').length;
  }

  get totalNoAlimenticios(): number {
    return this.envios.filter(e => e.tipoPaquete === 'No Alimenticio').length;
  }

  get totalCartas(): number {
    return this.envios.filter(e => e.tipoPaquete === 'Carta').length;
  }

  get totalATiempo(): number {
    return this.envios.filter(e => e.entregaATiempo === true).length;
  }

  get totalConRetraso(): number {
    return this.envios.filter(e => e.entregaATiempo === false).length;
  }
}
