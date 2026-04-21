import {Component, Output, EventEmitter, OnInit, OnDestroy, inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UsuarioModel} from '../../../models/usuario.model';
import {Subscription} from 'rxjs';
import {UsuarioService} from '../../../services/usuario.service';
import {TrabajadorModel} from '../../../models/trabajor.model';

@Component({
  selector: 'app-tabla-usuarios',
  standalone: false,
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.css',
})
export class TablaUsuarios implements OnInit, OnDestroy {

  usuarioService = inject(UsuarioService);
  toastr = inject(ToastrService);
  usuarios: UsuarioModel[] = [];
  statuscode: number = 0;
  private sub: Subscription = new Subscription();
  tipoUsuarioSeleccionado: string = '';
  usuarioSeleccionado: UsuarioModel | null = null;
  modalEditarVisible: boolean = false;

  @Output() clicEditar = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadOperaciones();

    this.sub = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.loadOperaciones();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadOperaciones(): void {
    this.usuarioService.getusuarios().subscribe({
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

  get usuariosFiltrados(): UsuarioModel[] {
    if (!this.tipoUsuarioSeleccionado || this.tipoUsuarioSeleccionado === 'todos') {
      return this.usuarios;
    }
    return this.usuarios.filter(u => u.tipoUsuario === this.tipoUsuarioSeleccionado);
  }

  deleteUsuario(id: number) {
    this.usuarioService.deleteUsuarios(id).subscribe({
      next: () => {
        this.toastr.success('Trabajador eliminado');
        this.loadOperaciones();
      },
      error: (e) => this.toastr.error(e.error)
    });
  }

  abrirEditar(usuario: UsuarioModel) {
    this.usuarioSeleccionado = {...usuario};
    this.modalEditarVisible = true;
  }

  notificarEditar() {
    this.clicEditar.emit();
  }

  cerrarEditar() {
    this.modalEditarVisible = false;
    this.usuarioSeleccionado = null;
  }

}
