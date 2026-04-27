import {Component, Input, Output, EventEmitter, inject, OnChanges} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {UsuarioService} from '../../../services/usuario.service';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {UsuarioModel} from '../../../models/usuario.model';
import {ToastrService} from 'ngx-toastr';

/**
 * @description
 * Componente encargado de gestionar la vista y la lógica para actualizar
 * los datos de un usuario (cliente) existente. Permite modificar los datos
 * personales del perfil o cambiar su rango/tipo de suscripción.
 */
@Component({
  selector: 'app-actualizador-usuarios',
  standalone: false,
  templateUrl: './actualizador-usuarios.html',
  styleUrl: './actualizador-usuarios.css',
})
export class ActualizadorUsuarios implements OnChanges{

  public usuarioService = inject(UsuarioService);
  public toastr: ToastrService = inject(ToastrService);

  public id: number = 0;
  public cedula: number = 0;
  public nombre: string = '';
  public apellido: string = '';
  public correo: string = '';
  public contrasena: string = '';
  public tipoUsuario: string = '';

  /**
   * @description Controla la visibilidad del modal de edición en la interfaz gráfica.
   */
  @Input() esVisible: boolean = false;

  /**
   * @description Objeto con los datos actuales del usuario que se va a modificar.
   */
  @Input() usuario: UsuarioModel | null = null;

  /**
   * @description Evento emitido para notificar al componente padre que debe cerrar el modal.
   */
  @Output() alCerrar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al detectar cambios en los
   * datos de entrada (@Input). Se utiliza para cargar los datos del usuario
   * seleccionado en las variables locales del formulario. Deja la contraseña
   * en blanco por motivos de seguridad.
   * @returns {void}
   */
  ngOnChanges() {
    if (this.usuario) {
      this.cedula = this.usuario.cedula;
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.correo = this.usuario.correo;
      this.contrasena = '';
    }
  }

  /**
   * @description
   * Consume el servicio correspondiente para actualizar los datos personales
   * y credenciales del usuario. Muestra notificaciones Toastr según el
   * resultado de la petición HTTP y solicita recargar la tabla principal.
   * @returns {void}
   */
  actualizarUsuario() {
    this.usuarioService.putActualizarUsuario(
      this.usuario!.id,
      this.cedula,
      this.nombre,
      this.apellido,
      this.correo,
      this.contrasena
    ).subscribe({
      next: (res) => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.usuarioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar usuario');
      }
    });
  }

  /**
   * @description
   * Consume el servicio correspondiente para modificar exclusivamente el rango
   * o tipo del usuario (ej. cambiar de Normal a Premium). Muestra alertas
   * de éxito o error basándose en la respuesta del servidor.
   * @returns {void}
   */
  actualizarTipoUsuario(){
    this.usuarioService.putActualizarTipo(
      this.usuario!.id,
      this.tipoUsuario
    ).subscribe({
      next: (res) => {
        this.toastr.success('Tipo de usuario actualizado correctamente', 'Éxito');
        this.usuarioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar tipo de usuario');
      }
    });
  }

  /**
   * @description
   * Emite el evento `alCerrar` para indicarle al componente contenedor que
   * debe ocultar este modal de la pantalla.
   * @returns {void}
   */
  cerrar() {
    this.alCerrar.emit();
  }

}
