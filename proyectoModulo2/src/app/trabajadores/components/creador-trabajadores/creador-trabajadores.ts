import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-creador-trabajadores',
  standalone: false,
  templateUrl: './creador-trabajadores.html',
  styleUrl: './creador-trabajadores.css',
})
export class Creador implements OnInit {

  public trabajadorService: TrabajadorService = inject(TrabajadorService);
  public toastr: ToastrService = inject(ToastrService);
  public nombre: string = '';
  public cedula: number = 0;
  public telefono: number = 0;
  public email: string = '';
  public cargo: string = '';

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnInit(): void {}

  crearTrabajador() {
    this.trabajadorService.postCrearTrabajadores(
      this.nombre, this.cedula, this.telefono, this.email, this.cargo
    ).subscribe({
      next: (res) => {
        this.toastr.success('Trabajador creado con éxito', 'Éxito');
        this.trabajadorService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        console.log('mensaje error:', e.error);
        this.toastr.error(e.error, 'Error de creación');
      }
    });
  }

  cerrar() {
    this.alCerrar.emit();
  }
}
