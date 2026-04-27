import {Component, inject, OnInit} from '@angular/core';
import {TrabajadorService} from '../services/trabajador.service';
import {TrabajadoresModule} from './trabajadores.module';

/**
 * @description
 * Componente principal para la vista de gestión de trabajadores.
 * Se encarga de controlar la interfaz gráfica del panel de trabajadores,
 * gestionando específicamente la apertura y cierre de los modales (o subcomponentes)
 * para la creación y actualización de los registros del personal.
 */
@Component({
  selector: 'app-trabajadores',
  standalone: false,
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css',
})
export class Trabajadores {

  /**
   * @description
   * Bandera booleana que controla la visibilidad del componente/modal
   * encargado de registrar o crear un nuevo trabajador.
   */
  mostrarCreador = false;

  /**
   * @description
   * Bandera booleana que controla la visibilidad del componente/modal
   * encargado de actualizar o editar la información de un trabajador existente.
   */
  mostrarActualizador = false;

  /**
   * @description
   * Cambia el estado a verdadero para desplegar la vista de creación en pantalla.
   * @returns {void}
   */
  abrirCreador() {
    this.mostrarCreador = true;
  }

  /**
   * @description
   * Cambia el estado a falso para ocultar la vista de creación de la pantalla.
   * @returns {void}
   */
  cerrarCreador() {
    this.mostrarCreador = false;
  }

  /**
   * @description
   * Cambia el estado a verdadero para desplegar la vista de actualización en pantalla.
   * @returns {void}
   */
  abrirActualizador() {
    this.mostrarActualizador = true;
  }

  /**
   * @description
   * Cambia el estado a falso para ocultar la vista de actualización de la pantalla.
   * @returns {void}
   */
  cerrarActualizador() {
    this.mostrarActualizador = false;
  }
}
