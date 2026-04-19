import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { ResumenTarjetas } from './components/resumen-tarjetas/resumen-tarjetas';
import { ResumenPaneles } from './components/resumen-paneles/resumen-paneles';

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
