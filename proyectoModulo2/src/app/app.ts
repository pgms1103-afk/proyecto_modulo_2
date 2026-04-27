import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

/**
 * @description
 * Componente principal de la aplicación (Root Component).
 * Se encarga de la lógica de alto nivel, como la gestión del estado global de la interfaz
 * y la detección de cambios en la navegación para determinar la visibilidad de
 * elementos comunes como la barra de navegación administrativa.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  /**
   * @description Título del proyecto definido mediante un Signal de Angular (reactividad de alto rendimiento).
   */
  protected readonly title = signal('proyectoModulo2');

  private router = inject(Router);

  /**
   * @description
   * Bandera booleana que controla si el Navbar destinado a administradores
   * debe renderizarse en la pantalla actual.
   */
  mostrarNavbarAdmin: boolean = false;

  /**
   * @description
   * El constructor inicializa una escucha activa a los eventos del enrutador.
   * Filtra únicamente los eventos de finalización de navegación (`NavigationEnd`)
   * para evaluar tres condiciones:
   * 1. Si el usuario está en la página de inicio/login.
   * 2. Si el usuario está en la vista de pedidos de cliente.
   * 3. Si el usuario tiene el rol de 'Admin' almacenado en su sesión.
   * * Con base en esto, actualiza `mostrarNavbarAdmin` para adaptar la UI al contexto del usuario.
   */
  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {

      const userStr = localStorage.getItem('usuarioLogueado');
      const usuario = userStr ? JSON.parse(userStr) : null;

      const esLogin = event.url === '/' || event.url === '';
      const esPaginaPedidos = event.url.includes('/pedidos');

      // Solo muestra el Navbar de Admin si no es login, no es pedidos y el usuario es Admin
      this.mostrarNavbarAdmin = !esLogin && !esPaginaPedidos && (usuario?.tipoUsuario === 'Admin');
    });
  }
}
