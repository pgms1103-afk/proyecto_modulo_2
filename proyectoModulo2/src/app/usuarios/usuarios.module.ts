import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Usuarios } from './usuarios';
import { EstadisticasUsuarios } from './components/estadisticas-usuarios/estadisticas-usuarios';
import { BuscadorUsuarios } from './components/buscador-usuarios/buscador-usuarios';
import { TablaUsuarios } from './components/tabla-usuarios/tabla-usuarios';
import { CreadorUsuarios } from './components/creador-usuarios/creador-usuarios';

@NgModule({
  declarations: [
    Usuarios,
    EstadisticasUsuarios,
    BuscadorUsuarios,
    TablaUsuarios,
    CreadorUsuarios,
  ],
  imports: [CommonModule, FormsModule],
  exports: [Usuarios],
})
export class UsuariosModule {}
