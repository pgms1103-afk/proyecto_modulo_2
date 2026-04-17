import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-creador-usuarios',
  standalone: false,
  templateUrl: './creador-usuarios.html',
  styleUrl: './creador-usuarios.css',
})
export class CreadorUsuarios {

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  cerrar() {
    this.alCerrar.emit();
  }
}
