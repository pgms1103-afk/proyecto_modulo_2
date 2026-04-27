import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TrabajadorModel} from '../../../models/trabajor.model';
import {TrabajadorService} from '../../../services/trabajador.service';
import {Subscription} from 'rxjs';
import {UsuarioModel} from '../../../models/usuario.model';
import {UsuarioService} from '../../../services/usuario.service';

/**
 * @description
 * Componente responsable de calcular y mostrar las estadísticas generales
 * de los usuarios (clientes y administradores) registrados en el sistema.
 * Mantiene un conteo en tiempo real clasificado por los diferentes niveles
 * o tipos de suscripción.
 */
@Component({
  selector: 'app-estadisticas-usuarios',
  standalone: false,
  templateUrl: './estadisticas-usuarios.html',
  styleUrl: './estadisticas-usuarios.css',
})
export class EstadisticasUsuarios implements OnInit, OnDestroy {

  /**
   * @description
   * Arreglo local que almacena la lista completa de usuarios.
   * Actúa como fuente de datos en memoria para el cálculo de las estadísticas.
   */
  usuarios: UsuarioModel[] = [];

  usuarioService = inject(UsuarioService);

  /**
   * @description
   * Suscripción de RxJS utilizada para escuchar los eventos de actualización
   * de la tabla y prevenir fugas de memoria al destruir el componente.
   */
  private sub: Subscription = new Subscription();

  /**
   * @description
   * Método del ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Realiza la carga inicial de datos y se suscribe al evento `refrescarTabla$`
   * para recalcular las estadísticas cada vez que hay un cambio en los registros.
   * @returns {void}
   */
  ngOnInit() {
    this.cargarDatos();

    // Se actualiza cuando la tabla se refresca
    this.sub = this.usuarioService.refrescarTabla$.subscribe(() => {
      this.cargarDatos();
    });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular. Se ejecuta justo antes de la
   * destrucción del componente para limpiar las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * @description
   * Consume el servicio para obtener la lista completa de usuarios desde el backend.
   * Parsea la respuesta HTTP y actualiza el arreglo local `usuarios`.
   * En caso de error en la petición, inicializa el arreglo vacío.
   * @returns {void}
   */
  cargarDatos() {
    this.usuarioService.getUsuarios().subscribe({
      next: (response) => {
        const body = response.body;
        if (body && (body as any).data) {
          this.usuarios = (body as any).data;
        } else if (Array.isArray(body)) {
          this.usuarios = body;
        }
      },
      error: () => this.usuarios = []
    });
  }

  /**
   * @description
   * Calcula el total absoluto de usuarios registrados en el sistema.
   * @returns {number} La cantidad total de usuarios.
   */
  get totalUsuarios():number{
    return this.usuarios.length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de cuentas que tienen el rol de 'Admin'.
   * @returns {number} El número de administradores actuales.
   */
  get totalAdmins():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Admin').length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de usuarios que tienen el nivel de suscripción 'Normal'.
   * @returns {number} El número de usuarios normales actuales.
   */
  get totalUsuariosNormal():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Normal').length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de usuarios que tienen el nivel de suscripción 'Premium'.
   * @returns {number} El número de usuarios premium actuales.
   */
  get totalUsuariosPremium():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Premium').length;
  }

  /**
   * @description
   * Filtra y calcula la cantidad de usuarios que tienen el nivel de suscripción 'Concurrente'.
   * @returns {number} El número de usuarios concurrentes actuales.
   */
  get totalUsuariosConcurrentes():number{
    return this.usuarios.filter(cadaUsuario => cadaUsuario.tipoUsuario === 'Concurrente').length;
  }

}
