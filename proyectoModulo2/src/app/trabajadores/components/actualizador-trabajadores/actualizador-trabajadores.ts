import {Component, Input, Output, EventEmitter, OnChanges, inject} from '@angular/core';
import { TrabajadorModel } from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';
import { ToastrService } from 'ngx-toastr';

/**
 * @description
 * Componente encargado de gestionar la vista y la lógica para actualizar
 * los datos de un trabajador existente. Recibe la información del trabajador
 * seleccionado y permite modificar sus atributos generales o únicamente su cargo.
 */
@Component({
  selector: 'app-actualizador-trabajadores',
  standalone: false,
  templateUrl: './actualizador-trabajadores.html',
  styleUrl: './actualizador-trabajadores.css',
})
export class ActualizadorTrabajadores implements OnChanges {

  public trabajadorService = inject(TrabajadorService);
  public toastr: ToastrService = inject(ToastrService);
  public id: number = 0;
  public nombre: string = '';
  public cedula: number = 0;
  public telefono: number = 0;
  public email: string = '';
  public cargo: string = '';

  /**
   * @description Controla la visibilidad del componente (modal) en la interfaz.
   */
  @Input() esVisible: boolean = false;

  /**
   * @description Objeto que contiene los datos actuales del trabajador a modificar.
   */
  @Input() trabajador: TrabajadorModel | null = null;

  /**
   * @description Evento que se emite para notificar al componente padre que debe cerrar este modal.
   */
  @Output() alCerrar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando cambian las propiedades
   * de entrada (@Input). Se encarga de pre-cargar los datos del trabajador en
   * las variables locales del formulario para su edición.
   */
  ngOnChanges() {
    if (this.trabajador) {
      this.nombre = this.trabajador.nombre;
      this.cedula = this.trabajador.cedula;
      this.telefono = this.trabajador.telefono;
      this.email = this.trabajador.email;
      this.cargo = this.trabajador.cargo;
    }
  }

  /**
   * @description
   * Emite el evento `alCerrar` para solicitar el cierre de la vista de actualización.
   */
  cerrar() {
    this.alCerrar.emit();
  }

  /**
   * @description
   * Consume el servicio correspondiente para actualizar toda la información
   * básica del trabajador. Maneja la respuesta del servidor mostrando notificaciones
   * de éxito o error mediante Toastr, y notifica a los demás componentes para refrescar la tabla.
   */
  actualizarTrabajador(){
    this.trabajadorService.putActualizarTrabajador(
      this.trabajador!.id,
      this.nombre,
      this.cedula,
      this.telefono,
      this.email,
      this.cargo).subscribe({
      next: (res) => {
        this.toastr.success('Trabajador actualizado correctamente', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar trabajador');
      }
    });
  }

  /**
   * @description
   * Consume el servicio correspondiente para actualizar única y exclusivamente
   * el cargo del trabajador, omitiendo los demás datos. Maneja la respuesta
   * mostrando notificaciones y refrescando la tabla.
   */
  actualizarCargo(){
    this.trabajadorService.putActualizarCargo(
      this.trabajador!.id,
      this.cargo
    ).subscribe({
      next: (res) => {
        this.toastr.success('Cargo actualizado correctamente', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar cargo');
      }
    });
  }
}
