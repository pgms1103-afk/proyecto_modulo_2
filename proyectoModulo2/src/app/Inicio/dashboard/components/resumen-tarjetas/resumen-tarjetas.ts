import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TrabajadorModel } from '../../../../models/trabajor.model';
import { TrabajadorService } from '../../../../services/trabajador.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumen-tarjetas',
  standalone: false,
  templateUrl: './resumen-tarjetas.html',
  styleUrls: ['../../dashboard.css']
})
export class ResumenTarjetas implements OnInit, OnDestroy {

  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.cargarDatos();
    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cargarDatos() {
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
}
