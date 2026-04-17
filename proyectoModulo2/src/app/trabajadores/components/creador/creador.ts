import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creador',
  standalone: false,
  templateUrl: './creador.html',
  styleUrl: './creador.css',
})
export class Creador {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
