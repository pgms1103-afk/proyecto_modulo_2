import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trabajadores } from './trabajadores';
import { BuscadorTrabajadores } from './components/buscador-trabajadores/buscador-trabajadores';
import { EstadisticasTrabajadores } from './components/estadisticas-trabajadores/estadisticas-trabajadores';
import { CreadorTrabajadores } from './components/creador-trabajadores/creador-trabajadores';
import { TablaTrabajadores } from './components/tabla-trabajadores/tabla-trabajadores';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [Trabajadores, Buscador, EstadisticasTrabajadores, Creador, TablaTrabajadores],
  imports: [CommonModule, FormsModule],
import { ActualizadorTrabajadores } from './components/actualizador-trabajadores/actualizador-trabajadores';

@NgModule({
  declarations: [
    Trabajadores,
    BuscadorTrabajadores,
    EstadisticasTrabajadores,
    CreadorTrabajadores,
    TablaTrabajadores,
    ActualizadorTrabajadores
  ],
  imports: [CommonModule],
  exports: [Trabajadores],
})
export class TrabajadoresModule {}
