import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Inicio/navbar/navbar';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EnviosModule } from './envios/envios.module';
import {FormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [App, Navbar, Dashboard],
  imports: [BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TrabajadoresModule,
    UsuariosModule,
    EnviosModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),],
  providers: [provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideAnimations(),],
  bootstrap: [App],
})
export class AppModule {}
