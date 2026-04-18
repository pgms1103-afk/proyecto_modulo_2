import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../models/trabajor.model';
import {TrabajadorService} from '../../services/trabajador.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  trabajadores: TrabajadorModel[] = [];
  trabajadorService = inject(TrabajadorService);
  private sub: Subscription = new Subscription();

  // Así debe quedar
  ngOnInit() {
    setTimeout(() => {
      this.cargarDatos();
    }, 100);

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
          this.trabajadores = body;
        }
      },
      error: () => this.trabajadores = []
    });
  }

  get totalTrabajadores():number{
    return this.trabajadores.length;
  }
  }
