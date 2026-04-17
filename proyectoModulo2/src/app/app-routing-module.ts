import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './Inicio/dashboard/dashboard'; // Importación añadida

const routes: Routes = [
  { path: '', component: Dashboard }, // Ruta principal que carga el Dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
