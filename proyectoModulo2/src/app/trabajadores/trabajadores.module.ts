import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trabajadores } from './trabajadores';

import { Buscador } from './components/buscador-trabajadores/buscador-trabajadores';
import { EstadisticasTrabajadores } from './components/estadisticas-trabajadores/estadisticas-trabajadores';
import { Creador } from './components/creador-trabajadores/creador-trabajadores';
import { TablaTrabajadores } from './components/tabla-trabajadores/tabla-trabajadores';

@NgModule({
  declarations: [Trabajadores, Buscador, EstadisticasTrabajadores, Creador, TablaTrabajadores],
  imports: [CommonModule],
  exports: [Trabajadores],
})
export class TrabajadoresModule {}
