import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Envios } from './envios';
import { EstadisticasEnvios } from './components/estadisticas-envios/estadisticas-envios';
import { BuscadorEnvios } from './components/buscador-envios/buscador-envios';
import { TablaEnvios } from './components/tabla-envios/tabla-envios';
import { CreadorEnvios } from './components/creador-envios/creador-envios';

@NgModule({
  declarations: [Envios, EstadisticasEnvios, BuscadorEnvios, TablaEnvios, CreadorEnvios],
  imports: [CommonModule, FormsModule],
  exports: [Envios, TablaEnvios],
})
export class EnviosModule {}
