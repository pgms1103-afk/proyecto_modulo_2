import {Component, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-buscador-trabajadores',
  standalone: false,
  templateUrl: './buscador-trabajadores.html',
  styleUrls: ['./buscador-trabajadores.css'],
})
export class Buscador {
  trabajadorService = inject(TrabajadorService);
  cargoSeleccionado: string = '';
  nombreBuscado: string = '';

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }

  recargarTabla() {
    this.trabajadorService.notificarRefresco();
  }

  cambiarFiltro() {
    this.trabajadorService.filtrarPorCargo(this.cargoSeleccionado);
  }

  buscarPorNombre() {
    if (this.nombreBuscado.trim() === '') {
      this.trabajadorService.notificarRefresco(); // si está vacío, recarga todo
      return;
    }
    this.trabajadorService.buscarTrabajadorPorNombre(this.nombreBuscado).subscribe({
      next: (response) => {
        const body = response.body;
        const resultado = Array.isArray(body) ? body : (body as any)?.data ?? [];
        this.trabajadorService.actualizarTrabajadores(resultado);
      }
  });
  }
}
