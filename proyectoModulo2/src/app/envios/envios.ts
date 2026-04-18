import { Component } from '@angular/core';

@Component({
  selector: 'app-envios',
  standalone: false,
  templateUrl: './envios.html',
  styleUrl: './envios.css',
})
export class Envios {
  mostrarCreador = false;

  abrirCreador() { this.mostrarCreador = true; }
  cerrarCreador() { this.mostrarCreador = false; }
}
