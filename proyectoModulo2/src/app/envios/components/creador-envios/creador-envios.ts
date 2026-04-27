import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService } from 'ngx-toastr';

/**
 * @description
 * Componente responsable de la interfaz y lógica para el registro de nuevos envíos
 * desde el panel administrativo. Gestiona la captura de datos del paquete,
 * el formateo de tiempos compatible con el backend y la comunicación con el
 * servicio de logística.
 */
@Component({
  selector: 'app-creador-envios',
  standalone: false,
  templateUrl: './creador-envios.html',
  styleUrl: './creador-envios.css',
})
export class CreadorEnvios implements OnInit {

  public envioService = inject(EnvioService);
  public toastr = inject(ToastrService);

  // Propiedades del formulario
  public tipoPaquete: string = 'Alimenticio';
  public descripcion: string = '';
  public peso: number = 0;
  public destino: string = '';
  public fechaEnvio: string = '';
  public fechaEntrega: string = '';

  /**
   * @description Controla la visibilidad del modal de creación en la interfaz de usuario.
   */
  @Input() esVisible: boolean = false;

  /**
   * @description Evento emitido para informar al componente padre que debe cerrar el modal.
   */
  @Output() alCerrar = new EventEmitter<void>();

  /**
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {}

  /**
   * @description
   * Captura los datos del formulario, añade los segundos (`:00`) a las cadenas de fecha
   * para cumplir con el formato esperado por la API y envía la solicitud de creación.
   * Si la operación es exitosa, muestra una notificación, solicita el refresco de
   * la tabla principal y cierra el formulario.
   * @returns {void}
   */
  crearEnvio() {
    const fechaEnvio = this.fechaEnvio + ':00';
    const fechaEntrega = this.fechaEntrega + ':00';

    this.envioService.postCrearEnvio(
      this.tipoPaquete,
      this.descripcion,
      this.peso,
      this.destino,
      fechaEnvio,
      fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Envío creado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        console.error('Error:', e.error);
        this.toastr.error(e.error, 'Error de creación');
      }
    });
  }

  /**
   * @description
   * Notifica al componente contenedor que la acción de creación ha finalizado
   * o ha sido cancelada para ocultar el modal.
   * @returns {void}
   */
  cerrar() {
    this.alCerrar.emit();
  }
}
