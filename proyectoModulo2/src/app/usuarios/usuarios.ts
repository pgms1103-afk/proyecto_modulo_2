import { Component } from '@angular/core';

/**
 * @description
 * Componente principal para la sección de gestión de usuarios.
 * Actúa como contenedor y controlador de estados para los procesos de
 * administración de cuentas, gestionando la apertura y cierre de los
 * componentes de creación y edición.
 */
@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {

  /**
   * @description
   * Variable de control que determina si el modal o componente para
   * registrar un nuevo usuario debe mostrarse en pantalla.
   */
  mostrarCreador = false;

  /**
   * @description
   * Variable de control que determina si el modal o componente para
   * editar la información de un usuario existente debe mostrarse en pantalla.
   */
  mostrarActualizador = false;

  /**
   * @description
   * Cambia el estado para desplegar la interfaz de creación de usuarios.
   * @returns {void}
   */
  abrirCreador() {
    this.mostrarCreador = true;
  }

  /**
   * @description
   * Cambia el estado para ocultar la interfaz de creación de usuarios.
   * @returns {void}
   */
  cerrarCreador() {
    this.mostrarCreador = false;
  }

  /**
   * @description
   * Cambia el estado para desplegar la interfaz de actualización de usuarios.
   * @returns {void}
   */
  abrirActualizador() {
    this.mostrarActualizador = true;
  }

  /**
   * @description
   * Cambia el estado para ocultar la interfaz de actualización de usuarios.
   * @returns {void}
   */
  cerrarActualizador() {
    this.mostrarActualizador = false;
  }
}
