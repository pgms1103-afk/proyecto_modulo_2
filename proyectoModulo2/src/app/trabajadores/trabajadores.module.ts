import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trabajadores } from './trabajadores';

import { Buscador } from './components/buscador/buscador';
import { Estadisticas } from './components/estadisticas/estadisticas';
import { Creador } from './components/creador/creador';
import { Tabla } from './components/tabla/tabla';

@NgModule({
  declarations: [Trabajadores, Buscador, Estadisticas, Creador, Tabla],
  imports: [CommonModule],
  exports: [Trabajadores],
})
export class TrabajadoresModule {}
