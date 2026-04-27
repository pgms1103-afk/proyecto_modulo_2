import {Component, inject, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {Subscription} from 'rxjs';

/**
 * @description
 * Componente que renderiza y gestiona la tabla principal de trabajadores.
 * Se encarga de mostrar la lista del personal, aplicar filtros locales,
 * manejar la eliminación de registros y preparar los datos para la edición.
 */
@Component({
  selector: 'app-tabla-trabajadores',
  standalone: false,
  templateUrl: './tabla-trabajadores.html',
  styleUrl: './tabla-trabajadores.css',
})
export class TablaTrabajadores implements OnInit, OnDestroy {

  /**
   * @description Cargo actual seleccionado para filtrar la tabla visualmente.
   */
  cargoSeleccionado: string = '';

  trabajadorService = inject(TrabajadorService);
  toastr = inject(ToastrService);

  /**
   * @description Arreglo principal que almacena los datos de los trabajadores obtenidos del backend.
   */
  trabajadores: TrabajadorModel[] = [];

  /**
   * @description Código de estado HTTP de la última petición realizada.
   */
  statuscode: number = 0;

  /**
   * @description Almacena temporalmente los datos del trabajador que el usuario desea editar.
   */
  trabajadorSeleccionado: TrabajadorModel | null = null;

  /**
   * @description Bandera que controla la visibilidad del modal interno de edición.
   */
  modalEditarVisible: boolean = false;

  // Suscripciones a observables para evitar fugas de memoria
  private sub: Subscription = new Subscription();
  private subFiltro: Subscription = new Subscription();
  private subLista: Subscription = new Subscription();

  /**
   * @description Evento emitido al componente padre cuando se desea abrir el editor principal (si aplica).
   */
  @Output() clicEditar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida de Angular (OnInit).
   * Carga los datos iniciales y se suscribe a los flujos de eventos del servicio
   * para reaccionar a refrescos de tabla, cambios de filtro de cargo o resultados de búsquedas.
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadOperaciones();

    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });

    this.subFiltro = this.trabajadorService.cargoFiltro$.subscribe(cargo => {
      this.cargoSeleccionado = cargo;
    });

    this.subLista = this.trabajadorService.listaTrabajadores$.subscribe(lista => {
      this.trabajadores = lista;
    });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular (OnDestroy).
   * Limpia y destruye todas las suscripciones de RxJS activas cuando el componente
   * desaparece de la pantalla, previniendo el consumo innecesario de memoria.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subFiltro.unsubscribe();
    this.subLista.unsubscribe();
  }

  /**
   * @description
   * Realiza una petición HTTP al backend para obtener la lista completa de trabajadores.
   * Maneja diferentes estructuras de respuesta y actualiza el arreglo `trabajadores`
   * y el `statuscode` correspondientemente.
   * @returns {void}
   */
  loadOperaciones(): void {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = [...body];
        } else {
          this.trabajadores = [];
        }
      },
      error: (error) => {
        this.statuscode = error.status;
        this.trabajadores = [];
        this.toastr.error('Error al cargar las operaciones', 'Error');
      },
    });
  }

  /**
   * @description
   * Consume el servicio para eliminar un trabajador de la base de datos
   * utilizando su identificador único. Si tiene éxito, recarga la tabla.
   * @param id - El identificador único numérico del trabajador a eliminar.
   * @returns {void}
   */
  deleteTrabajador(id: number) {
    this.trabajadorService.deleteTrabajadores(id).subscribe({
      next: () => {
        this.toastr.success('Trabajador eliminado');
        this.loadOperaciones();
      },
      error: (e) => this.toastr.error(e.error)
    });
  }

  /**
   * @description
   * Getter (propiedad computada) que evalúa dinámicamente la lista de trabajadores
   * en función del `cargoSeleccionado`. Es el arreglo que realmente itera el HTML.
   * @returns {TrabajadorModel[]} La lista completa o filtrada de los trabajadores.
   */
  get trabajadoresFiltrados(): TrabajadorModel[] {
    if (!this.cargoSeleccionado || this.cargoSeleccionado === 'todos') {
      return this.trabajadores;
    }
    return this.trabajadores.filter(t => t.cargo === this.cargoSeleccionado);
  }

  /**
   * @description
   * Emite el evento de salida `clicEditar` hacia el componente contenedor.
   * @returns {void}
   */
  notificarEditar() {
    this.clicEditar.emit();
  }

  /**
   * @description
   * Captura los datos del trabajador seleccionado en la fila de la tabla,
   * crea una copia de seguridad para no afectar la tabla directamente
   * y muestra el modal de edición.
   * @param trabajador - Objeto con los datos del trabajador seleccionado.
   * @returns {void}
   */
  abrirEditar(trabajador: TrabajadorModel) {
    this.trabajadorSeleccionado = {...trabajador};
    this.modalEditarVisible = true;
  }

  /**
   * @description
   * Oculta el modal de edición y limpia los datos temporales del
   * trabajador seleccionado para evitar sobreescrituras accidentales.
   * @returns {void}
   */
  cerrarEditar() {
    this.modalEditarVisible = false;
    this.trabajadorSeleccionado = null;
  }
}
