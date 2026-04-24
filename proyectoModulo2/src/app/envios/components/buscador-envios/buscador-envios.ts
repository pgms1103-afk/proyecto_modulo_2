import { Component, Output, EventEmitter, inject } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';

@Component({
  selector: 'app-buscador-envios',
  standalone: false,
  templateUrl: './buscador-envios.html',
  styleUrl: './buscador-envios.css',
})
export class BuscadorEnvios {

  envioService = inject(EnvioService);
  tipoSeleccionado: string = 'todos';

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }

  recargarTabla() {
    this.envioService.notificarRefresco();
  }

  cambiarFiltro() {
    this.envioService.filtrarPorTipo(this.tipoSeleccionado);
  }
}
