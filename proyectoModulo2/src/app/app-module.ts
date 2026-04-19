import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // <--- ESTO arregla el error del Navbar

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Inicio/navbar/navbar';
import { DashboardModule } from './Inicio/dashboard/dashboard.module'; // Importamos tu nuevo módulo
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EnviosModule } from './envios/envios.module';

@NgModule({
  declarations: [
    App,
    Navbar,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    DashboardModule,
    TrabajadoresModule,
    UsuariosModule,
    EnviosModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
