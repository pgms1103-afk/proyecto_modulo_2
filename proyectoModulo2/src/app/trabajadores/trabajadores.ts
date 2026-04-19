import { Component } from '@angular/core';

@Component({
  selector: 'app-trabajadores',
  standalone: false,
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css',
})
export class Trabajadores {
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
