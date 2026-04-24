import { Component, inject } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  trabajadorService = inject(TrabajadorService);
  usuarioService = inject(UsuarioService);

  actualizar() {
    this.trabajadorService.notificarRefresco();
    this.usuarioService.notificarRefresco();
  }
}
