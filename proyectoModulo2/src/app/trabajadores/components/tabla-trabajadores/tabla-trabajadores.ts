import {Component, inject, OnInit} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {TrabajadorModel} from '../../../models/trabajor.model';

@Component({
  selector: 'app-tabla-trabajadores',
  standalone: false,
  templateUrl: './tabla-trabajadores.html',
  styleUrl: './tabla-trabajadores.css',
})
export class TablaTrabajadores implements OnInit{

  trabajadorService = inject(TrabajadorService);
  toastr = inject(ToastrService);
  trabajadores: TrabajadorModel[] = [];
  statuscode: number = 0;
  private sub: any;

  ngOnInit(): void {
    this.loadOperaciones();
    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadOperaciones(): void {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (response) => {
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = body;
        } else {
          console.warn('Estructura del response no reconocida:', body);
          this.trabajadores = [];
        }
        console.log('Operaciones asignado:', this.trabajadores);
        this.trabajadores = [...this.trabajadores];
      },
      error: (error) => {
        console.error('Error fetching operaciones:', error);
        this.statuscode = error.status;
        this.trabajadores = [];
        this.toastr.error('Error al cargar las operaciones', 'Error');
      },
    });
  }
}
