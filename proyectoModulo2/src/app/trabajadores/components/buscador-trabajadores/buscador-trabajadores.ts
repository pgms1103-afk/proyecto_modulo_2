import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador-trabajadores',
  standalone: false,
  templateUrl: './buscador-trabajadores.html',
  styleUrls: ['./buscador-trabajadores.css'],
})
export class Buscador {

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }
}
