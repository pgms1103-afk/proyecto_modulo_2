import {Component, inject, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tabla-trabajadores',
  standalone: false,
  templateUrl: './tabla-trabajadores.html',
  styleUrl: './tabla-trabajadores.css',
})
export class TablaTrabajadores implements OnInit, OnDestroy {
  cargoSeleccionado: string = '';
  trabajadorService = inject(TrabajadorService);
  toastr = inject(ToastrService);
  trabajadores: TrabajadorModel[] = [];
  statuscode: number = 0;
  trabajadorSeleccionado: TrabajadorModel | null = null;
  modalEditarVisible: boolean = false;
  private sub: Subscription = new Subscription();
  private subFiltro: Subscription = new Subscription();
  private subLista: Subscription = new Subscription();


  @Output() clicEditar = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadOperaciones();

    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });

    this.subFiltro = this.trabajadorService.cargoFiltro$.subscribe(cargo => {
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
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = [...body];
        } else {
          this.trabajadores = [];
        }
      },
      error: (error) => {
        this.statuscode = error.status;
        this.trabajadores = [];
        this.toastr.error('Error al cargar las operaciones', 'Error');
      },
    });
  }

  deleteTrabajador(id: number) {
    this.trabajadorService.deleteTrabajadores(id).subscribe({
      next: () => {
        this.toastr.success('Trabajador eliminado');
        this.loadOperaciones();
      },
      error: (e) => this.toastr.error(e.error)
    });
  }

  get trabajadoresFiltrados(): TrabajadorModel[] {
    if (!this.cargoSeleccionado || this.cargoSeleccionado === 'todos') {
      return this.trabajadores;
    }
    return this.trabajadores.filter(t => t.cargo === this.cargoSeleccionado);
  }

  notificarEditar() {
    this.clicEditar.emit();
  }


  abrirEditar(trabajador: TrabajadorModel) {
    this.trabajadorSeleccionado = {...trabajador};
    this.modalEditarVisible = true;
  }

  cerrarEditar() {
    this.modalEditarVisible = false;
    this.trabajadorSeleccionado = null;
  }
}
