import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Inicio/navbar/navbar';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [App, Navbar, Dashboard],
  imports: [BrowserModule, AppRoutingModule, TrabajadoresModule, UsuariosModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
