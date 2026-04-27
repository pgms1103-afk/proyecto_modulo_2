import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';

/**
 * @description
 * Componente que gestiona el formulario y la lógica para registrar a un
 * nuevo trabajador en el sistema. Controla la captura de los datos de entrada
 * y la comunicación con el servicio correspondiente para almacenarlos.
 */
@Component({
  selector: 'app-creador-trabajadores',
  standalone: false,
  templateUrl: './creador-trabajadores.html',
  styleUrl: './creador-trabajadores.css',
})
export class CreadorTrabajadores implements OnInit {

  public trabajadorService: TrabajadorService = inject(TrabajadorService);
  public toastr: ToastrService = inject(ToastrService);

  public nombre: string = '';
  public cedula: number = 0;
  public telefono: number = 0;
  public email: string = '';
  public cargo: string = '';

  /**
   * @description Controla la visibilidad del modal de creación en la interfaz gráfica.
   */
  @Input() esVisible: boolean = false;

  /**
   * @description Evento emitido al componente padre para indicar que la ventana de creación debe cerrarse.
   */
  @Output() alCerrar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida de Angular invocado al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * @description
   * Recopila los datos ingresados en el formulario y consume el servicio de
   * trabajadores para crear un nuevo registro. Maneja la respuesta asíncrona:
   * muestra una notificación de éxito, solicita el refresco de la tabla de datos
   * y cierra el modal si la operación es correcta; de lo contrario, muestra
   * una notificación con el error devuelto por el servidor.
   * @returns {void}
   */
  crearTrabajador() {
    this.trabajadorService.postCrearTrabajadores(
      this.nombre, this.cedula, this.telefono, this.email, this.cargo
    ).subscribe({
      next: (res) => {
        this.toastr.success('Trabajador creado con éxito', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        console.log('mensaje error:', e.error);
        this.toastr.error(e.error, 'Error de creación');
      }
    });
  }

  /**
   * @description
   * Emite el evento `alCerrar` para notificar al componente contenedor
   * que debe ocultar la interfaz de creación.
   * @returns {void}
   */
  cerrar() {
    this.alCerrar.emit();
  }
}
