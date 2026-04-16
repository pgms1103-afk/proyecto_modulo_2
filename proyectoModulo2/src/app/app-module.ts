import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Trabajadores } from './trabajadores/trabajadores';
import { Estadisticas } from './trabajadores/components/estadisticas/estadisticas';
import { Buscador } from './trabajadores/components/buscador/buscador';
import { Tabla } from './trabajadores/components/tabla/tabla';
import { Fila } from './trabajadores/components/fila/fila';
import { Insignia } from './trabajadores/components/insignia/insignia';
import { Modal } from './trabajadores/components/modal/modal';

@NgModule({
  declarations: [App, Trabajadores, Estadisticas, Buscador, Tabla, Fila, Insignia, Modal],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
