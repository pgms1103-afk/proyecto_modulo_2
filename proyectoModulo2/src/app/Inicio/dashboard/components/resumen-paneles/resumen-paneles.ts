import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../../../models/trabajor.model';
import {TrabajadorService} from '../../../../services/trabajador.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-resumen-paneles',
  standalone: false,
  templateUrl: './resumen-paneles.html',
  styleUrls: ['../../dashboard.css']
})
export class ResumenPaneles implements OnInit, OnDestroy {

  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private sub: Subscription = new Subscription();
  private porcentaje: number = 0;

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

}
