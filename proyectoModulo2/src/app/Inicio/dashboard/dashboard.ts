import { Component, inject } from '@angular/core';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  trabajadorService = inject(TrabajadorService);

  actualizar() {
    this.trabajadorService.notificarRefresco();
  }
}
