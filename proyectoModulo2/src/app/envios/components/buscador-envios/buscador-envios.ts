import { Component, Output, EventEmitter, inject } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import {EnvioModel} from '../../../models/envio.model';
import {TrabajadorModel} from '../../../models/trabajor.model';

/**
 * @description
 * Componente que gestiona las herramientas de búsqueda y filtrado de la sección de envíos.
 * Permite al administrador filtrar paquetes por su categoría (tipo), realizar búsquedas
 * por estado, refrescar la información global y disparar la acción para registrar
 * un nuevo envío.
 */
@Component({
  selector: 'app-buscador-envios',
  standalone: false,
  templateUrl: './buscador-envios.html',
  styleUrl: './buscador-envios.css',
})
export class BuscadorEnvios {

  envioService = inject(EnvioService);

  /**
   * @description
   * Almacena la categoría de paquete seleccionada en el menú desplegable.
   * Por defecto se establece en 'todos'.
   */
  tipoSeleccionado: string = 'todos';

  /**
   * @description
   * Texto ingresado por el usuario para filtrar los envíos por su estado actual.
   */
  textoBuscado: string = '';

  /**
   * @description
   * Evento emitido hacia el componente padre para indicar que se ha solicitado
   * la apertura del formulario de creación de un nuevo envío.
   */
  @Output() clicNuevo = new EventEmitter<void>();

  /**
   * @description
   * Emite el evento de salida `clicNuevo`, notificando al componente contenedor
   * que debe desplegar la interfaz de registro.
   * @returns {void}
   */
  notificarNuevo() {
    this.clicNuevo.emit();
  }

  /**
   * @description
   * Solicita al servicio de envíos que notifique a todos los componentes suscritos
   * para que recarguen sus datos desde la fuente principal (backend).
   * @returns {void}
   */
  recargarTabla() {
    this.envioService.notificarRefresco();
  }

  /**
   * @description
   * Comunica al servicio el tipo de paquete seleccionado para que los componentes
   * de visualización (como la tabla) apliquen el filtro de categoría correspondiente.
   * @returns {void}
   */
  cambiarFiltro() {
    this.envioService.filtrarPorTipo(this.tipoSeleccionado);
  }

  /**
   * @description
   * Notifica al servicio el texto de búsqueda actual para filtrar los registros
   * basándose en el estado de los paquetes.
   * @returns {void}
   */
  buscar() {
    this.envioService.filtrarPorEstado(this.textoBuscado);
  }

}
