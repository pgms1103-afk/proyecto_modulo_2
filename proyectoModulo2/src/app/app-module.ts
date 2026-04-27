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
import { InicioSesion } from './inicio-sesion/inicio-sesion';
import { Pedidos } from './pedidos/pedidos';

/**
 * @description
 * Módulo raíz de la aplicación (Root Module).
 * Se encarga de orquestar la infraestructura global del sistema, importando los módulos
 * funcionales (Trabajadores, Usuarios, Envíos, Dashboard) y configurando los proveedores
 * esenciales como el cliente HTTP, las animaciones y el sistema de notificaciones Toastr.
 * * * Define el componente `App` como el punto de arranque (bootstrap) de la interfaz.
 */
@NgModule({
  declarations: [
    App,
    Navbar,
    InicioSesion,
    Pedidos
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TrabajadoresModule,
    UsuariosModule,
    FormsModule,
    EnviosModule,
    DashboardModule,
    /**
     * @description Configuración global de Toastr para alertas de usuario.
     * @property {number} timeOut - Duración de la alerta (3 segundos).
     * @property {string} positionClass - Ubicación en pantalla (inferior derecha).
     */
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App],
})
export class AppModule {}
