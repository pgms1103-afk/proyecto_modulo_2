import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';
import { Subscription } from 'rxjs';

/**
 * @description
 * Componente responsable de calcular y mostrar las estadísticas generales
 * del personal registrado en el sistema. Mantiene un conteo en tiempo real
 * de los trabajadores clasificados por sus respectivos cargos.
 */
@Component({
  selector: 'app-estadisticas-trabajadores',
  standalone: false,
  templateUrl: './estadisticas-trabajadores.html',
  styleUrl: './estadisticas-trabajadores.css',
})
export class EstadisticasTrabajadores implements OnInit, OnDestroy {

  /**
   * @description
   * Arreglo local que almacena la lista completa de trabajadores.
   * Sirve como base de datos en memoria para calcular las estadísticas.
   */
  trabajadores: TrabajadorModel[] = [];

  trabajadorService = inject(TrabajadorService);

  /**
   * @description
   * Suscripción de RxJS utilizada para escuchar los eventos de actualización
   * de la tabla y prevenir fugas de memoria al destruir el componente.
   */
  private sub: Subscription = new Subscription();

  /**
   * @description
   * Método del ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Realiza la primera carga de datos y se suscribe al evento `refrescarTabla$`
   * del servicio para mantener las estadísticas sincronizadas.
   * @returns {void}
   */
  ngOnInit() {
    this.cargarDatos();

    // Se actualiza cuando la tabla se refresca
    this.sub = this.trabajadorService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular. Se ejecuta justo antes de que el componente
   * sea destruido. Se encarga de limpiar las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * @description
   * Consume el servicio para obtener todos los trabajadores desde el backend.
   * Parsea la respuesta HTTP y actualiza el arreglo local `trabajadores`.
   * En caso de error, limpia el arreglo.
   * @returns {void}
   */
  cargarDatos() {
    this.trabajadorService.getTrabajadores().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.trabajadores = (body as any).data;
        } else if (Array.isArray(body)) {
          this.trabajadores = body;
        }
      },
      error: () => this.trabajadores = []
    });
  }

  /**
   * @description
   * Calcula el total de trabajadores registrados en la base de datos local.
   * @returns {number} La cantidad total de trabajadores.
   */
  get totalTrabajadores():number{
    return this.trabajadores.length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de trabajadores cuyo cargo es 'Administrador'.
   * @returns {number} El número de administradores actuales.
   */
  get totalAdministradores():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Administrador').length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de trabajadores cuyo cargo es 'Conductor'.
   * @returns {number} El número de conductores actuales.
   */
  get totalConductores():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Conductor').length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de trabajadores cuyo cargo es 'Manipulador'.
   * @returns {number} El número de manipuladores de paquetes actuales.
   */
  get totalManipuladoresPaquetes():number{
    return this.trabajadores.filter(cadaTrabajador => cadaTrabajador.cargo === 'Manipulador').length;
  }
}
