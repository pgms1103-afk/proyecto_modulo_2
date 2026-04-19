import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador-envios',
  standalone: false,
  templateUrl: './buscador-envios.html',
  styleUrl: './buscador-envios.css',
})
export class BuscadorEnvios {
  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }
}
