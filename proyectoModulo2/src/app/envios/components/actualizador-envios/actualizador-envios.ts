import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizador-envios',
  standalone: false,
  templateUrl: './actualizador-envios.html',
  styleUrl: './actualizador-envios.css',
})
export class ActualizadorEnvios {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
