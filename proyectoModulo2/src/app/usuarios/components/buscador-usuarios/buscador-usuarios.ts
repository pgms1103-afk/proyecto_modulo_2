import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscador-usuarios',
  standalone: false,
  templateUrl: './buscador-usuarios.html',
  styleUrl: './buscador-usuarios.css',
})
export class BuscadorUsuarios {

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }
}
