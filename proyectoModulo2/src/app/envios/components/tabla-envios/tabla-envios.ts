import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-envios',
  standalone: false,
  templateUrl: './tabla-envios.html',
  styleUrl: './tabla-envios.css',
})
export class TablaEnvios {

  @Output() clicEditar = new EventEmitter<void>();

  notificarEditar() {
    this.clicEditar.emit();
  }
}
