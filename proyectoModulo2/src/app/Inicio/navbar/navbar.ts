import { Component, inject } from '@angular/core';
import { SesionService } from '../../services/sesion.service';

/**
 * @description
 * Componente de la barra de navegación superior (Navbar) de la aplicación.
 * Proporciona el acceso global a funciones de navegación y, principalmente,
 * gestiona la acción de salida del sistema interactuando con el servicio de sesión.
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private sesionService = inject(SesionService);

  /**
   * @description
   * Invoca el proceso de finalización de sesión a través del `SesionService`.
   * Esto eliminará los datos del usuario del almacenamiento local y
   * redirigirá al usuario a la página de inicio.
   * @returns {void}
   */
  salir() {
    this.sesionService.cerrarSesion();
  }
}
