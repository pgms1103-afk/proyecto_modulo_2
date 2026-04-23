import {Component, Input, Output, EventEmitter, OnChanges, inject} from '@angular/core';
import { TrabajadorModel } from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';

@Component({
  selector: 'app-actualizador-trabajadores',
  standalone: false,
  templateUrl: './actualizador-trabajadores.html',
  styleUrl: './actualizador-trabajadores.css',
})
export class ActualizadorTrabajadores implements OnChanges {

  trabajadorService = inject(TrabajadorService);
  id: number = 0;
  nombre: string = '';
  cedula: number = 0;
  telefono: number = 0;
  email: string = '';
  cargo: string = '';

  @Input() esVisible: boolean = false;
  @Input() trabajador: TrabajadorModel | null = null;
  @Output() alCerrar = new EventEmitter<void>();



  ngOnChanges() {
    if (this.trabajador) {
      this.nombre = this.trabajador.nombre;
      this.cedula = this.trabajador.cedula;
      this.telefono = this.trabajador.telefono;
      this.email = this.trabajador.email;
      this.cargo = this.trabajador.cargo;
    }
  }

  cerrar() {
    this.alCerrar.emit();
  }

  actualizarTrabajador(){
    this.trabajadorService.putActualizarTrabajador(
      this.trabajador!.id,
      this.nombre,
      this.cedula,
      this.telefono,
      this.email,
      this.cargo).subscribe();
  }

  actualizarCargo(){
    this.trabajadorService.putActualizarCargo(
      this.trabajador!.id,
      this.cargo
    ).subscribe();
  }
}
