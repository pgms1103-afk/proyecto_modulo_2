import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Trabajadores } from './trabajadores';
import { BuscadorTrabajadores } from './components/buscador-trabajadores/buscador-trabajadores';
import { EstadisticasTrabajadores } from './components/estadisticas-trabajadores/estadisticas-trabajadores';
import {CreadorTrabajadores } from './components/creador-trabajadores/creador-trabajadores';
import { TablaTrabajadores } from './components/tabla-trabajadores/tabla-trabajadores';
import {FormsModule} from '@angular/forms';
import {ActualizadorTrabajadores } from './components/actualizador-trabajadores/actualizador-trabajadores';

/**
 * @description
 * Módulo encargado de agrupar y gestionar todos los componentes relacionados
 * con la administración de trabajadores.
 * * Este módulo centraliza las funcionalidades de visualización, búsqueda,
 * estadísticas, creación y actualización de los perfiles del personal,
 * facilitando su reutilización en otras partes de la aplicación.
 */
@NgModule({
  declarations: [
    Trabajadores,
    BuscadorTrabajadores,
    EstadisticasTrabajadores,
    CreadorTrabajadores,
    TablaTrabajadores,
    ActualizadorTrabajadores
  ],
  imports: [CommonModule, FormsModule],
  exports: [Trabajadores],
})
export class TrabajadoresModule {}
