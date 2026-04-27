import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { EnvioModel } from '../../../models/envio.model';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService } from 'ngx-toastr';

/**
 * @description
 * Componente encargado de gestionar la lógica de actualización para envíos existentes.
 * Permite la edición integral de los datos de un paquete o la modificación
 * específica de su categoría. Utiliza el ciclo de vida OnChanges para sincronizar
 * los datos del paquete seleccionado con los campos del formulario.
 */
@Component({
  selector: 'app-actualizador-envios',
  standalone: false,
  templateUrl: './actualizador-envios.html',
  styleUrl: './actualizador-envios.css',
})
export class ActualizadorEnvios implements OnChanges {

  envioService = inject(EnvioService);
  toastr = inject(ToastrService);

  // Propiedades locales que enlazan con el formulario (ngModel)
  tipoPaquete: string = '';
  descripcion: string = '';
  peso: number = 0;
  destino: string = '';
  fechaEnvio: string = '';
  fechaEntrega: string = '';

  /**
   * @description Determina si el modal de actualización es visible en el DOM.
   */
  @Input() esVisible: boolean = false;

  /**
   * @description Objeto que contiene los datos del envío seleccionado para editar.
   */
  @Input() envio: EnvioModel | null = null;

  /**
   * @description Evento emitido para notificar al componente padre que debe cerrar el modal.
   */
  @Output() alCerrar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida que se dispara cuando cambian las propiedades de entrada.
   * Se encarga de mapear los datos del objeto `envio` hacia las variables locales
   * del formulario para que el usuario pueda visualizarlos y editarlos.
   * @returns {void}
   */
  ngOnChanges() {
    if (this.envio) {
      this.tipoPaquete  = this.envio.tipoPaquete;
      this.descripcion  = this.envio.descripcion;
      this.peso         = this.envio.peso;
      this.destino      = this.envio.direccionDestino;
      this.fechaEnvio   = this.envio.fechaEnvio;
      this.fechaEntrega = this.envio.fechaEntrega;
    }
  }

  /**
   * @description
   * Envía la solicitud de actualización completa del envío al servidor.
   * Si la operación es exitosa, notifica a los demás componentes para
   * refrescar la tabla y cierra el modal.
   * @returns {void}
   */
  actualizarEnvio() {
    if (!this.envio) return;
    this.envioService.putActualizarEnvio(
      this.envio.id,
      this.tipoPaquete,
      this.descripcion,
      this.peso,
      this.destino,
      this.fechaEnvio,
      this.fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Envío actualizado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  /**
   * @description
   * Realiza una actualización enfocada únicamente en el cambio de categoría
   * (tipo) del paquete, manteniendo el resto de la información original.
   * @returns {void}
   */
  actualizarTipo() {
    if (!this.envio) return;
    this.envioService.putActualizarEnvio(
      this.envio.id,
      this.tipoPaquete,
      this.envio.descripcion,
      this.envio.peso,
      this.envio.direccionDestino,
      this.envio.fechaEnvio,
      this.envio.fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Tipo de paquete actualizado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  /**
   * @description
   * Emite la señal de cierre hacia el componente contenedor para ocultar la interfaz.
   * @returns {void}
   */
  cerrar() {
    this.alCerrar.emit();
  }
}
