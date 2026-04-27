import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {UsuarioService} from '../../../services/usuario.service';

/**
 * @description
 * Componente responsable de gestionar el formulario y la lógica para
 * registrar a un nuevo usuario (cliente) en el sistema desde el panel
 * de administración. Controla la captura de datos y la comunicación
 * con el servicio correspondiente para crear la cuenta.
 */
@Component({
  selector: 'app-creador-usuarios',
  standalone: false,
  templateUrl: './creador-usuarios.html',
  styleUrl: './creador-usuarios.css',
})
export class CreadorUsuarios implements OnInit{

  public usuarioService: UsuarioService = inject(UsuarioService);
  public toastr: ToastrService = inject(ToastrService);

  public cedula: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public correo: string = '';
  public contrasena: string = '';
  public tipoUsuario: string = '';
  public tarifa: number = 0;

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
   * usuarios para registrar una nueva cuenta. Maneja la respuesta asíncrona:
   * muestra una notificación de éxito, solicita el refresco de la tabla principal
   * y cierra el modal si la operación es correcta; de lo contrario, muestra
   * un mensaje con el error devuelto por el servidor.
   * @returns {void}
   */
  crearUsuario() {
    this.usuarioService.postCrearUsuarios(
      this.cedula, this.nombre, this.apellido, this.correo, this.contrasena, this.tipoUsuario
    ).subscribe({
      next: (res) => {
        this.toastr.success('Usuario creado con éxito', 'Éxito');
        this.usuarioService.notificarRefresco();
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
