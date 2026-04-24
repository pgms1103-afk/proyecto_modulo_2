import { Component, inject, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import { EnvioModel } from '../../../models/envio.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabla-envios',
  standalone: false,
  templateUrl: './tabla-envios.html',
  styleUrl: './tabla-envios.css',
})
export class TablaEnvios implements OnInit, OnDestroy {

  envioService = inject(EnvioService);
  toastr = inject(ToastrService);

  envios: EnvioModel[] = [];
  tipoSeleccionado: string = '';
  statuscode: number = 0;

  private sub: Subscription = new Subscription();
  private subFiltro: Subscription = new Subscription();
  private subLista: Subscription = new Subscription();

  @Output() clicEditar = new EventEmitter<void>();


  envioSeleccionado: EnvioModel | null = null;
  modalEditarVisible: boolean = false;

  ngOnInit(): void {
    this.cargarEnvios();


    this.sub = this.envioService.refrescarTabla$.subscribe(() => {
      this.cargarEnvios();
    });


    this.subFiltro = this.envioService.tipoFiltro$.subscribe(tipo => {
      this.tipoSeleccionado = tipo;
    });


    this.subLista = this.envioService.listaEnvios$.subscribe(lista => {
      this.envios = lista;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subFiltro.unsubscribe();
    this.subLista.unsubscribe();
  }

  cargarEnvios(): void {
    this.envioService.getEnvios().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        } else {
          this.envios = [];
        }
      },
      error: (error) => {
        this.statuscode = error.status;
        this.envios = [];
        this.toastr.error('Error al cargar los envíos', 'Error');
      },
    });
  }

  deleteEnvio(id: number) {
    this.envioService.deleteEnvio(id).subscribe({
      next: () => {
        this.toastr.success('Envío eliminado correctamente', 'Éxito');
        this.cargarEnvios();
      },
      error: (e) => this.toastr.error(e.error, 'Error')
    });
  }


  get enviosFiltrados(): EnvioModel[] {
    if (!this.tipoSeleccionado || this.tipoSeleccionado === 'todos') {
      return this.envios;
    }
    return this.envios.filter(e => e.tipoPaquete === this.tipoSeleccionado);
  }


  abrirEditar(envio: EnvioModel) {
    this.envioSeleccionado = { ...envio };
    this.modalEditarVisible = true;
  }

  cerrarEditar() {
    this.modalEditarVisible = false;
    this.envioSeleccionado = null;
  }

  notificarEditar() {
    this.clicEditar.emit();
  }
}
