import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  mostrarCreador = false;
  mostrarActualizador = false;

  abrirCreador() {
    this.mostrarCreador = true;
  }
  cerrarCreador() {
    this.mostrarCreador = false;
  }

  abrirActualizador() {
    this.mostrarActualizador = true;
  }
  cerrarActualizador() {
    this.mostrarActualizador = false;
  }
}
