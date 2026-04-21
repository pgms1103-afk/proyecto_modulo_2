import {Component, Output, EventEmitter, inject} from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service';

@Component({
  selector: 'app-buscador-usuarios',
  standalone: false,
  templateUrl: './buscador-usuarios.html',
  styleUrl: './buscador-usuarios.css',
})
export class BuscadorUsuarios {
  usuarioService = inject(UsuarioService);

  @Output() clicNuevo = new EventEmitter<void>();

  recargarTabla() {
    this.usuarioService.notificarRefresco();
  }

  notificarNuevo() {
    this.clicNuevo.emit();
  }
}
