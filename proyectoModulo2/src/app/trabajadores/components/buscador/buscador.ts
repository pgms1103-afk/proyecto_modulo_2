import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador',
  standalone: false,
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }
}
