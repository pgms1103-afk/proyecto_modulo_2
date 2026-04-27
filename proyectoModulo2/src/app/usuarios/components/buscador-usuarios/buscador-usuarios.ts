import {Component, Output, EventEmitter, inject} from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';

/**
 * @description
 * Componente que representa la barra de herramientas de búsqueda y filtrado
 * para la sección de usuarios. Permite buscar clientes por su nombre,
 * filtrarlos por su nivel de suscripción o tipo, refrescar la lista general
 * y disparar la acción para registrar una nueva cuenta.
 */
@Component({
  selector: 'app-buscador-usuarios',
  standalone: false,
  templateUrl: './buscador-usuarios.html',
  styleUrl: './buscador-usuarios.css',
})
export class BuscadorUsuarios {

  /**
   * @description
   * Almacena el texto introducido en el campo de búsqueda por nombre.
   */
  nombreBuscado: string = '';

  usuarioService = inject(UsuarioService);

  /**
   * @description
   * Almacena el tipo de usuario seleccionado en el menú desplegable
   * (ej. Normal, Premium, Concurrente) para aplicar el filtro visual.
   */
  usuarioSeleccionado: string = '';

  /**
   * @description
   * Evento emitido al componente padre para notificar que el administrador
   * ha presionado el botón para añadir un nuevo usuario.
   */
  @Output() clicNuevo = new EventEmitter<void>();

  /**
   * @description
   * Llama al servicio de usuarios para emitir una notificación global
   * que solicita a la tabla recargar todos los datos desde cero.
   * @returns {void}
   */
  recargarTabla() {
    this.usuarioService.notificarRefresco();
  }

  /**
   * @description
   * Ejecuta la emisión del evento `clicNuevo`, informando al componente
   * contenedor que debe desplegar el formulario de registro.
   * @returns {void}
   */
  notificarNuevo() {
    this.clicNuevo.emit();
  }

  /**
   * @description
   * Envía al servicio el tipo de usuario actualmente seleccionado en el
   * filtro para que la tabla actualice su vista y muestre únicamente
   * a los clientes que pertenecen a dicha categoría.
   * @returns {void}
   */
  cambiarFiltro() {
    this.usuarioService.filtrarPorTipo(this.usuarioSeleccionado);
  }

  /**
   * @description
   * Consume el servicio para realizar una búsqueda en la base de datos
   * de los usuarios cuyo nombre coincida con `nombreBuscado`. Si el input
   * está vacío, recarga la lista completa. Si encuentra resultados, extrae
   * el arreglo y solicita al servicio que actualice los datos en pantalla.
   * @returns {void}
   */
  buscarPorNombre() {
    if (this.nombreBuscado.trim() === '') {
      this.usuarioService.notificarRefresco(); // si está vacío, recarga todo
      return;
    }
    this.usuarioService.getBuscarPorNombre(this.nombreBuscado).subscribe({
      next: (response) => {
        const body = response.body;
        const resultado = Array.isArray(body) ? body : (body as any)?.data ?? [];
        this.usuarioService.actualizarUsuarios(resultado);
      }
    });
  }

}
