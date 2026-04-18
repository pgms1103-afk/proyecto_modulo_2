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

  @Output() clicNuevo = new EventEmitter<void>();

  notificarNuevo() {
    this.clicNuevo.emit();
  }

  recargarTabla() {
    this.trabajadorService.notificarRefresco();
  }




}
