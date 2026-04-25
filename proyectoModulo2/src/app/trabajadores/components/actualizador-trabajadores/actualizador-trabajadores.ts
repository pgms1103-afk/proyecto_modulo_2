import {Component, Input, Output, EventEmitter, OnChanges, inject} from '@angular/core';
import { TrabajadorModel } from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizador-trabajadores',
  standalone: false,
  templateUrl: './actualizador-trabajadores.html',
  styleUrl: './actualizador-trabajadores.css',
})
export class ActualizadorTrabajadores implements OnChanges {

  public trabajadorService = inject(TrabajadorService);
  public toastr: ToastrService = inject(ToastrService);
  public id: number = 0;
  public nombre: string = '';
  public cedula: number = 0;
  public telefono: number = 0;
  public email: string = '';
  public cargo: string = '';

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
      this.cargo).subscribe({
      next: (res) => {
        this.toastr.success('Trabajador actualizado correctamente', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar trabajador');
      }
    });
  }

  actualizarCargo(){
    this.trabajadorService.putActualizarCargo(
      this.trabajador!.id,
      this.cargo
    ).subscribe({
      next: (res) => {
        this.toastr.success('Cargo actualizado correctamente', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error al actualizar cargo');
      }
    });
  }
}
