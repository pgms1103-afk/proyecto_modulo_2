import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import {TrabajadorService} from '../../../services/trabajador.service';

@Component({
  selector: 'app-creador-trabajadores',
  standalone: false,
  templateUrl: './creador-trabajadores.html',
  styleUrl: './creador-trabajadores.css',
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
    console.log('Enviando:', this.nombre, this.cedula, this.telefono, this.email, this.cargo);
    this.trabajadorService.postCrearTrabajadores(
      this.nombre, this.cedula, this.telefono, this.email, this.cargo
    ).subscribe({
      next: (res) => console.log('Creado:', res),
      error: (e) => console.error('Error del backend:', e.error) // ← e.error tiene el mensaje
    });
  }

  cerrar() {
    this.alCerrar.emit();
  }
}
