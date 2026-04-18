import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';

@Component({
  selector: 'app-creador',
  standalone: false,
  templateUrl: './creador.html',
  styleUrl: './creador.css',
})
export class Creador implements OnInit {

  public trabajadorService: TrabajadorService = inject(TrabajadorService);
  public nombre: string = '';
  public cedula: number  = 0;
  public telefono: number = 0;
  public email: string = '';
  public cargo: string = '';

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnInit(): void {
  }

  crearTrabajador() {
    this.trabajadorService.postCrearTrabajadores(this.nombre,
      this.cedula,
      this.telefono,
      this.email,
      this.cargo).subscribe({});
  }

  cerrar() {
    this.alCerrar.emit();
  }
}
