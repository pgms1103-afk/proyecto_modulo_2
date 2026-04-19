import {Component, inject, OnInit} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {Subscription} from 'rxjs';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-trabajadores',
  standalone: false,
  templateUrl: './tabla-trabajadores.html',
  styleUrl: './tabla-trabajadores.css',
})
export class TablaTrabajadores implements OnInit {
  cargoSeleccionado: string = '';
  private subFiltro: Subscription = new Subscription();
  trabajadorService = inject(TrabajadorService);
  toastr = inject(ToastrService);
  trabajadores: TrabajadorModel[] = [];
  statuscode: number = 0;
  private sub: any;
  public id: number = 0;
  private subLista: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadOperaciones();

    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });

    this.subFiltro = this.trabajadorService.cargoFiltro$.subscribe(cargo => {
      console.log('cargo recibido:', cargo); // ← agrega esto
      this.cargoSeleccionado = cargo;
    });

    this.subLista = this.trabajadorService.listaTrabajadores$.subscribe(lista => {
      this.trabajadores = lista;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subFiltro.unsubscribe();
    this.subLista.unsubscribe();
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

  deleteTrabajador(id:number) {
    this.trabajadorService.deleteTrabajadores(id).subscribe({});
  }

  get trabajadoresFiltrados(): TrabajadorModel[] {
    console.log('filtrando por:', this.cargoSeleccionado); // ← agrega esto
    if (!this.cargoSeleccionado || this.cargoSeleccionado === 'todos') {
      return this.trabajadores;
    }
    return this.trabajadores.filter(t => t.cargo === this.cargoSeleccionado);
  }

export class TablaTrabajadores {

  @Output() clicEditar = new EventEmitter<void>();

  notificarEditar() {
    this.clicEditar.emit();
  }
}
