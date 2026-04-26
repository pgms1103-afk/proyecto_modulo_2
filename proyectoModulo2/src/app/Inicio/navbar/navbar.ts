import { Component, inject } from '@angular/core';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private sesionService = inject(SesionService);

  salir() {
    this.sesionService.cerrarSesion();
  }
}
