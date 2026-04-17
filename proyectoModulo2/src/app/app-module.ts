import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Inicio/navbar/navbar';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { Usuarios } from './usuarios/usuarios';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';

@NgModule({
  declarations: [App, Navbar, Dashboard, Usuarios],
  imports: [BrowserModule, AppRoutingModule, TrabajadoresModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
