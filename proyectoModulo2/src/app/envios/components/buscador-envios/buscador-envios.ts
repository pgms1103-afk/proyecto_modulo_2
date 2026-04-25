import { Component, Output, EventEmitter, inject } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import {EnvioModel} from '../../../models/envio.model';
import {TrabajadorModel} from '../../../models/trabajor.model';

@Component({
  selector: 'app-buscador-envios',
  standalone: false,
  templateUrl: './buscador-envios.html',
  styleUrl: './buscador-envios.css',
})
export class BuscadorEnvios {

  envioService = inject(EnvioService);
  tipoSeleccionado: string = 'todos';
  textoBuscado: string = '';
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

  buscar() {
    this.envioService.filtrarPorEstado(this.textoBuscado);
  }

}
