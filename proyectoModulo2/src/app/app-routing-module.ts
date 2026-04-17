import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { Trabajadores } from './trabajadores/trabajadores';
import { Usuarios } from './usuarios/usuarios';

const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'trabajadores', component: Trabajadores },
  { path: 'usuarios', component: Usuarios }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
