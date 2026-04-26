import { Component, inject, OnInit, ChangeDetectorRef  } from '@angular/core';
import { EnvioService } from '../services/envio.service';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';


@Component({
  selector: 'app-pedidos',
  standalone: false,
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  private envioService = inject(EnvioService);
  private sesionService = inject(SesionService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  usuarioActual: UsuarioModel | null = null;

  pedidoForm = {
    tipoPaquete: 'Alimenticio',
    descripcion: '',
    peso: 0,
    destino: '',
    fechaEnvio: '',
    fechaEntrega: ''
  };

  ngOnInit() {
    const userStr = localStorage.getItem('usuarioLogueado');
    if (userStr) {
      this.usuarioActual = JSON.parse(userStr);
    } else {
      this.router.navigate(['/']);
    }
  }


  seleccionarTipo(tipo: string) {
    this.pedidoForm.tipoPaquete = tipo;
  }

  enviarPedido() {

    const envioFormateada = this.pedidoForm.fechaEnvio + ':00';
    const entregaFormateada = this.pedidoForm.fechaEntrega + ':00';

    this.envioService.postCrearEnvio(
      this.pedidoForm.tipoPaquete,
      this.pedidoForm.descripcion,
      this.pedidoForm.peso,
      this.pedidoForm.destino,
      envioFormateada,
      entregaFormateada
    ).subscribe({
      next: (res) => {
        this.toastr.success(res || 'Envío creado correctamente', '¡Pedido Exitoso!');
        setTimeout(() => {
          this.limpiarFormulario();
          this.cdr.detectChanges();
        }, 0);
      },
      error: (e) => {
        this.toastr.error(e.error || 'Error al procesar el pedido', 'Error');
      }
    });
  }

  limpiarFormulario() {
    this.pedidoForm.descripcion = '';
    this.pedidoForm.destino = '';
    this.pedidoForm.peso = 0;
    this.pedidoForm.fechaEnvio = '';
    this.pedidoForm.fechaEntrega = '';
    this.pedidoForm.tipoPaquete = 'Alimenticio';
  }

  salir() {
    this.sesionService.cerrarSesion();
  }
}
