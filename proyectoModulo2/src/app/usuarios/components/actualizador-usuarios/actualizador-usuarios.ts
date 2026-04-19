import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-actualizador-usuarios',
  standalone: false,
  templateUrl: './actualizador-usuarios.html',
  styleUrl: './actualizador-usuarios.css',
})
export class ActualizadorUsuarios {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
