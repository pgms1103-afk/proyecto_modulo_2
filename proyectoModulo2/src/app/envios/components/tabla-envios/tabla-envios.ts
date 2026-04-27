import { Component, inject, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import { EnvioModel } from '../../../models/envio.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

/**
 * @description
 * Componente encargado de visualizar y gestionar la lista de envíos en formato de tabla.
 * Implementa una lógica de filtrado reactiva que combina categorías de paquetes y
 * búsquedas por texto (estado o destino). Además, coordina las acciones de
 * eliminación y apertura del editor para cada registro.
 */
@Component({
  selector: 'app-tabla-envios',
  standalone: false,
  templateUrl: './tabla-envios.html',
  styleUrl: './tabla-envios.css',
})
export class TablaEnvios implements OnInit, OnDestroy {

  envioService = inject(EnvioService);
  toastr = inject(ToastrService);

  /**
   * @description Fuente de datos principal que contiene la lista de todos los envíos.
   */
  envios: EnvioModel[] = [];

  /**
   * @description Filtro de categoría actual (ej. 'Carta', 'Alimenticio').
   */
  tipoSeleccionado: string = '';

  /**
   * @description Almacena el código de estado de la última respuesta HTTP.
   */
  statuscode: number = 0;

  // Colección de suscripciones para la gestión del ciclo de vida de los observables
  private sub: Subscription = new Subscription();
  private subFiltro: Subscription = new Subscription();
  private subLista: Subscription = new Subscription();
  private subEstado: Subscription = new Subscription();

  /**
   * @description Término de búsqueda para filtrar por texto libre o estados específicos.
   */
  textoBuscado: string = '';

  /**
   * @description Evento emitido al componente padre para indicar una acción de edición externa.
   */
  @Output() clicEditar = new EventEmitter<void>();

  /**
   * @description Almacena temporalmente el objeto de envío que se desea modificar.
   */
  envioSeleccionado: EnvioModel | null = null;

  /**
   * @description Controla la visibilidad del modal de edición interno.
   */
  modalEditarVisible: boolean = false;

  /**
   * @description
   * Inicializa el componente cargando los envíos y suscribiéndose a múltiples
   * canales del servicio para reaccionar a refrescos de tabla, cambios de
   * filtros de tipo, actualizaciones de lista y búsquedas por estado.
   * @returns {void}
   */
  ngOnInit(): void {
    this.cargarEnvios();

    this.sub = this.envioService.refrescarTabla$.subscribe(() => {
      this.cargarEnvios();
    });

    this.subFiltro = this.envioService.tipoFiltro$.subscribe(tipo => {
      this.tipoSeleccionado = tipo;
    });

    this.subLista = this.envioService.listaEnvios$.subscribe(lista => {
      this.envios = lista;
    });

    this.subEstado = this.envioService.estadoFiltro$.subscribe(texto => {
      this.textoBuscado = texto;
    });
  }

  /**
   * @description
   * Limpia todas las suscripciones activas al destruir el componente para
   * evitar fugas de memoria y comportamientos inesperados en segundo plano.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subFiltro.unsubscribe();
    this.subLista.unsubscribe();
    this.subEstado.unsubscribe();
  }

  /**
   * @description
   * Realiza una petición al servicio para obtener la lista de envíos del servidor.
   * Maneja la asignación de datos según el formato de respuesta y notifica
   * errores de carga mediante Toastr.
   * @returns {void}
   */
  cargarEnvios(): void {
    this.envioService.getEnvios().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        } else {
          this.envios = [];
        }
      },
      error: (error) => {
        this.statuscode = error.status;
        this.envios = [];
        this.toastr.error('Error al cargar los envíos', 'Error');
      },
    });
  }

  /**
   * @description
   * Solicita la eliminación de un envío específico. Tras el éxito de la
   * operación, muestra un mensaje confirmación y recarga la tabla.
   * @param id - Identificador único del envío a eliminar.
   * @returns {void}
   */
  deleteEnvio(id: number) {
    this.envioService.deleteEnvio(id).subscribe({
      next: () => {
        this.toastr.success('Envío eliminado correctamente', 'Éxito');
        this.cargarEnvios();
      },
      error: (e) => this.toastr.error(e.error, 'Error')
    });
  }

  /**
   * @description
   * Getter (propiedad computada) que procesa el filtrado dinámico de la lista.
   * Aplica filtros cruzados de categoría (`tipoSeleccionado`) y búsqueda
   * por texto (`textoBuscado`), incluyendo lógica especial para determinar
   * si el paquete está "a tiempo" o "con retraso".
   * @returns {EnvioModel[]} Arreglo de envíos que cumplen con los criterios de búsqueda.
   */
  get enviosFiltrados(): EnvioModel[] {
    return this.envios.filter(e => {
      const matchTipo = !this.tipoSeleccionado ||
        this.tipoSeleccionado === 'todos' ||
        e.tipoPaquete === this.tipoSeleccionado;

      const texto = this.textoBuscado.toLowerCase();
      const matchTexto = !texto ||
        e.tipoPaquete?.toLowerCase().includes(texto) ||
        e.direccionDestino?.toLowerCase().includes(texto) ||
        (texto === 'a tiempo' && e.entregaATiempo === true) ||
        (texto === 'con retraso' && e.entregaATiempo === false);

      return matchTipo && matchTexto;
    });
  }

  /**
   * @description
   * Crea una copia local del envío seleccionado para evitar mutaciones directas
   * y habilita la visibilidad del modal de edición.
   * @param envio - El modelo del envío a editar.
   * @returns {void}
   */
  abrirEditar(envio: EnvioModel) {
    this.envioSeleccionado = { ...envio };
    this.modalEditarVisible = true;
  }

  /**
   * @description
   * Restablece el envío seleccionado y oculta el modal de edición.
   * @returns {void}
   */
  cerrarEditar() {
    this.modalEditarVisible = false;
    this.envioSeleccionado = null;
  }

  /**
   * @description
   * Emite el evento `clicEditar` para notificar al componente padre.
   * @returns {void}
   */
  notificarEditar() {
    this.clicEditar.emit();
  }
}
