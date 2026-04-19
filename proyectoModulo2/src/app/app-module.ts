import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Inicio/navbar/navbar';
import { TrabajadoresModule } from './trabajadores/trabajadores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FormsModule } from '@angular/forms';
import { EnviosModule } from './envios/envios.module';
import { DashboardModule } from './Inicio/dashboard/dashboard.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [App, Navbar],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TrabajadoresModule,
    UsuariosModule,
    FormsModule,
    EnviosModule,
    DashboardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}
