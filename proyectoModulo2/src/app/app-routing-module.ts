import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { Trabajadores } from './trabajadores/trabajadores';
import { Usuarios } from './usuarios/usuarios';
import { Envios } from './envios/envios';
import { InicioSesion } from './inicio-sesion/inicio-sesion';
import { Pedidos } from './pedidos/pedidos';

const routes: Routes = [
  { path: '', component: InicioSesion },
  { path: 'dashboard', component: Dashboard },
  { path: 'trabajadores', component: Trabajadores },
  { path: 'usuarios', component: Usuarios },
  { path: 'envios', component: Envios },
  { path: 'pedidos', component: Pedidos }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
