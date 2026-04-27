import {Component, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {ToastrService} from 'ngx-toastr';

/**
 * @description
 * Componente que representa la barra de herramientas de búsqueda y filtrado
 * para la sección de trabajadores. Permite buscar empleados por su nombre,
 * filtrarlos según su cargo, refrescar la lista y emitir la acción para
 * inicializar la creación de un nuevo registro.
 */
@Component({
  selector: 'app-buscador-trabajadores',
  standalone: false,
  templateUrl: './buscador-trabajadores.html',
  styleUrls: ['./buscador-trabajadores.css'],
})
export class BuscadorTrabajadores {

  trabajadorService = inject(TrabajadorService);

  /**
   * @description
   * Almacena el cargo seleccionado en el menú desplegable para aplicar
   * filtros específicos en la lista de trabajadores.
   */
  cargoSeleccionado: string = '';

  /**
   * @description
   * Almacena el texto introducido por el usuario en el campo de búsqueda por nombre.
   */
  nombreBuscado: string = '';

  /**
   * @description
   * Evento que se emite hacia el componente padre para notificar que
   * el usuario ha pulsado el botón de "Nuevo Trabajador".
   */
  @Output() clicNuevo = new EventEmitter<void>();

  /**
   * @description
   * Ejecuta la emisión del evento `clicNuevo`, informando al componente
   * contenedor que debe desplegar el formulario de creación.
   * @returns {void}
   */
  notificarNuevo() {
    this.clicNuevo.emit();
  }

  /**
   * @description
   * Llama al servicio de trabajadores para emitir una notificación global
   * que le indica a la tabla que debe volver a cargar todos los datos originales.
   * @returns {void}
   */
  recargarTabla() {
    this.trabajadorService.notificarRefresco();
  }

  /**
   * @description
   * Llama al servicio de trabajadores pasándole el cargo actualmente seleccionado
   * para que los componentes suscritos (como la tabla) actualicen su vista
   * mostrando únicamente al personal con ese rol.
   * @returns {void}
   */
  cambiarFiltro() {
    this.trabajadorService.filtrarPorCargo(this.cargoSeleccionado);
  }

  /**
   * @description
   * Consume el servicio para buscar trabajadores cuyo nombre coincida con el
   * texto de la variable `nombreBuscado`. Si el campo de texto está vacío,
   * recarga toda la tabla. Si existen resultados, extrae la información y le
   * solicita al servicio que actualice la lista de trabajadores mostrada en pantalla.
   * @returns {void}
   */
  buscarPorNombre() {
    if (this.nombreBuscado.trim() === '') {
      this.trabajadorService.notificarRefresco(); // si está vacío, recarga todo
      return;
    }
    this.trabajadorService.buscarTrabajadorPorNombre(this.nombreBuscado).subscribe({
      next: (response) => {
        const body = response.body;
        const resultado: TrabajadorModel[] = Array.isArray(body) ? body : (body as any)?.data ?? [];
        this.trabajadorService.actualizarTrabajadores(resultado);
      }
    });
  }
}
