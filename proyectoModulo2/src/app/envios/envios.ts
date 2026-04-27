import { Component } from '@angular/core';

/**
 * @description
 * Componente principal (contenedor) para la sección de gestión de envíos.
 * Actúa como el controlador de estados para la visibilidad de las ventanas
 * modales, permitiendo alternar entre la vista general, el formulario de
 * creación de paquetes y el formulario de actualización de envíos existentes.
 */
@Component({
  selector: 'app-envios',
  standalone: false,
  templateUrl: './envios.html',
  styleUrl: './envios.css',
})
export class Envios {
  /**
   * @description Controla la renderización del componente Creador de Envíos en la interfaz.
   */
  mostrarCreador      = false;

  /**
   * @description Controla la renderización del componente Actualizador de Envíos en la interfaz.
   */
  mostrarActualizador = false;

  /**
   * @description Cambia el estado a verdadero para desplegar el modal de creación de paquetes.
   * @returns {void}
   */
  abrirCreador()       { this.mostrarCreador = true; }

  /**
   * @description Cambia el estado a falso para ocultar el modal de creación de paquetes.
   * @returns {void}
   */
  cerrarCreador()      { this.mostrarCreador = false; }

  /**
   * @description Cambia el estado a verdadero para desplegar el modal de edición de envíos.
   * @returns {void}
   */
  abrirActualizador()  { this.mostrarActualizador = true; }

  /**
   * @description Cambia el estado a falso para ocultar el modal de edición de envíos.
   * @returns {void}
   */
  cerrarActualizador() { this.mostrarActualizador = false; }
}
