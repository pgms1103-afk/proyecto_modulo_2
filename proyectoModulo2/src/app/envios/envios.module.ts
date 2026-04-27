import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Envios } from './envios';
import { EstadisticasEnvios } from './components/estadisticas-envios/estadisticas-envios';
import { BuscadorEnvios } from './components/buscador-envios/buscador-envios';
import { TablaEnvios } from './components/tabla-envios/tabla-envios';
import { CreadorEnvios } from './components/creador-envios/creador-envios';
import { ActualizadorEnvios } from './components/actualizador-envios/actualizador-envios';

/**
 * @description
 * Módulo encargado de agrupar y organizar todas las funcionalidades relacionadas
 * con la gestión logística de envíos y paquetes.
 * * Este módulo centraliza componentes para la visualización de métricas de entrega,
 * herramientas de búsqueda por tipo o estado, listado detallado en tablas,
 * y los formularios necesarios para registrar nuevos paquetes o actualizar
 * información de envíos existentes.
 */
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
