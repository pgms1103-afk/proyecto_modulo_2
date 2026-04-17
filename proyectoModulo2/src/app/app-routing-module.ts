import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Inicio/dashboard/dashboard';
import { Trabajadores } from './trabajadores/trabajadores';

const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'trabajadores', component: Trabajadores }// Ruta principal que carga el Dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
