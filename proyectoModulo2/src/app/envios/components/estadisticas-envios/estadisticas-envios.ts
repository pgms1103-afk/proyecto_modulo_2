import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EnvioModel } from '../../../models/envio.model';
import { EnvioService } from '../../../services/envio.service';
import { Subscription } from 'rxjs';

/**
 * @description
 * Componente dedicado al cálculo y visualización de métricas de rendimiento logístico.
 * Proporciona un resumen cuantitativo de los envíos, clasificándolos por su categoría
 * y evaluando la eficiencia operativa mediante el conteo de entregas a tiempo y retrasos.
 */
@Component({
  selector: 'app-estadisticas-envios',
  standalone: false,
  templateUrl: './estadisticas-envios.html',
  styleUrl: './estadisticas-envios.css',
})
export class EstadisticasEnvios implements OnInit, OnDestroy {

  /**
   * @description
   * Arreglo local que almacena los datos de envíos. Sirve como la fuente
   * principal para los cálculos de filtrado y conteo en tiempo real.
   */
  envios: EnvioModel[] = [];

  envioService = inject(EnvioService);

  /**
   * @description
   * Maneja la suscripción al flujo de actualizaciones para evitar fugas de
   * memoria y asegurar que las métricas se sincronicen con la base de datos.
   */
  private sub: Subscription = new Subscription();

  private cdr = inject(ChangeDetectorRef);

  /**
   * @description
   * Método del ciclo de vida de Angular. Al inicializarse, realiza la carga
   * inicial de métricas y se suscribe al evento de refresco global para
   * actualizar los indicadores automáticamente cuando ocurran cambios en el sistema.
   * @returns {void}
   */
  ngOnInit() {
    this.cargarDatos();

    this.sub = this.envioService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  /**
   * @description
   * Limpia las suscripciones activas al destruir el componente para garantizar
   * el rendimiento óptimo de la aplicación.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * @description
   * Consume el servicio de envíos para obtener la lista actualizada.
   * Parsea la respuesta del servidor y utiliza `ChangeDetectorRef` para forzar
   * la actualización de la vista, asegurando que los contadores visuales reflejen
   * el estado real de la carga.
   * @returns {void}
   */
  cargarDatos() {
    this.envioService.getEnvios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.envios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.envios = [...body];
        }
        this.cdr.detectChanges();
      },
      error: () => this.envios = []
    });
  }

  /**
   * @description Calcula el volumen total de envíos registrados en el sistema.
   */
  get totalEnvios(): number {
    return this.envios.length;
  }

  /**
   * @description Filtra y cuenta los envíos clasificados como 'Alimenticio'.
   */
  get totalAlimenticios(): number {
    return this.envios.filter(e => e.tipoPaquete === 'Alimenticio').length;
  }

  /**
   * @description Filtra y cuenta los envíos clasificados como 'No Alimenticio'.
   */
  get totalNoAlimenticios(): number {
    return this.envios.filter(e => e.tipoPaquete === 'No Alimenticio').length;
  }

  /**
   * @description Filtra y cuenta los envíos clasificados como documentos o 'Carta'.
   */
  get totalCartas(): number {
    return this.envios.filter(e => e.tipoPaquete === 'Carta').length;
  }

  /**
   * @description Obtiene el conteo de paquetes cuya entrega se ha realizado exitosamente a tiempo.
   */
  get totalATiempo(): number {
    return this.envios.filter(e => e.entregaATiempo === true).length;
  }

  /**
   * @description Obtiene el conteo de paquetes que han excedido el tiempo de entrega estimado.
   */
  get totalConRetraso(): number {
    return this.envios.filter(e => e.entregaATiempo === false).length;
  }
}
