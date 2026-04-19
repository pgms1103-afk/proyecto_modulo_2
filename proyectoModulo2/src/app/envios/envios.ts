import { Component } from '@angular/core';

@Component({
  selector: 'app-envios',
  standalone: false,
  templateUrl: './envios.html',
  styleUrl: './envios.css',
})
export class Envios {
  mostrarCreador      = false;
  mostrarActualizador = false;

  abrirCreador()       { this.mostrarCreador = true; }
  cerrarCreador()      { this.mostrarCreador = false; }

  abrirActualizador()  { this.mostrarActualizador = true; }
  cerrarActualizador() { this.mostrarActualizador = false; }
}
