import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creador-trabajadores',
  standalone: false,
  templateUrl: './creador-trabajadores.html',
  styleUrl: './creador-trabajadores.css',
})
export class Creador {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
