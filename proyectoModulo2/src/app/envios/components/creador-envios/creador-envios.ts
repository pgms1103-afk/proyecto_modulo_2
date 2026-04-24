import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creador-envios',
  standalone: false,
  templateUrl: './creador-envios.html',
  styleUrl: './creador-envios.css',
})
export class CreadorEnvios implements OnInit {

  public envioService = inject(EnvioService);
  public toastr = inject(ToastrService);

  public tipoPaquete: string = 'Alimenticio';
  public descripcion: string = '';
  public peso: number = 0;
  public destino: string = '';
  public fechaEnvio: string = '';
  public fechaEntrega: string = '';

  @Input() esVisible: boolean = false;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnInit(): void {}

  crearEnvio() {
    const fechaEnvio = this.fechaEnvio + ':00';
    const fechaEntrega = this.fechaEntrega + ':00';

    this.envioService.postCrearEnvio(
      this.tipoPaquete,
      this.descripcion,
      this.peso,
      this.destino,
      fechaEnvio,
      fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Envío creado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        console.log('Error:', e.error);
        console.log('fechaEnvio:', this.fechaEnvio);
        console.log('fechaEntrega:', this.fechaEntrega);
        this.toastr.error(e.error, 'Error de creación');
      }
    });
  }

  cerrar() {
    this.alCerrar.emit();
  }
}
