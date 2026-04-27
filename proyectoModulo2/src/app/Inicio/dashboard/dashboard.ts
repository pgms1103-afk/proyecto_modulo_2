import { Component, inject } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import {UsuarioService} from '../../services/usuario.service';

/**
 * @description
 * Componente principal del panel de administración (Dashboard).
 * Actúa como el contenedor maestro para las métricas y la gestión global.
 * Proporciona funcionalidades para coordinar la actualización de datos entre
 * los diferentes módulos de trabajadores y usuarios de forma simultánea.
 */
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  trabajadorService = inject(TrabajadorService);
  usuarioService = inject(UsuarioService);

  /**
   * @description
   * Dispara un evento de refresco global en los servicios de trabajadores y usuarios.
   * Al ejecutar este método, todos los componentes suscritos (tablas, estadísticas, etc.)
   * reaccionarán volviendo a consultar los datos más recientes del servidor,
   * garantizando que la información mostrada en el panel sea actual.
   * @returns {void}
   */
  actualizar() {
    this.trabajadorService.notificarRefresco();
    this.usuarioService.notificarRefresco();
  }
}
