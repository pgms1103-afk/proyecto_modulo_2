import {Component, Output, EventEmitter, inject} from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-buscador-usuarios',
  standalone: false,
  templateUrl: './buscador-usuarios.html',
  styleUrl: './buscador-usuarios.css',
})
export class BuscadorUsuarios {
  nombreBuscado: string = '';
  usuarioService = inject(UsuarioService);
  usuarioSeleccionado: string = '';

  @Output() clicNuevo = new EventEmitter<void>();

  recargarTabla() {
    this.usuarioService.notificarRefresco();
  }

  notificarNuevo() {
    this.clicNuevo.emit();
  }

  cambiarFiltro() {
    this.usuarioService.filtrarPorTipo(this.usuarioSeleccionado);
  }

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
