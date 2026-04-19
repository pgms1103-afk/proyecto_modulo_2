import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: false,
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.css',
})
export class TablaUsuarios {

  @Output() clicEditar = new EventEmitter<void>();

  notificarEditar() {
    this.clicEditar.emit();
  }
}
