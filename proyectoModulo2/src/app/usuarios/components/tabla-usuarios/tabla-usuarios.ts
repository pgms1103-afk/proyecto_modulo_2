import {Component, Output, EventEmitter, OnInit, OnDestroy, inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UsuarioModel} from '../../../models/usuario.model';
import {Subscription} from 'rxjs';
import {UsuarioService} from '../../../services/usuario.service';

/**
 * @description
 * Componente que renderiza y gestiona la tabla principal de usuarios en el
 * panel de administración. Se encarga de mostrar la lista de cuentas, aplicar
 * filtros visuales por tipo de suscripción, manejar la eliminación de registros
 * y preparar los datos para su edición.
 */
@Component({
  selector: 'app-tabla-usuarios',
  standalone: false,
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.css',
})
export class TablaUsuarios implements OnInit, OnDestroy {

  usuarioService = inject(UsuarioService);
  toastr = inject(ToastrService);

  /**
   * @description Arreglo principal que almacena los datos de los usuarios obtenidos del backend.
   */
  usuarios: UsuarioModel[] = [];

  /**
   * @description Código de estado HTTP de la última petición realizada.
   */
  statuscode: number = 0;

  // Suscripciones a observables para evitar fugas de memoria
  private sub: Subscription = new Subscription();
  private subLista: Subscription = new Subscription();

  /**
   * @description Tipo de usuario actual seleccionado para filtrar la tabla visualmente.
   */
  tipoUsuarioSeleccionado: string = '';

  /**
   * @description Almacena temporalmente los datos del usuario que el administrador desea editar.
   */
  usuarioSeleccionado: UsuarioModel | null = null;

  /**
   * @description Bandera que controla la visibilidad del modal interno de edición.
   */
  modalEditarVisible: boolean = false;

  private subFiltro: Subscription = new Subscription();

  /**
   * @description Evento emitido al componente padre cuando se desea abrir el editor principal.
   */
  @Output() clicEditar = new EventEmitter<void>();

  /**
   * @description
   * Método del ciclo de vida de Angular (OnInit).
   * Ejecuta la carga inicial de datos y establece las suscripciones a los
   * flujos de eventos del servicio de usuarios (refresco, actualización de lista y filtros).
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadOperaciones();

    this.sub = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });

    this.subLista = this.usuarioService.listaUsuarios$.subscribe(lista => {
      this.usuarios = lista;
    });

    this.subFiltro = this.usuarioService.tipoFiltro$.subscribe(tipo => {
      this.tipoUsuarioSeleccionado = tipo;
    });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular (OnDestroy).
   * Limpia y destruye todas las suscripciones de RxJS activas antes de que
   * el componente desaparezca, previniendo fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subLista.unsubscribe();
    this.subFiltro.unsubscribe();
  }

  /**
   * @description
   * Realiza una petición HTTP al backend para obtener la lista completa de usuarios.
   * Procesa diferentes estructuras de respuesta para asegurar que el arreglo
   * `usuarios` se llene correctamente, y actualiza el `statuscode`.
   * @returns {void}
   */
  loadOperaciones(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        this.statuscode = response.status;
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = [...body];
        } else {
          this.usuarios = [];
        }
      },
      error: (error) => {
        this.statuscode = error.status;
        this.usuarios = [];
        this.toastr.error('Error al cargar las operaciones', 'Error');
      },
    });
  }

  /**
   * @description
   * Getter (propiedad computada) que evalúa dinámicamente la lista de usuarios
   * en función del `tipoUsuarioSeleccionado`. Es el arreglo que se itera en la vista HTML.
   * @returns {UsuarioModel[]} La lista completa o filtrada de los usuarios.
   */
  get usuariosFiltrados(): UsuarioModel[] {
    if (!this.tipoUsuarioSeleccionado || this.tipoUsuarioSeleccionado === 'todos') {
      return this.usuarios;
    }
    return this.usuarios.filter(u => u.tipoUsuario === this.tipoUsuarioSeleccionado);
  }

  /**
   * @description
   * Consume el servicio para eliminar un usuario de la base de datos
   * utilizando su identificador único. Si tiene éxito, recarga la tabla.
   * @param id - El identificador numérico único del usuario a eliminar.
   * @returns {void}
   */
  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuarios(id).subscribe({
      next: () => {
        this.toastr.success('Usuario eliminado');
        this.loadOperaciones();
      },
      error: (e) => this.toastr.error(e.error)
    });
  }

  /**
   * @description
   * Captura los datos del usuario seleccionado en la fila de la tabla,
   * crea una copia profunda para no afectar la tabla directamente por
   * binding y despliega el modal de edición.
   * @param usuario - Objeto con los datos del usuario seleccionado.
   * @returns {void}
   */
  abrirEditar(usuario: UsuarioModel) {
    this.usuarioSeleccionado = {...usuario};
    this.modalEditarVisible = true;
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
   * Oculta el modal de edición y resetea los datos temporales del
   * usuario seleccionado para evitar fugas de información o ediciones accidentales.
   * @returns {void}
   */
  cerrarEditar() {
    this.modalEditarVisible = false;
    this.usuarioSeleccionado = null;
  }
}
