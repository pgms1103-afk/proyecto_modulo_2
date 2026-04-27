import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Usuarios } from './usuarios';
import { EstadisticasUsuarios } from './components/estadisticas-usuarios/estadisticas-usuarios';
import { BuscadorUsuarios } from './components/buscador-usuarios/buscador-usuarios';
import { TablaUsuarios } from './components/tabla-usuarios/tabla-usuarios';
import { CreadorUsuarios } from './components/creador-usuarios/creador-usuarios';
import { ActualizadorUsuarios } from './components/actualizador-usuarios/actualizador-usuarios';

/**
 * @description
 * Módulo encargado de agrupar y organizar todos los componentes relacionados
 * con la administración y gestión de los usuarios (clientes) del sistema.
 * * Centraliza las funcionalidades de visualización de estadísticas, búsqueda,
 * listado en tabla, creación de nuevas cuentas y actualización de perfiles,
 * facilitando la carga y exportación del componente principal.
 */
@NgModule({
  declarations: [
    Usuarios,
    EstadisticasUsuarios,
    BuscadorUsuarios,
    TablaUsuarios,
    CreadorUsuarios,
    ActualizadorUsuarios
  ],
  imports: [CommonModule, FormsModule],
  exports: [Usuarios],
})
export class UsuariosModule {}
