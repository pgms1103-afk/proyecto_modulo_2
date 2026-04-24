import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { EnvioModel } from '../../../models/envio.model';
import { EnvioService } from '../../../services/envio.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualizador-envios',
  standalone: false,
  templateUrl: './actualizador-envios.html',
  styleUrl: './actualizador-envios.css',
})
export class ActualizadorEnvios implements OnChanges {

  envioService = inject(EnvioService);
  toastr = inject(ToastrService);

  // Campos del formulario — se cargan desde el @Input envio
  tipoPaquete: string = '';
  descripcion: string = '';
  peso: number = 0;
  destino: string = '';
  fechaEnvio: string = '';
  fechaEntrega: string = '';

  @Input() esVisible: boolean = false;
  @Input() envio: EnvioModel | null = null;
  @Output() alCerrar = new EventEmitter<void>();

  ngOnChanges() {
    if (this.envio) {
      this.tipoPaquete  = this.envio.tipoPaquete;
      this.descripcion  = this.envio.descripcion;
      this.peso         = this.envio.peso;
      this.destino      = this.envio.direccionDestino;
      this.fechaEnvio   = this.envio.fechaEnvio;
      this.fechaEntrega = this.envio.fechaEntrega;
    }
  }

  actualizarEnvio() {
    if (!this.envio) return;
    this.envioService.putActualizarEnvio(
      this.envio.id,
      this.tipoPaquete,
      this.descripcion,
      this.peso,
      this.destino,
      this.fechaEnvio,
      this.fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Envío actualizado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  actualizarTipo() {
    if (!this.envio) return;
    this.envioService.putActualizarEnvio(
      this.envio.id,
      this.tipoPaquete,
      this.envio.descripcion,
      this.envio.peso,
      this.envio.direccionDestino,
      this.envio.fechaEnvio,
      this.envio.fechaEntrega
    ).subscribe({
      next: () => {
        this.toastr.success('Tipo de paquete actualizado correctamente', 'Éxito');
        this.envioService.notificarRefresco();
        this.cerrar();
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  cerrar() {
    this.alCerrar.emit();
  }
}
