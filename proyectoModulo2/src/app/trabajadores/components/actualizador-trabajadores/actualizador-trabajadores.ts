import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizador-trabajadores',
  standalone: false,
  templateUrl: './actualizador-trabajadores.html',
  styleUrl: './actualizador-trabajadores.css',
})
export class ActualizadorTrabajadores {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
