import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyectoModulo2');

  private router = inject(Router);
  mostrarNavbarAdmin: boolean = false;

  constructor() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      const userStr = localStorage.getItem('usuarioLogueado');
      const usuario = userStr ? JSON.parse(userStr) : null;
      const esLogin = event.url === '/' || event.url === '';
      const esPaginaPedidos = event.url.includes('/pedidos');

      this.mostrarNavbarAdmin = !esLogin && !esPaginaPedidos && (usuario?.tipoUsuario === 'Admin');
    });
  }
}
