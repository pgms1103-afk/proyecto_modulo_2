import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creador-envios',
  standalone: false,
  templateUrl: './creador-envios.html',
  styleUrl: './creador-envios.css',
})
export class CreadorEnvios {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
