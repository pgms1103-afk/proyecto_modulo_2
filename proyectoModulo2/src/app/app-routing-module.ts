import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { Trabajadores } from './trabajadores/trabajadores';
import { Usuarios } from './usuarios/usuarios';
import { Envios } from './envios/envios';
import { InicioSesion } from './inicio-sesion/inicio-sesion';
import { Pedidos } from './pedidos/pedidos';

/**
 * @description
 * Definición del árbol de navegación de la aplicación.
 * Asocia las rutas del navegador con sus respectivos componentes,
 * permitiendo la navegación SPA (Single Page Application).
 */
const routes: Routes = [
  /** * @path ''
   * @description Ruta raíz que carga la interfaz de Inicio de Sesión.
   */
  { path: '', component: InicioSesion },

  /** * @path 'dashboard'
   * @description Panel principal de administración con métricas y resúmenes.
   */
  { path: 'dashboard', component: Dashboard },

  /** * @path 'trabajadores'
   * @description Vista de gestión, filtrado y registro de empleados.
   */
  { path: 'trabajadores', component: Trabajadores },

  /** * @path 'usuarios'
   * @description Vista de administración de clientes y niveles de cuenta.
   */
  { path: 'usuarios', component: Usuarios },

  /** * @path 'envios'
   * @description Módulo de logística y seguimiento de paquetes para administradores.
   */
  { path: 'envios', component: Envios },

  /** * @path 'pedidos'
   * @description Interfaz de cliente para la creación y consulta de envíos propios.
   */
  { path: 'pedidos', component: Pedidos }
];

/**
 * @description
 * Módulo de enrutamiento principal.
 * Encapsula la configuración de rutas mediante `RouterModule.forRoot()` para
 * ser inyectado en el módulo raíz de la aplicación.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
