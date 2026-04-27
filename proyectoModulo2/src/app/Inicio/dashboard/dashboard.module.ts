import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { ResumenTarjetas } from './components/resumen-tarjetas/resumen-tarjetas';
import { ResumenPaneles } from './components/resumen-paneles/resumen-paneles';

/**
 * @description
 * Módulo encargado de organizar y declarar los componentes del panel administrativo principal.
 * * Centraliza la visualización de indicadores clave a través de tarjetas de resumen
 * y paneles informativos, facilitando la exportación del Dashboard hacia el resto de la aplicación.
 */
@NgModule({
  declarations: [
    Dashboard,
    ResumenTarjetas,
    ResumenPaneles
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule { }
