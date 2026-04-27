import { Component, inject, OnInit, ChangeDetectorRef  } from '@angular/core';
import { EnvioService } from '../services/envio.service';
import { SesionService } from '../services/sesion.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';

/**
 * @description
 * Componente principal para la vista de creación de pedidos (envíos) orientada al cliente.
 * Se encarga de validar la sesión activa, gestionar el formulario de registro de
 * un nuevo paquete, formatear los datos de fecha y hora, y comunicarse con el
 * backend para procesar la solicitud.
 */
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

  /**
   * @description
   * Almacena la información del usuario que tiene la sesión iniciada actualmente.
   * Se obtiene desde el LocalStorage al inicializar el componente.
   */
  usuarioActual: UsuarioModel | null = null;

  /**
   * @description
   * Objeto que centraliza y enlaza los datos capturados en el formulario HTML
   * para la creación de un nuevo pedido. Inicializa con valores por defecto.
   */
  pedidoForm = {
    tipoPaquete: 'Alimenticio',
    descripcion: '',
    peso: 0,
    destino: '',
    fechaEnvio: '',
    fechaEntrega: ''
  };

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al cargar el componente.
   * Verifica si existe un usuario logueado en el `localStorage`. Si lo encuentra,
   * carga sus datos en la variable `usuarioActual`; de lo contrario, protege la ruta
   * redirigiendo al visitante a la página de inicio (login).
   * @returns {void}
   */
  ngOnInit() {
    const userStr = localStorage.getItem('usuarioLogueado');
    if (userStr) {
      this.usuarioActual = JSON.parse(userStr);
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * @description
   * Actualiza dinámicamente el tipo de paquete en el objeto del formulario
   * cuando el usuario selecciona una opción diferente en la interfaz.
   * @param tipo - El nuevo tipo de paquete seleccionado (ej. 'Frágil', 'Electrónico').
   * @returns {void}
   */
  seleccionarTipo(tipo: string) {
    this.pedidoForm.tipoPaquete = tipo;
  }

  /**
   * @description
   * Procesa la información del formulario para crear un nuevo pedido.
   * Formatea las fechas agregando los segundos requeridos por el backend (`:00`)
   * y consume el servicio de envíos. Maneja la respuesta mostrando notificaciones
   * de éxito o error, y limpia el formulario forzando la detección de cambios
   * visuales en Angular.
   * @returns {void}
   */
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
        this.toastr.error( 'Error al procesar el pedido', 'Error');
      }
    });
  }

  /**
   * @description
   * Restablece todos los campos del objeto `pedidoForm` a sus valores iniciales
   * o vacíos. Se utiliza normalmente después de procesar un pedido exitoso.
   * @returns {void}
   */
  limpiarFormulario() {
    this.pedidoForm.descripcion = '';
    this.pedidoForm.destino = '';
    this.pedidoForm.peso = 0;
    this.pedidoForm.fechaEnvio = '';
    this.pedidoForm.fechaEntrega = '';
    this.pedidoForm.tipoPaquete = 'Alimenticio';
  }

  /**
   * @description
   * Finaliza la sesión del usuario actual invocando al servicio de sesión,
   * el cual limpiará el almacenamiento local y lo redirigirá fuera del sistema.
   * @returns {void}
   */
  salir() {
    this.sesionService.cerrarSesion();
  }
}
