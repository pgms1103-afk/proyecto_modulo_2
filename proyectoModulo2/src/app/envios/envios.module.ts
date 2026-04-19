import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Envios } from './envios';
import { EstadisticasEnvios } from './components/estadisticas-envios/estadisticas-envios';
import { BuscadorEnvios } from './components/buscador-envios/buscador-envios';
import { TablaEnvios } from './components/tabla-envios/tabla-envios';
import { CreadorEnvios } from './components/creador-envios/creador-envios';
import { ActualizadorEnvios } from './components/actualizador-envios/actualizador-envios';

@NgModule({
  declarations: [
    Envios,
    EstadisticasEnvios,
    BuscadorEnvios,
    TablaEnvios,
    CreadorEnvios,
    ActualizadorEnvios
  ],
  imports: [CommonModule, FormsModule],
  exports: [Envios],
})
export class EnviosModule {}
